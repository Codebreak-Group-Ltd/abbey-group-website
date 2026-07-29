# LAUNCH.md — Abbey Group build runbook

Living tick-list of what is done and what is still open. Update as items land.

## Done (foundation + first 3 pages — for client review)

- [x] Astro project scaffolded (static, trailing-slash `always`, sitemap, sharp,
      inline critical CSS, compressHTML). Node 20 pinned.
- [x] Design tokens ported and reconciled to client-confirmed hex + fonts
      (DM Serif Display + Inter, self-hosted latin woff2).
- [x] Global components: Header (fixed, scroll-shrink, hamburger-at-all-widths
      menu with Escape/outside-click/focus), Footer (NAP, legals, badges),
      Button, Icon, Section, Eyebrow, PhotoSlot, Reviews, FAQ, Areas, PageHero,
      EnquiryForm. BaseLayout with SEO/OG + Organization + WebSite schema.
- [x] **Home** — 9 sections per handover + Home copy; LocalBusiness + FAQPage +
      Breadcrumb schema; hero crescent parallax (reduced-motion safe).
- [x] **Homecare Plans** — 3-plan choice high on page, comparison table,
      sign-up offer, landlord/business route, Service + FAQPage + Breadcrumb.
- [x] **Plumbing & Heating** — services, emergency band, landlord gas safety,
      cover cross-sell, Service + FAQPage + Breadcrumb.
- [x] Verified: build clean; 1 H1/page; titles ≤60; canonicals slashed+absolute;
      valid JSON-LD; AggregateRating uses real 4.6/19 only; **zero horizontal
      overflow at 390px**; CTA above fold on mobile; no console errors.
- [x] WCAG AA contrast pass on the actual pairs — failing brand shades banned
      for text (see reconciliations).

## Reconciliations (design handover vs confirmed project content)

Project content wins on *what the site says*; handover wins on *how it looks*.

- Rating **4.6 / 19** everywhere (handover said 4.9). AggregateRating uses this only.
- Address **20 Skinner Street, Whitby YO21 3AJ** (handover said "Unit 3 The Archway";
  its "From 1 September / meet Natasha" placeholder dropped for confirmed copy).
- **"Family-run" not used** anywhere (per James).
- Fonts: **DM Serif Display + Inter**, self-hosted (handover's Source Serif/Manrope
  were flagged substitutes). No mono face — phone/prices use Inter tabular figures.
- **One CTA colour (orange)**; two-tier button hierarchy (solid primary / outline
  secondary). Handover used blue for "Get a Quote" — changed to the confirmed
  orange-CTA rule. Division accents identify a service, never recolour the CTA.
- CTA orange deepened to `#c94d28` so white button text passes AA (4.59:1); the
  vivid brand `#eb6740` stays as the accent for fills/tints/glows. **Decision for
  client:** keep this, or accept lighter orange / navy-on-orange text.
- `--text-link` = blue-800, `--text-muted` = `#6f6e82`, accent text/icons use
  darkened "-ink" shades — all so accent-coloured text passes AA on white.
- Homepage Electrical division card uses blue (green fails as text/small icon on
  white; green is reserved for large highlights on the Electrical page).
- Brand SVGs (logos + crescents) recoloured from handover-derived hex to confirmed.

## Outstanding before go-live (from `_Specs/01 OUTSTANDING FROM CLIENT.md`)

- [ ] **Photography** — all images are `PhotoSlot` placeholders; swap per each
      page's `image-manifest.md` when Amy's shoot lands. Map on Home is a
      placeholder (wire a real, lazy, consent-aware embed).
- [ ] **Per-page OG images** — `public/og/default.png` is a branded placeholder;
      generate 1200×630 per key page.
- [ ] **GHL webhook** — `EnquiryForm` posts to `PUBLIC_GHL_WEBHOOK` (unset →
      validates + confirms without posting). Wire per build standard §8, one
      webhook per funnel; fire a sample payload for field mapping.
- [ ] **Consent + tracking (§6/§7)** — no tracking scripts exist yet, so zero
      pre-consent tracking is trivially true. Build the consent-gated registry +
      banner when GA4 / Ads / Meta IDs arrive at launch.
- [ ] **Remaining pages** — Renovations, Building & Joinery, Electrical, About,
      Contact, Book Online, Reviews, Utility (Privacy/T&Cs/Credits).
- [ ] **Division logos** — full-colour + per-division colourways (folder empty;
      only Group wordmark + crescents in hand).
- [ ] Legal pages: final processor list, retention periods, credit line, solicitor review.
- [ ] Deploy: GitHub org repo + Netlify, branch protection, preview password gate.
- [ ] Lighthouse on the live domain (PSI twice); CrUX watch post-launch.

## Notes

- `/reviews/` is linked from Home/pages but not built yet (pending page) — link
  resolves once that page lands.
- Trailing-slash canon holds: canonical == sitemap URL == 200 URL.
