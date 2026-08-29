/* =====================================================================
   Tracking loaders — GA4 and Meta Pixel, both consent-gated.

   NOT LIVE TODAY, AND THAT IS CORRECT. Abbey has not provided a real GA4
   Measurement ID or Meta Pixel ID yet (`_Specs/01 OUTSTANDING FROM CLIENT.md`
   B2). The IDs below read from env vars first and fall back to an obvious
   placeholder — the same pattern `EnquiryForm.astro` uses for
   `PUBLIC_GHL_WEBHOOK` — so nothing here silently activates. `isReal*()`
   below refuses to load anything against a placeholder, so even a forgotten
   env var fails safe rather than sending a bad ID to Google or Meta.

   WHY THIS EXISTS BEFORE THE IDS DO: the standing rule (build standard §6/§7,
   repeated in Outstanding D2) is that a pixel must never ship without the
   consent banner and its `consent-registry.ts` entry IN THE SAME CHANGE —
   shipping the loader now, inert, means the day real IDs arrive, turning
   tracking on is three edits (below, `consent-registry.ts`, `legal.ts`
   processors), not a rebuild under deadline pressure.

   CALLED FROM: `CookieConsent.astro` (loads on consent granted, and on every
   page load if consent was already granted — this is what fires `PageView`
   on every page, including all three landing pages, with zero page-specific
   code). `fireLead()` is called once, from `/lp/thank-you/`'s own script,
   guarded/polled per build standard §7 ("conversion events fire only after
   consent").
   ===================================================================== */

const GA4_ID = (import.meta.env.PUBLIC_GA4_ID as string | undefined) || 'GA4_MEASUREMENT_ID';
const META_PIXEL_ID = (import.meta.env.PUBLIC_META_PIXEL_ID as string | undefined) || 'META_PIXEL_ID';
/* Codebreak's own campaign-tracking script (the "hub" pixel), same
   env-var-first/placeholder-fallback pattern as GA4/Meta above — a missing
   env var means this stays inert rather than loading an empty `<script src>`. */
const CODEBREAK_PIXEL_SRC = (import.meta.env.PUBLIC_CODEBREAK_PIXEL_SRC as string | undefined) || '';

export const isRealGa4Id = (id: string) => /^G-[A-Z0-9]+$/.test(id);
export const isRealMetaPixelId = (id: string) => /^\d{15,16}$/.test(id);

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string };
    _fbq?: unknown;
  }
}

let ga4Loaded = false;
let metaLoaded = false;

/** Injects gtag.js and configures GA4. No-op if the ID is still the placeholder. */
export function loadGa4(): void {
  if (ga4Loaded || !isRealGa4Id(GA4_ID)) return;
  ga4Loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function (...args: unknown[]) { window.dataLayer!.push(args); };
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);
  window.gtag('js', new Date());
  window.gtag('config', GA4_ID);
}

/** Injects the Meta Pixel base code and fires PageView. No-op on the placeholder ID. */
export function loadMetaPixel(): void {
  if (metaLoaded || !isRealMetaPixelId(META_PIXEL_ID)) return;
  metaLoaded = true;
  /* Meta's own base code, unminified so it reads like the rest of this repo. */
  (function (f: Window, b: Document) {
    if (f.fbq) return;
    const n: Window['fbq'] = function (...args: unknown[]) {
      if (n.callMethod) n.callMethod(...args);
      else n.queue!.push(args);
    } as Window['fbq'];
    f.fbq = n;
    if (!f._fbq) f._fbq = n;
    n.queue = [];
    n.loaded = true;
    n.version = '2.0';
    const t = b.createElement('script');
    t.async = true;
    t.src = 'https://connect.facebook.net/en_US/fbevents.js';
    b.head.appendChild(t);
  })(window, document);
  window.fbq!('init', META_PIXEL_ID);
  window.fbq!('track', 'PageView');
}

let codebreakLoaded = false;

/** Injects Codebreak's campaign-tracking script tag. No-op if the src isn't set. */
export function loadCodebreakPixel(): void {
  if (codebreakLoaded || !CODEBREAK_PIXEL_SRC) return;
  codebreakLoaded = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = CODEBREAK_PIXEL_SRC;
  document.head.appendChild(script);
}

/** Loads whichever consented, real-ID services aren't loaded yet. Safe to call repeatedly. */
export function loadConsentedTracking(consent: { analytics: boolean; advertising: boolean }): void {
  if (consent.analytics) {
    loadGa4();
    loadCodebreakPixel();
  }
  if (consent.advertising) loadMetaPixel();
}

/**
 * Fires the boiler-draw campaign's Lead conversion. Called once, from
 * `/lp/thank-you/`. `planInterest`/`landingPage` come straight off that
 * page's own `?plan=`/`?source=` query params — see that page's script.
 *
 * `contentName` ('Homeowners' | 'Landlord', added 28 Aug 2026 for Meta ads
 * reporting) lets the same shared thank-you page report the Lead as one of
 * two named audiences, without a second thank-you page or a second pixel —
 * the caller derives it from the same `isLandlord` check it already does to
 * pick which confirmation block to show.
 */
export function fireLead(params: { planInterest?: string; landingPage?: string; contentName?: string }): void {
  if (window.fbq && isRealMetaPixelId(META_PIXEL_ID)) {
    window.fbq('track', 'Lead', {
      plan_interest: params.planInterest,
      landing_page: params.landingPage,
      content_name: params.contentName,
    });
  }
  if (window.gtag && isRealGa4Id(GA4_ID)) {
    window.gtag('event', 'conversion', { plan_interest: params.planInterest, landing_page: params.landingPage });
  }
}
