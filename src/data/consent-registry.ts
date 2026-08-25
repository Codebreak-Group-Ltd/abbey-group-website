/* =====================================================================
   Consent registry — the single source of truth for anything that stores or
   reads data on a visitor's device (build standard §6/§7).

   The cookie policy TABLE IS GENERATED FROM THIS FILE. That is the point: a
   policy that lists a service the site does not load, or misses one it does,
   is a compliance failure either way, and generating it makes drift
   impossible.

   RIGHT NOW THIS LIST IS EMPTY, AND THAT IS ACCURATE. The site sets no
   cookies at all: fonts are self-hosted, there is no analytics, no ad pixel,
   no chat widget, no map embed, and the enquiry form no longer writes anything
   to the device (attribution is read from the URL at the moment you submit).

   THE BANNER, THE FOOTER REOPEN LINK AND THE COOKIE POLICY TABLE ALL GATE ON
   THIS FILE'S LENGTH (25 Aug 2026, `CookieConsent.astro`, `Footer.astro`,
   `LpFooter.astro`, `cookies.astro`) — an empty registry correctly means no
   banner renders anywhere, on any page, including the three boiler-draw
   campaign pages. This was verified end-to-end with two temporary test
   entries (accept/reject/manage all worked, table generated correctly,
   footer reopen worked on both footers) before being reverted to empty for
   this commit.

   WHEN TRACKING GOES LIVE, three edits, not a rebuild:
     1. Uncomment the two entries below (or add real ones).
     2. Set `PUBLIC_GA4_ID` (starts `G-…`) and/or `PUBLIC_META_PIXEL_ID` (15-16
        digits) as Netlify env vars — `src/lib/tracking.ts` refuses to load
        anything against the placeholder IDs it falls back to otherwise, so a
        forgotten env var fails safe rather than sending Google/Meta a bad ID.
     3. Add Google/Meta to `processors` in `src/data/legal.ts` (privacy policy
        must name every processor the cookie table lists — build standard §7).
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
  /* Examples, ready for launch — uncomment WITH the loading code, never before:

  { name: 'Google Analytics 4', provider: 'Google', category: 'analytics',
    purpose: 'Tells us how many people visit and which pages they use, so we can improve the site.' },
  { name: 'Meta Pixel', provider: 'Meta', category: 'advertising',
    purpose: 'Measures which adverts and pages lead to an enquiry, for our own advertising only.' },
  */
];

export const categoryLabels: Record<ConsentCategory, string> = {
  necessary: 'Strictly necessary',
  analytics: 'Analytics',
  advertising: 'Advertising',
};
