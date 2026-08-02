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

   WHEN TRACKING GOES LIVE: add the service here, in the same change as the
   script that loads it. The cookie policy updates itself; nothing else needs
   editing. Nothing in `analytics` or `advertising` may load before consent.
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
  { name: 'Google Ads', provider: 'Google', category: 'advertising',
    purpose: 'Measures which adverts lead to an enquiry.' },
  { name: 'Meta Pixel', provider: 'Meta', category: 'advertising',
    purpose: 'Measures our Facebook and Instagram advertising.' },
  */
];

export const categoryLabels: Record<ConsentCategory, string> = {
  necessary: 'Strictly necessary',
  analytics: 'Analytics',
  advertising: 'Advertising',
};
