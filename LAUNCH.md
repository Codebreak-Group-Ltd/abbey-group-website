# LAUNCH.md — Abbey Group build runbook

> **New session?** Read `_Specs/08 BUILD HANDOVER.md` in the client Dropbox
> folder first for orientation, then this file for the detail.

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

## Build-review round 3 (Josh, 29 July 2026) — done

- [x] **Footer colour-matches the page.** Each division has a `surfaceFooter`
      derived by darkening its own `surfaceDark` toward ink-950, so the footer is
      always the same hue as the page and provably deeper than it. Plus a
      division accent rule along the top and an accent-tinted Gas Safe chip.
- [x] **One lockup everywhere** (`Lockup.astro`). The genuine "ABBEY" wordmark
      was extracted as paths from `group-on-dark.svg` (the art splits cleanly:
      3 crescent paths, ABBEY as 5 glyphs, GROUP as 5) and cropped to
      `abbey-wordmark-white.svg`. Header, hero badge and footer now all use the
      same construction, so Group and every division are visually identical and
      differ only in crescent colour and descriptor. Only the small descriptor is
      site type; swap the whole thing here when real vector lockups arrive.
- [x] **Homepage divisions grid**: sixth tile added (navy "Something else?"
      catch-all with the Group tri-colour mark and the office number), so the
      3x2 grid no longer has a hole. Cards lean into their colour with a 5px
      division tab across the top, a 4% accent-tinted body and accent link text.
      Electrical now uses its real green, safe since `--green-ink` exists.
- [x] **Reviews grid self-balances**: column count is derived from the review
      count, so the last row is never ragged. Homepage now runs 8 verified
      reviews at 4x2 (added Beverley Sabine and Karen, both previously unused,
      quoted verbatim including exclamation marks).
- [x] **Areas panel added to the homepage**, using the Group tri-colour mark.

## Build-review round 4 (side-chat note, 29 July 2026) — done

Both items were still outstanding when the note arrived; neither had been actioned.

- [x] **Adjacent sections sharing a background (bug).** `Reviews.astro` hardcoded
      `bg="sunken"`, so any sunken section before it butted into an identical
      band. Added a `bg` prop and re-sequenced the tails. **The note listed two
      pages; there was a third**: the homepage had `Areas` (white) against
      "Find us on Skinner Street" (white). Fixed on all three.
      Standard tail is now: Reviews (white) -> Areas (sunken) -> FAQ (white)
      -> Enquiry (sunken) -> Final CTA (white).
      Review cards and FAQ items now invert against their section ground
      (white cards on a sunken band, sunken cards on a white band) so they keep
      separating whichever way a page is sequenced.
- [x] **`tools/audit.mjs` pre-deploy audit** (`npm run audit`, or
      `npm run verify` for build + audit). Walks `dist/` and fails the build on:
      adjacent sections sharing a background, title >60, meta description >155,
      H1 count != 1, missing/relative/unslashed canonical, `<img>` without alt,
      invalid JSON-LD, and any Google Fonts reference. Warns on missing OG tags
      or absent schema. **Validated by reintroducing the clash: audit exits 1 and
      names the offending section pair; exits 0 once fixed.**
- [x] **Six reviews per trade page**, 3x2 via the auto-column grid, most relevant
      first. Homecare leads with Angela (home plan value); Plumbing leads with
      Angela Weldon (came within hours). All complete quotes only, verbatim from
      the reviews master, exclamation marks kept. Sonia Wood now uses her full
      text, including the opening clause earlier page copy had trimmed.
      All three review sets moved into `src/data/site.ts` so verified quotes live
      in one place.
- [x] Inline links now follow the division accent (`--text-link` is set in
      `divisionVars`), so an orange page has no stray blue links. All four
      division link inks pass AA on both white and sunken grounds.

## Build-review round 5 (Josh, 29 July 2026) — done

- [x] **Stray "banner" strips above and below bands (bug).** `Section` applied its
      own 96px vertical padding *and* the inner bleed band added its own, so a
      flat strip of the section colour showed above and below every gradient
      band. Bleed sections now get `padding-block: 0` (`section--bleed`), since
      the band owns its padding. Fixed everywhere at once, desktop and mobile.
- [x] Hero trust row is an even 2x2 grid, not a wrapping flex row that orphaned
      "Rated 4.6 on Google" onto its own line.
- [x] Header phone number can never wrap (`white-space: nowrap`), and below 700px
      it moves into the menu panel entirely.
- [x] **Mobile header is no longer sticky** (`position: absolute`), so it scrolls
      away and gives content the full viewport. Replaced by
      `ScrollTop.astro`: a mobile-only back-to-top button, bottom right, in the
      page's division accent with a navy glyph (the one glyph colour legible on
      all four accents), reduced-motion aware.
