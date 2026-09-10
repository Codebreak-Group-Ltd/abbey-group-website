// GHL -> ServiceM8 sync (goal 1, the "a sale becomes a customer" direction).
//
// Triggered by a GHL workflow "Send Webhook" action on Opportunity Status = Won
// (any pipeline). Creates or updates the customer as a ServiceM8 client so every
// sale marked Won in GHL lands in the job system automatically, with no office
// step. This is what closes the gap where homecare-only payers never appeared in
// ServiceM8 (so their annual-service reminder was never set).
//
// The GHL webhook action sends a DEFINED custom-data payload — we control the keys
// in the workflow, so there is no guessing GHL's field names. Expected body:
//   { secret, email, first_name, last_name, phone, mobile, address, city,
//     postcode, plan, source }
// `secret` must equal GHL_SYNC_SECRET (GHL workflow webhooks carry no signature,
// so a shared secret is how we authenticate the caller).
//
// Match/dedupe by email (lowercased): update the existing ServiceM8 client if one
// has that email, else create a new company + contact. Idempotent, so a repeat Won
// event — or the reverse-direction poll re-touching the same record — is a
// harmless no-op and the two directions cannot loop.
//
// Env: SERVICEM8_API_KEY, GHL_SYNC_SECRET.

const SM8 = 'https://api.servicem8.com/api_1.0';

async function sm8(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${SM8}/${path}`, {
    method,
    headers: {
      'X-API-Key': process.env.SERVICEM8_API_KEY,
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) throw new Error(`ServiceM8 ${method} ${path} -> ${res.status}`);
  return res;
}

// Find a companycontact by email (ServiceM8 holds email/phone on the contact,
// not the company). Returns the contact object or null.
async function findContactByEmail(email) {
  const filter = encodeURIComponent(`email eq '${email.replace(/'/g, "''")}'`);
  const res = await sm8(`companycontact.json?$filter=${filter}`);
  const list = await res.json();
  return Array.isArray(list) && list.length ? list[0] : null;
}

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  let data;
  try { data = await req.json(); } catch { return new Response('Bad JSON', { status: 400 }); }

  // Authenticate the caller (no signature on GHL workflow webhooks).
  if (!process.env.GHL_SYNC_SECRET || data.secret !== process.env.GHL_SYNC_SECRET) {
    return new Response('Forbidden', { status: 403 });
  }

  const email = (data.email || '').trim().toLowerCase();
  if (!email) {
    // No email means no safe way to match — skip rather than risk a duplicate
    // in the 1,800-record client base. Logged for the function log.
    console.warn('ghl-to-servicem8: skipped, no email on payload');
    return new Response(null, { status: 204 });
  }

  const name = [data.first_name, data.last_name].filter(Boolean).join(' ').trim() || data.name || email;
  const address = [data.address, data.city, data.postcode].filter(Boolean).join(', ');

  try {
    const existing = await findContactByEmail(email);
    let companyUuid;

    if (existing) {
      // Update the contact's details in place; leave the company record alone.
      companyUuid = existing.company_uuid;
      await sm8(`companycontact/${existing.uuid}.json`, {
        method: 'POST',
        body: {
          first: data.first_name || existing.first,
          last: data.last_name || existing.last,
          phone: data.phone || existing.phone,
          mobile: data.mobile || existing.mobile,
        },
      });
    } else {
      // Create the company (client) first, then its primary contact.
      const companyRes = await sm8('company.json', {
        method: 'POST',
        body: {
          name,
          address,
          address_city: data.city || '',
          address_postcode: data.postcode || '',
          active: 1,
        },
      });
      companyUuid = companyRes.headers.get('x-record-uuid');
      await sm8('companycontact.json', {
        method: 'POST',
        body: {
          company_uuid: companyUuid,
          first: data.first_name || '',
          last: data.last_name || '',
          email,
          phone: data.phone || '',
          mobile: data.mobile || '',
          type: 'Job Contact',
        },
      });
    }

    return new Response(
      JSON.stringify({ ok: true, companyUuid, created: !existing }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('ghl-to-servicem8 failed:', err.message);
    // 502 so GHL's workflow shows the delivery failed and can be retried.
    return new Response('Sync error', { status: 502 });
  }
};
