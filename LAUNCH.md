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

## Build-review round 1 (Josh, 29 July 2026) — done

- [x] Footer credit is now "Website by Codebreak" linking to
      `codebreak.co.uk/websites/`. The `/credits/` route is no longer linked
      (still defined in `routes` if a credits page is wanted later).
- [x] Homecare "Most popular" moved to the middle tier (Service Care+); section
      intro reworded to match; Ultimate Home Care no longer says "everything
      above". Copy source updated + flagged for client re-proofing.
- [x] Sign-up offer rewritten as a no-brainer offer block (plain maths, itemised
      stack, genuine risk-reversal). One number comparison retained.
- [x] Areas section restyled from repeated map-pin chips to a hairline-ruled
      directory panel with Whitby marked as the base.
- [x] **Division identity system** (`src/data/divisions.ts`): a page declares
      `division` once on BaseLayout and every accent follows via
      `--page-accent{,-ink,-soft,-glow}`. Per-division single-colour crescent
      marks generated from the vector brand mark. Trade heroes carry an
      "Abbey <division>" badge, division watermark, glow and top rule.
      Plumbing & Heating themed blue with two more service-specific photos.
- [x] Added `--green-ink` (#4a6529). Electrical green is BANNED as text: even
      `--green-950` is only 4.31:1 on white. All four division inks now pass AA.

## Build-review round 2 (Josh, 29 July 2026) — design direction agreed

Direction confirmed: **tinted navy + heavy accent** per division, **header lockup
swaps** on division pages, **Renovations = warm timber and stone, plum-anchored**,
**area list stays at the 11 confirmed places**.

- [x] Areas section rebuilt as an inverted panel (navy ground, display-serif
      heading, 4-column ticked grid, division tick discs) per Josh's reference.
      Uses Abbey's signature corner geometry at panel scale, not a copy.
- [x] `surfaceDark` added per division: dark sections now sit on navy tinted
      toward the division hue, so each trade page reads as its own colour.
      Plumbing `#133d60`, Homecare `#4c2238`, Joinery `#342650`,
      Electrical `#36483c`. All keep white text above 9:1.
      Set via `--surface-page-dark` in `divisionVars()`, so every
      `Section bg="dark"` on the page follows automatically.
- [x] Header swaps to the division lockup on division pages (crescent + stacked
      ABBEY / division), and the scrolled bar takes the page's own dark ground
      with an accent hairline. Group logo returns on Home/About/Contact.
- [x] Primary CTA gained a light hairline ring: invisible on white, but keeps the
      orange button separate on dark and warm grounds (Homecare, where the
      division colour and the CTA colour are the same family).
- [x] All inner-section watermarks now use the division mark, not the tri-colour
      Group mark.

### Still to do on the division system

- [ ] **Renovations page**: warm timber and stone, plum-anchored premium
      treatment. No sub-brand lockup exists for Renovations in the client's set,
      so the assumption is: no division badge, header keeps the Group logo,
      plum used as the anchor accent. **Confirm with James/Amy whether
      Renovations formally sits under Abbey Building & Joinery.**
- [ ] Apply the division system to Building & Joinery (plum) and Electrical
      (green) when those pages are built. Watch green: it is a highlight only,
      never text (see `--green-ink`).

### Still open from that review

- [ ] **Division logo lockups**: supplied art is four ~320px screenshots plus a
      PDF that contains only a raster (no vector paths). The hero badge is
      therefore built from the vector crescent + site type. Ask the client for
      true vector (AI/EPS/SVG) or high-res transparent PNG lockups, then swap in.
      A 3375px raster of the Electrical lockup can be extracted from the PDF if
      needed for that page.
- [ ] **Areas section design reference**: the image Josh attached did not reach
      the build, so the current treatment is designed on judgment. Re-share to
      align.
- [ ] **Copy vs plan-data discrepancy**: page copy says Service Care includes
      "one free call-out"; the brochure (`02 PLAN DATA`) says "1 hour free call
      out". Confirm which is correct, it is a material difference.
- [ ] More per-trade imagery as it arrives (Renovations has the full Riviera set
      ready; Electrical still has no photography at all).

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

- [~] **Photography** — real shoot photos wired for the built pages
      (pre-optimised WebP in `public/images`, sized to <=2x slot, cover-cropped):
      Home hero (team + fleet + Whitby Abbey), 4 of 5 division cards, Homecare
      hero (boiler service), Plumbing hero (radiator fit). Still placeholders:
      **Electrical** (no photo in this shoot), the Home **map/office** slot
      (office being fit out — wire a real lazy, consent-aware map embed), and all
      not-yet-built pages. Source originals live in the Dropbox `Images/` folders;
      About + Renovations (Riviera set) photos are in hand for those pages.
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