- [x] **Mobile menu panel revised**: full width between the gutters, 16.5px links
      with ~53px touch targets, and the phone number + Get a Quote inside the
      panel, as `_Global/Header Footer` specifies for mobile.
- [x] **Footer is two columns on mobile** instead of one long stack.
- [x] **Homepage hero is now the branded van**, big, bottom right, bleeding past
      the edge, driving off to the right as the hero scrolls away (scroll
      progress -> translateX via a custom property, transform only,
      rAF-throttled, disabled under reduced motion, clipped by the hero so it can
      never cause horizontal overflow). The supplied van photo already has a
      transparent background, so it drops straight onto the navy.
      **It faces right, so it exits right**: mirroring would reverse the ABBEY
      GROUP wordmark on the side. A left-facing photo would be needed to drive
      off to the left.
      The team-and-fleet shot is freed up for the About page, which is where it
      belongs (`07 About/Images/about-team-group-with-vans.jpg`).

## Build-review round 6 (Josh, 29 July 2026) — done

- [x] Homepage hero eyebrow changed from "Whitby based" to **"One team, every
      trade"**, and the crescent mark beside it removed: the Abbey lockup already
      sits top-left and the two were close on desktop, closer on mobile.
      Copy source updated and flagged for re-proofing (both lines were signed off).
- [x] Handover doc gained six more standing rules (12-17) covering the round-5
      lessons that had only been recorded as "what we did": even grids instead of
      wrapping rows, no-wrap on phone numbers, one brand mark per screen region,
      no repeated phrases within a screen, feature treatment for commercially
      valuable sections, and fix causes not instances. Plus a "what you get free
      from the global components" note so pages are not rebuilt from scratch.

### OPEN — needs Josh's call before the next page ships

"One team, every trade" is now the hero eyebrow **and** the third trust-strip item
directly below it, so the phrase appears twice within a screen. Both lines were
client-signed-off, so the trust strip was left alone rather than changed
unilaterally. Recommended: change the trust strip item to **"Every trade under one
roof"** and keep the new eyebrow. Also recorded in
`_Specs/08 BUILD HANDOVER.md` and `01 Home/Text/Home - COPY.md`.

### Cross-sell band note (learned the hard way)

The Homecare cross-sell on Plumbing & Heating **stays in Plumbing's own blue**.
An earlier version swapped the band to Home Care's warm colourway to signal "a
different product" and was rejected: someone that far down the page came for a
boiler or heating job, so the section has to feel like part of the page they are
on. The offer content does the work, not a colour change. Same rule applies to
the Homecare cross-sell wherever it appears on other trade pages.

### Standing rule

**Adjacent sections must never share a background.** Alternate white / sunken,
with dark bands as punctuation. `npm run audit` enforces it, so it cannot ship
silently as more pages are built.

**Reviews stay a static grid.** A marquee needs client JS, a pause control and
reduced-motion handling, works against the zero-JS / TBT-zero target, and hides
most reviews from scanning and from indexable content. The scroller is reserved
for `/reviews/`, where showing all ~20 is the point.

### Still to do on the division system

- [ ] **Renovations page** — positioning RESOLVED (Josh, 29 July 2026).

      Renovations and Building & Joinery are the same team but deliberately
      separate pages:
      - **Search**: "joiner Whitby" / "bespoke joinery" are searched separately
        from "home renovation Whitby". Merging loses the joinery searches.
      - **Different jobs**: Renovations is whole-room and whole-house projects
        managed start to finish (kitchens, bathrooms, extensions). Building &
        Joinery is made-to-measure joinery and structural work. Different
        customer, different intent.
      - **Different proof**: named projects (Riviera, Customs House, Argyle Road)
        sit on Renovations; Building & Joinery shows close-up craft. The two
        pages cross-link.
      - Renovations is the **more premium and more expensive** service and is to
        be treated as such.

      Design decision following from that: Renovations is **plum-anchored** (same
      family as Building & Joinery, same team) but sits visibly above it —
      warm timber and stone tones, more editorial whitespace, larger photography.
      It keeps the **Abbey Group** lockup in the header rather than the Abbey
      Building & Joinery one, because a page headed "Renovations" carrying the
      Joinery lockup would confuse, and would subordinate the flagship service to
      the craft sub-brand. Building & Joinery keeps its own plum lockup.
      Overturn this if the client wants Renovations badged under Joinery.
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
- [x] **Areas section design reference** received and applied (round 2/3).
- [x] **Call-out wording resolved (Josh, 29 July 2026):** "one free call-out" and
      the brochure's "1 hour free call out" mean the same thing. Site copy stays
      **"one free call-out"**; no need to state the duration.
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
