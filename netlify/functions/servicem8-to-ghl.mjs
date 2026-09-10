// ServiceM8 -> GHL sync (goal 1, the "every customer is known to GHL" direction).
//
// Scheduled poll (every 10 min). ServiceM8 webhooks would need a full OAuth
// add-on with an hourly-expiring token; polling with the API key is far lower
// maintenance and customer records don't need per-second freshness. Each run
// looks at ServiceM8 clients changed in the last ~15 minutes (a rolling window
// wider than the interval, so nothing slips between runs) and upserts them into
// GHL as customers.
//
// Stateless by design: no "last sync" store to keep. The 15-over-10 overlap means
// a record may be re-processed once, but the GHL upsert is email-keyed and
// idempotent, so a repeat is a harmless no-op. It also cannot loop with the
// GHL->ServiceM8 direction, which triggers on Opportunity Won (an event this
// never generates).
//
// Contacts are tagged `customer` and sourced `ServiceM8`; suppressing them from
// cold/warm nurture is a GHL workflow rule on that tag (built in the GHL UI), not
// code here.
//
// Env: SERVICEM8_API_KEY, GHL_API_TOKEN, GHL_LOCATION_ID (defaults to the known id).

const SM8 = 'https://api.servicem8.com/api_1.0';
const GHL = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';
const LOCATION_ID = process.env.GHL_LOCATION_ID || '8ZZA5NdhSCekF4CpkFbM';
const WINDOW_MIN = 15;

async function sm8Get(path) {
  const res = await fetch(`${SM8}/${path}`, {
    headers: { 'X-API-Key': process.env.SERVICEM8_API_KEY, Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`ServiceM8 GET ${path} -> ${res.status}`);
  return res.json();
}

// ServiceM8 timestamp format, e.g. "2026-09-10 08:25:21" (UTC, no 'T').
function sm8Timestamp(date) {
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

async function fetchChangedContacts(since) {
  const sinceStr = sm8Timestamp(since);
  // Try a server-side date filter first; ServiceM8's OData filtering is limited
  // and `gt` on edit_date may not be honoured, so we always re-filter client-side
  // below as a safety net (and fall back to a full fetch if the filter 400s).
  let list;
  try {
    const filter = encodeURIComponent(`edit_date gt '${sinceStr}'`);
    list = await sm8Get(`companycontact.json?$filter=${filter}`);
  } catch {
    list = await sm8Get('companycontact.json');
  }
  if (!Array.isArray(list)) return [];
  const sinceMs = since.getTime();
  return list.filter((c) => {
    const edited = Date.parse((c.edit_date || '').replace(' ', 'T') + 'Z');
    return Number.isFinite(edited) && edited >= sinceMs;
  });
}

async function ghlUpsert(body) {
  const res = await fetch(`${GHL}/contacts/upsert`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GHL_API_TOKEN}`,
      Version: GHL_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GHL upsert -> ${res.status}`);
  return res.json();
}

export default async () => {
  const since = new Date(Date.now() - WINDOW_MIN * 60 * 1000);
  let synced = 0, skipped = 0, failed = 0;

  let contacts;
  try {
    contacts = await fetchChangedContacts(since);
  } catch (err) {
    console.error('servicem8-to-ghl: fetch failed:', err.message);
    return new Response('fetch error', { status: 502 });
  }

  // Cache company lookups (many contacts can share one company) for the address.
  const companyCache = new Map();

  for (const c of contacts) {
    const email = (c.email || '').trim().toLowerCase();
    if (!email) { skipped++; continue; } // no email = can't match safely

    try {
      let company = companyCache.get(c.company_uuid);
      if (!company && c.company_uuid) {
        company = await sm8Get(`company/${c.company_uuid}.json`);
        companyCache.set(c.company_uuid, company);
      }
      await ghlUpsert({
        locationId: LOCATION_ID,
        email,
        firstName: c.first || '',
        lastName: c.last || '',
        phone: c.mobile || c.phone || '',
        address1: company?.address || '',
        city: company?.address_city || '',
        postalCode: company?.address_postcode || '',
        tags: ['customer'],
        source: 'ServiceM8',
      });
      synced++;
    } catch (err) {
      failed++;
      console.error(`servicem8-to-ghl: ${email} failed:`, err.message);
    }
  }

  console.log(`servicem8-to-ghl: synced=${synced} skipped=${skipped} failed=${failed}`);
  return new Response(JSON.stringify({ synced, skipped, failed }), {
    status: 200, headers: { 'Content-Type': 'application/json' },
  });
};

// Run every 10 minutes (window above is 15 min for safe overlap).
export const config = { schedule: '*/10 * * * *' };
