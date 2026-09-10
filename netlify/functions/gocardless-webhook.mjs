// GoCardless -> GHL sync (goal 2, Sept 2026).
//
// Receives GoCardless webhooks, verifies the signature, and forwards two kinds
// of event into GoHighLevel via dedicated inbound-webhook workflows:
//
//   1. A new homecare sign-up (subscription created on a BRT payment link) ->
//      GHL creates/updates the contact and drops an opportunity straight into
//      "Signed up (won)", which fires the existing stage-change automation
//      (comp-signed, plan tag, the "you're in" email). Same single trigger the
//      phone-sign-up form uses, so both self-serve and manual paths converge.
//   2. A failed payment / cancelled mandate -> GHL raises a task on the contact
//      and emails the office.
//
// Design note: this posts to its OWN two GHL inbound webhooks (SIGNUP / FAILED),
// NOT the shared enquiry webhook. The shared one forks on the `competition` tag
// and would mis-file a sign-up as an enquiry; keeping these separate avoids that
// and the documented GHL "If/Else can't read a raw webhook payload" limitation.
//
// Plan is identified by subscription amount (999 = Service Care, 1399 =
// Landlord Care), which is more robust than mapping the BRT template id.
//
// Env vars (Netlify > Site configuration > Environment variables):
//   GOCARDLESS_ACCESS_TOKEN      - read-only token (Developers > API settings)
//   GOCARDLESS_ENVIRONMENT       - "live" or "sandbox"
//   GOCARDLESS_WEBHOOK_SECRET    - the endpoint secret shown when the GoCardless
//                                  webhook endpoint is created (added after deploy)
//   GHL_GOCARDLESS_SIGNUP_WEBHOOK - inbound-webhook URL of the sign-up workflow
//   GHL_GOCARDLESS_FAILED_WEBHOOK - inbound-webhook URL of the failed-payment workflow

import crypto from 'node:crypto';

const GC_VERSION = '2015-07-06';

// Amount (in pence) -> plan. Kept here as the single mapping point; if a plan
// price ever changes it changes in one place. The site sells four homecare
// tiers; Service Care+ and Ultimate are eligibility-gated (boiler under ten
// years) so they have no self-serve button and are signed up by the office,
// but they still reach GoCardless and so must be mapped here. GoCardless
// template names differ from the site names (kept in the comments).
const PLANS = {
  999: { name: 'Service Care', tag: 'plan-service-care' },          // GC "Boiler Care"
  1399: { name: 'Landlord Care', tag: 'plan-landlord-care' },       // GC "Landlord Care"
  1999: { name: 'Service Care+', tag: 'plan-service-care-plus' },   // GC "Boiler Care+"
  3499: { name: 'Ultimate Home Care', tag: 'plan-ultimate-home-care' },
};

// Events we forward as a "failed payment" alert to the office.
const FAILURE_EVENTS = new Set([
  'payments:failed',
  'payments:charged_back',
  'mandates:cancelled',
  'mandates:expired',
  'mandates:failed',
]);

const gcBase = () =>
  (process.env.GOCARDLESS_ENVIRONMENT || 'live') === 'sandbox'
    ? 'https://api-sandbox.gocardless.com'
    : 'https://api.gocardless.com';

/** GET a resource from the GoCardless API and return its single object. */
async function gcGet(resource, id) {
  const res = await fetch(`${gcBase()}/${resource}/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.GOCARDLESS_ACCESS_TOKEN}`,
      'GoCardless-Version': GC_VERSION,
      Accept: 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`GoCardless GET ${resource}/${id} -> ${res.status}`);
  }
  const body = await res.json();
  return body[resource];
}

/** Walk subscription/payment -> mandate -> customer to get the person's details. */
async function customerFromMandate(mandateId) {
  const mandate = await gcGet('mandates', mandateId);
  const customer = await gcGet('customers', mandate.links.customer);
  return {
    name: [customer.given_name, customer.family_name].filter(Boolean).join(' ').trim(),
    email: customer.email || '',
    phone: customer.phone_number || '',
    gcCustomerId: customer.id,
  };
}

/** Constant-time compare of the GoCardless HMAC-SHA256 signature. */
function signatureValid(rawBody, header) {
  const secret = process.env.GOCARDLESS_WEBHOOK_SECRET;
  if (!secret || !header) return false;
  const expected = crypto.createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(header);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

async function postToGhl(url, payload) {
  if (!url) return; // unset destination means "nothing to send", not a 404
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, submitted_at: new Date().toISOString() }),
  });
}

async function handleSignup(event) {
  const subscription = await gcGet('subscriptions', event.links.subscription);
  const plan = PLANS[subscription.amount];
  if (!plan) {
    // Amount does not match a known homecare plan, so this subscription is
    // something else (a non-homecare Direct Debit). Ignore it — only genuine
    // homecare sign-ups should ever reach the GHL homecare pipeline. If a new
    // homecare plan is ever added, add its amount to PLANS above.
    console.log(`gocardless-webhook: ignored subscription ${subscription.id}, amount ${subscription.amount} is not a homecare plan`);
    return;
  }
  const person = await customerFromMandate(subscription.links.mandate);

  await postToGhl(process.env.GHL_GOCARDLESS_SIGNUP_WEBHOOK, {
    ...person,
    source_page: 'GoCardless Sign-up',
    tags: `homecare,gocardless-signup,${plan.tag}`,
    plan_interest: plan.name,
    gc_subscription_id: subscription.id,
    gc_amount: (subscription.amount / 100).toFixed(2),
  });
}

async function handleFailure(event) {
  // Failure events carry different link shapes; resolve a mandate id from whatever
  // the event references, then look up the customer the same way.
  let mandateId = event.links.mandate;
  let amount = null;
  let reason = event.details?.description || event.action;

  if (event.resource_type === 'payments' && event.links.payment) {
    const payment = await gcGet('payments', event.links.payment);
    mandateId = mandateId || payment.links.mandate;
    amount = (payment.amount / 100).toFixed(2);
  }
  if (!mandateId) return;

  const person = await customerFromMandate(mandateId);
  await postToGhl(process.env.GHL_GOCARDLESS_FAILED_WEBHOOK, {
    ...person,
    source_page: 'GoCardless Payment Issue',
    tags: 'homecare,gocardless-payment-issue',
    gc_event: `${event.resource_type}:${event.action}`,
    gc_reason: reason,
    ...(amount ? { gc_amount: amount } : {}),
  });
}

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const rawBody = await req.text();
  const signature = req.headers.get('webhook-signature');
  if (!signatureValid(rawBody, signature)) {
    return new Response('Invalid signature', { status: 498 });
  }

  let events = [];
  try {
    events = JSON.parse(rawBody).events || [];
  } catch {
    return new Response('Bad JSON', { status: 400 });
  }

  // Process each event; one bad event must not fail the whole batch, or
  // GoCardless will retry the good ones too. Errors are logged for the
  // Netlify function log and swallowed per event.
  for (const event of events) {
    const key = `${event.resource_type}:${event.action}`;
    try {
      if (event.resource_type === 'subscriptions' && event.action === 'created') {
        await handleSignup(event);
      } else if (FAILURE_EVENTS.has(key)) {
        await handleFailure(event);
      }
    } catch (err) {
      console.error(`gocardless-webhook: ${key} ${event.id} failed:`, err.message);
    }
  }

  // Always 2xx once the signature checks out, so GoCardless marks the batch
  // delivered rather than retrying.
  return new Response(null, { status: 204 });
};
