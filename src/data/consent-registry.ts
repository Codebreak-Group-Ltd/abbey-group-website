/* =====================================================================
   Consent registry — the single source of truth for anything that stores or
   reads data on a visitor's device (build standard §6/§7).

   The cookie policy TABLE IS GENERATED FROM THIS FILE. That is the point: a
   policy that lists a service the site does not load, or misses one it does,
   is a compliance failure either way, and generating it makes drift
   impossible.

   FROM LAUNCH UNTIL 28 AUG 2026 THIS LIST WAS EMPTY, AND THAT WAS ACCURATE —
   the site set no cookies at all. `PUBLIC_META_PIXEL_ID` and
   `PUBLIC_CODEBREAK_PIXEL_SRC` are now real (boiler-draw ad campaign), so the
   two entries below are live and must stay truthful to what `tracking.ts`
   actually loads.

   THE BANNER, THE FOOTER REOPEN LINK AND THE COOKIE POLICY TABLE ALL GATE ON
   THIS FILE'S LENGTH (`CookieConsent.astro`, `Footer.astro`, `LpFooter.astro`,
   `cookies.astro`) — a non-empty registry means the banner now renders on
   every page, including the site pages that carry no tracking of their own,
   because the banner is site-wide, not per-page. This was verified
   end-to-end before launch (accept/reject/manage all worked, table generated
   correctly, footer reopen worked on both footers).

   ADDING A NEW SERVICE IS THREE EDITS, NOT A REBUILD:
     1. Add the entry here.
     2. Add the loader to `src/lib/tracking.ts`, gated on a real env var so a
        forgotten one fails safe rather than sending a bad ID.
     3. Add the provider to `processors` in `src/data/legal.ts` (privacy
        policy must name every processor the cookie table lists — build
        standard §7).
   Nothing in `analytics` or `advertising` may load before consent, and none
   of it will: `CookieConsent.astro` is the only thing that calls the loaders
   in `src/lib/tracking.ts`, and only after Accept/Save with that category on.
   ===================================================================== */

export type ConsentCategory = 'necessary' | 'analytics' | 'advertising';

export type ConsentService = {
  /** Name shown in the cookie table. */
  name: string;
  /** Who runs it. */
  provider: string;
  category: ConsentCategory;
  /** Plain English, for a visitor rather than a developer. */
  purpose: string;
};

export const consentRegistry: ConsentService[] = [
  /* Live from 28 Aug 2026 (Josh) for the boiler-draw ad campaign landing
     pages. Loading code is `loadMetaPixel()`/`loadCodebreakPixel()` in
     `src/lib/tracking.ts`, both gated the same way GA4 always was: real
     env var required, and nothing fires until Accept/Save. */
  { name: 'Meta Pixel', provider: 'Meta', category: 'advertising',
    purpose: 'Measures which adverts and pages lead to an enquiry, for our own advertising only.' },
  { name: 'Codebreak Campaign Tracking', provider: 'Codebreak', category: 'analytics',
    purpose: 'Measures how the ad landing pages perform, for our marketing agency’s reporting.' },

  /* Example, ready for launch — uncomment WITH the loading code, never before:

  { name: 'Google Analytics 4', provider: 'Google', category: 'analytics',
    purpose: 'Tells us how many people visit and which pages they use, so we can improve the site.' },
  */
];

export const categoryLabels: Record<ConsentCategory, string> = {
  necessary: 'Strictly necessary',
  analytics: 'Analytics',
  advertising: 'Advertising',
};
