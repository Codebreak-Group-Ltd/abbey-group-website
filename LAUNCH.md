# LAUNCH.md — Abbey Group build runbook

> **New session?** Read `_Specs/08 BUILD HANDOVER.md` in the client Dropbox
> folder first for orientation, then this file for the detail.

Living tick-list of what is done and what is still open. Update as items land.

## Boiler-draw campaign build + two things parked for the next phase (25 August 2026)

The three campaign landing pages, the shared `/lp/thank-you/`, the full
`/lp/boiler-draw-terms/`, the GHL webhook wiring, and the cookie-consent +
GA4/Meta tracking scaffolding are all built (see the campaign folder's
`Launch Readiness Checklist.md` for the campaign-side status). Real hero
images are in. Abbey's outstanding answers are folded in, and the draw terms
have had a legal-hardening pass ahead of the solicitor.

**Still blocking the campaign going live** (owners in brackets):

- [ ] **GA4 property + Meta Pixel created for Abbey (Codebreak).** This is on
      us to set up in Abbey's Google/Meta accounts. It cannot be done from the
      codebase: it needs account access and business verification. The moment
      the two IDs exist, wiring them is three edits (consent registry, the two
      Netlify env vars, `legal.ts` processors) and the consent banner then goes
      live on its own. Meta domain verification + Aggregated Event Measurement
      have lead time, so start them alongside, not after.
- [ ] **GHL webhook live.** Field mapping and custom fields done (Josh, 25 Aug).
      Remaining: the variant-tagging If/Else, the notify/nurture workflow
      actions, and setting `PUBLIC_GHL_WEBHOOK` in Netlify, then a live test.
- [ ] **Solicitor pass** on `/lp/boiler-draw-terms/` and on the Home Care Plan
      Terms landlord amendment (see below).
- [ ] **Priority response, weekend or weekday** — Abbey to confirm; the site is
      already weekday-only, so this is about the ad/email copy in the campaign
      folder, not the site.
- [ ] **Landlord Care terms.** `/homecare-plan-terms/` was amended (25 Aug) so
      it no longer says owner-occupier / owned-property-only, which had
      contradicted Landlord Care. It carries a visible "Amendment for review"
      flag. This is a plain-language fix to remove the contradiction, NOT final
      legal drafting: the solicitor and Abbey must confirm it, especially how
      the landlord's Gas Safety (Installation and Use) Regulations 1998 duties
      and tenant access sit alongside the Plan.

**Parked for the next phase, once the campaign pages are signed off** (raised
by Josh, 25 Aug, so they are not forgotten):

1. **Site-wide tracking + consent activation.** The consent banner already lives
   in `BaseLayout`, so it is site-wide by construction, not per-page: the one
   registry/env-var flip that turns it on for the campaign turns it on
   everywhere. No extra per-page work. Just needs the real IDs (above).
2. **Main-site GHL automations.** The main site's forms (Contact, Homecare,
   the service pages) already POST to the same `PUBLIC_GHL_WEBHOOK` pattern, so
   they will flow to GHL once the env var is set, but they will want their own
   workflow routing distinct from the campaign (different tags, different
   follow-up, no draw logic). To be built when we move onto the main site.

## Repo now on GitHub, deploy still needs Netlify connected (5 August 2026)

The repo was local-only with nothing pushed until today (see `08 BUILD
HANDOVER.md`). Now:

- [x] **GitHub.** Pushed to `Codebreak-Group-Ltd/abbey-group-website` (private),
      per the build standard §1 ("repo lives in the company GitHub org, not a
      personal account"). `main` has no branch protection yet — add a ruleset
      requiring PRs before go-live, per the same section.
- [x] **`netlify.toml` added**, so build command (`npm run build`) and Node
      version (20, matching `.nvmrc`) are explicit rather than autodetected.
- [ ] **Netlify site not created yet.** This needs a human: Netlify's GitHub
      connection is an OAuth step in their dashboard that can't be done from
      here. To connect it: app.netlify.com → Add new site → Import an existing
      project → GitHub → `Codebreak-Group-Ltd/abbey-group-website`. It should
      read `netlify.toml` automatically; if it prompts anyway, build command is
      `npm run build`, publish directory is `dist`.
- [ ] **Password-gate the preview**, per the build standard §1
      ("unfinished work can't leak or get indexed"). Two ways: Netlify's own
      Visitor Access password (Site settings → Sharing → Visitor access, needs
      a paid tier) is zero-code; an env-var-gated edge function is the
      free-tier alternative but isn't built yet. Decide which, before the
      preview URL gets shared outside Codebreak/Abbey.
- [ ] **Branch protection on `main`** once the Netlify Deploy Preview flow is
      confirmed working (branch → PR → preview → merge → live, build standard
      §1). No direct pushes to main after that, including copy tweaks.
- [ ] DNS for abbeygroup.uk, and pointing it at the Netlify site, is a separate
      later step — not needed for a first working preview URL.

## LP review round 1 (Josh, 3 August 2026) — done, for review

Five notes on `/lp/homecare/`. All actioned. `npm run verify` clean, no console
errors, and every site page re-checked as unaffected.

- [x] **The hero sentence did not make sense, and he was right.** It read "The
      national providers will give you a date. We are on Skinner Street in Whitby,
      and you deal with the same local team every year." The intended contrast was
      *national = a slot weeks out and a stranger; us = local, fast, same faces*, but
      "we are on Skinner Street" is not an answer to "will give you a date", so the
      two halves did not connect. That phrasing was my own hedge to avoid the spec's
      "twenty minutes down the road", which implies an unconfirmed response time.
      Now: **"With a national provider you get a call centre and a date in the diary.
      With us you get a Whitby team, priority response, and the same engineers
      looking after your boiler year after year. Cover from £9.99 a month."**
      The contrast is explicit, and every Abbey-side claim is confirmed — "priority
      response" is the plan's own term from `02 PLAN DATA`, and there is still no
      response-time promise.
- [x] **"What every plan includes" rebuilt as a card grid.** Josh: "visually very
      boring and not catching the eye... this section is important to read and be
      easy to understand at a glance as it is essentially selling it." It was a flat
      two-column list where all six items carried **the same tick icon**, so six
      different things read as one grey list.
      Now a 3x2 card grid, and **each item has its own glyph**: wrench, shield,
      gauge, filter, thermometer and a heartbeat line for the health check. Four new
      icons added to `Icon.astro` for it. The disc is now the accent at full strength
      with a navy glyph (standing rule 5) instead of a 4% tint, the item name is
      17.5px semibold, and each card carries a quiet 01-06 index so the six read as a
      countable set. Heading changed to **"Six checks, one visit, every single
      year"**, which states the quantity up front.
      Grid steps 3 -> 2 -> 1, all of which divide six evenly, so no step leaves a
      ragged final row (rule 12).
- [x] **The plan finder now says what it is, and looks like a tool.** Two problems.
      The eyebrow read "Not sure which one" directly above an H2 reading "Not sure
      which one is yours?" — **the same phrase twice in one screen, which is standing
      rule 15, and I introduced it.** And between them they never said what the thing
      below actually did.
      Now: eyebrow **"Plan finder"**, H2 **"Answer three questions, see your plan"**
      (an instruction, not a question), and a lead that says what happens. The picker
      sits in a **white panel with a 4px accent rule along the top**, so it reads as
      something to use.
- [x] **AND THAT PANEL FIXED A REAL BUG I HAD SHIPPED.** `PlanPicker`'s result card
      has a **sunken** background, which is correct on `/homecare-plans/` where the
      tool sits on a white section. On the LP I had put it on a **sunken** section, so
      the result card was the same colour as the band it sat on and had no edge at
      all. Verified now: panel `rgb(255,255,255)`, result card `rgb(241,241,243)`.
      Re-checked `/homecare-plans/` is unchanged (sunken card on a white section).
- [x] **The proof band rebuilt, and the Facebook figure dropped.** Josh: "honestly
      just looks a bit shit... needs logos or visual hooks, 7 recommendations from
      Facebook isn't really something to shout about."
      Both fair. It is now a **dark band with the division crescent behind it**, so
      the score carries the same weight as the £48 offer instead of sitting in a thin
      white gap, with the rating set at 46px against a star mark and a
      calendar mark. **Facebook is gone entirely** — seven recommendations invited a
      comparison with nineteen Google reviews and lost it.
      **No logo bar, and this is a hard limit rather than a choice:** neither the Gas
      Safe nor the OFTEC badge file exists in the repo, and composing convincing
      badge art is standing rule 21. If Amy sends the badge files, this band is where
      they go, and it is already the right shape for them.
      One detail worth stating: it shows **one** star glyph, not five. `Stars.astro`
      renders whole stars only, and five filled stars beside "4.6" would be an
      embellishment (rule 6a).
- [x] **The urgency section is gone.** Josh: "I have no idea what this is meant to
      be... think we just get rid." He is right, and the reason is worth recording:
      **that section existed to satisfy a checklist item, not because the page needed
      it.** Its two facts were the 14-day claims wait and "diaries fill from October",
      and the first is already answered properly in the FAQ, where it also keeps the
      two separate fortnights straight. Nothing factual was lost.
      To his aside: it *was* dynamic by then — the date was computed in the browser
      so it could not go stale. It still did not earn its section, and the computed
      date went with it.
- [x] **FAQ moved from sunken to white** so the tail still alternates with the
      urgency section removed and the proof band now dark. Final sequence:
      sunken, white, sunken, white, dark, white, sunken, dark, white, sunken.

### Consequence of the removal, stated plainly

- [ ] **The checklist's "urgency uses specific numbers and dates" item drops back to
      partly met.** The 14-day fact survives in the FAQ; the seasonal-diary line and
      the computed date are gone. **Do not close it by inventing a deadline on the
      £48 offer** — Abbey have agreed none (Outstanding C3/D3). If they ever agree
      one, that is the honest way to close it, and it belongs in the offer band
      rather than in a section of its own.
- [ ] **The 7 Facebook recommendations are now unused on this page.** They remain on
      `/reviews/` and in `site.ts`. No change needed unless Abbey want them back.

### Verified after this round

- [x] Build + audit clean at 17 pages. Zero em/en dashes and zero exclamation marks
      in visible copy. No console errors.
- [x] Zero horizontal overflow at 390, 700, 900, 1024, 1280 and 1440. One H1.
      Primary CTA bottom **626px** at 390px against the 844 fold (up from 565: the
      rewritten hero lead is a sentence longer, and there is still 218px spare).
- [x] Six cards with six distinct icons at every breakpoint; grid 3/2/1 with no
      ragged row; proof band 2 columns above 860px, 1 below.
- [x] `/homecare-plans/`, `/` and `/contact/` re-checked: header and footer intact,
      picker buttons still read "Start Service Care+", the picker's alt route still
      goes to `/plumbing-heating/`, the reviews link still has no `target`, overflow
      0, one H1 each.

## LP Quality Checklist closure round (3 August 2026) — done, for review

Working the checklist closure plan against `/lp/homecare/`. `npm run verify` clean,
no console errors on the LP or on a site page. Six build items closed, three
partly, and three that only close once the ad creative exists.

### Closed in the build

- [x] **A1. CTA text consistent across placements.** The plan cards said "Start My
      Service Care" while the picker's result buttons said "Start Service Care" —
      the same action in two voices on one page. New `PlanPicker ctaFirstPerson`
      prop, **off by default**, so `/homecare-plans/` is untouched: that page's
      cards say "Choose This Plan", and changing its buttons would have swapped one
      inconsistency for another with no decision behind it. Verified: the LP picker
      now returns "Start My Service Care+" against a card reading "Start My Service
      Care+"; the site page still reads "Start Service Care+" with "Choose This
      Plan" cards.
- [x] **A2. Five-second clarity, without weakening the H1.** One correction to the
      plan's premise: the LP had **no eyebrow**. "ABBEY HOME CARE" was the *division
      marker*, the typographic block every interior page carries because the header
      lockup always reads ABBEY GROUP. Adding an eyebrow beneath it would have
      stacked two lines of ~12px caps in one slot, which is clutter and a repeat
      within a screen region (standing rule 14).
      So the marker is **off** on this page (`badge={false}`) and the eyebrow carries
      **"Boiler cover in Whitby · from £9.99 a month"** instead. Category, location
      and price land before the visitor reaches the H1, and the H1 is left free to
      agitate. Measured at 390px: **one line, 310px wide, right edge at 350**, so it
      fits with room. The sub-brand is not lost (the bar reads ABBEY GROUP, and the
      contrast table names Abbey Home Care). This is the one deliberate structural
      departure from the site's division-marker convention, scoped to LPs.
- [x] **A3. Guarantee now states duration, conditions AND process** — in both places
      it appears in full, the offer band and the form.
      **Not with the plan's wording.** It suggested "a phone call or an email";
      Abbey's own approved plan FAQ says cancellation is "by emailing or writing to
      us", and the plan terms do not offer a phone route, so promising one would be
      a claim the contract does not support. It reads **"Cancelling is one email to
      the office, with no minimum term to see out."** "No retention script" also
      went: it is a claim about internal behaviour that cannot be verified.
- [x] **A4. Urgency carries a real date, computed in the browser.** Renders as
      "Join today and that date is **17 August 2026**", with `<time datetime>` set
      too. **Computed at view time, never at build**: this is a static site, so a
      date baked in at build would be wrong the day after the deploy, on the one
      section whose whole job is to be specific. The no-JavaScript fallback is "a
      fortnight from today", which is still true, just less precise. It says "join
      today", not "enquire today", because joining happens on the call back and the
      page does not claim otherwise. Verified: 17 August 2026 / `2026-08-17`.
- [x] **A5. The one competing link no longer leads away.** Route 1 (screenshots) is
      blocked with no assets, so route 2: new `Reviews readAllExternal` prop, off by
      default, giving the Google link `target="_blank" rel="noopener noreferrer"`.
      Verified. `/reviews/` links on site pages stay in-tab, which is right there.
- [x] **A6, two of three.** Font preloads and the hero srcset. Detail below.

### A6 in detail, with the honest numbers

- [x] **Font preloads added, site-wide.** There were **none**, so the browser could
      not discover a font until it had downloaded and parsed the CSS referencing it:
      two round trips in front of the largest text on the page. Now DM Serif 400 and
      Inter 400 are preloaded from `BaseLayout`.
      **The `?url` import is what makes this safe** — it returns the hashed URL Vite
      actually emits, so the hint cannot rot on the next content hash. Verified both
      resolve to files that exist in `dist/_astro/`, on the LP and on site pages, and
      **no "preloaded but not used" console warning** on either.
      Only those two: Inter 500/600/700 are also above the fold, but in small UI text
      where a swap is barely visible, and preloading five fonts competes with the LCP
      image for bandwidth.
- [x] **Hero srcset, and a correction worth recording.** Generated
      `boiler-service-portrait-700.webp` (700x875, 30KB against the 900w file's
      39KB) and added optional `srcset`/`sizes` passthrough to `Photo` and
      `PageHero`, off everywhere else.
      **My first `sizes` was wrong in a way that looked right.** I estimated 92vw;
      the slot is actually a consistent **~80vw** up to 700px (measured 303px at a
      360 viewport, 308 at 390, 342 at 430, 558 at 700), then capped at 360px, then
      440px. At 92vw a 390px viewport asked for 718w, just over the 700w candidate,
      so **every DPR-2 phone still downloaded the 900w file and the srcset did
      nothing.** Corrected to 80vw and verified the 700w file is now chosen at 360,
      390 and 430, with 900w still served to desktop.
- [ ] **Third row was already done.** `about-team-group.webp` (141KB, below the
      fold) has carried `loading="lazy"` since it was placed — `Photo` defaults to
      it unless `eager` is passed. Confirmed in the built HTML.
- [ ] **"Under 3 seconds" cannot be ticked here, and the dev numbers are
      meaningless** (the large JS is Astro's dev toolbar and does not ship). Needs a
      staging deploy and PageSpeed Insights on mobile.
      **One expectation to set:** the hero image will not be flagged by Lighthouse
      either way. Its mobile emulation runs DPR 2.625, where a 350px slot needs
      919w against a 900w file — very slightly *under*-sized. At a 390px viewport the
      file is 2.57x oversized at DPR 1 and 1.29x at DPR 2, both already inside the
      build standard's "<=2x display slot" rule. The srcset is a real saving for real
      devices, not a score fix.

### Partly closed, the rest needs Abbey

- [~] **B1. Testimonials with name, photo and company.** The structurally awkward
      one, and it stays open. All three routes are blocked on assets or client
      action, and **none of them can be faked**:
      screenshots need the actual Google review images; photographed testimonials
      need the shoot; and **"Angela, Sleights" cannot be written today** because no
      reviewer location exists in any project file, so adding one would be a
      fabricated detail on the page whose job is proof (golden rule 1). Locations
      also need the reviewer's consent, not just Amy's recall.
      The plan's read on "company" is right: the checklist is written for B2B, and a
      domestic homeowner has none. Logged as B2C-inapplicable with location as the
      intended substitute once confirmed.
- [x] **B2. Generic testimonials cut** — done in the original build. Karen Hartas's
      "Very efficient and reliable service. Would certainly use again." was dropped
      as making no argument, and Angela's "came within hours when I had no heating"
      was promoted to a pull quote beside the priority-response claim.
      The solicitation prompt ("What was the problem, and how quickly did we get to
      you?") is a process change for Abbey, now logged in Outstanding.
- [ ] **B3. Tracking** unchanged and unavoidable. Still blockers.

### Only closable once the ad creative exists

- [ ] **C1 to C3, message match.** The acceptance test is now written into the top of
      the page file so it cannot be forgotten at launch: the hero must be the winning
      ad's image or an obvious sibling, the H1 must echo the ad's hook, and the price
      must be above the fold. The current hero was chosen for `/homecare-plans/` and a
      search-intent audience, and **will very likely need replacing**.

### Documented as reasoned exceptions

- [x] **D2.** The H1 stays problem-agitation, because the traffic is Problem Aware.
      A2's eyebrow closes the practical five-second concern. Reasoning is in the page.
- [x] **D3, and this one is a real guardrail, not a note.** A warning block is now at
      the top of the page file: **do not point Google Search ads at this page.** The
      H1 carries no keyword, so against a search ad group it fails message match
      outright and would drag Quality Score and raise CPC. Search needs its own
      variant with a keyword-led H1; `_Specs/07` already lists the candidate ad
      groups. The eyebrow puts "Boiler cover in Whitby" in the hero, but an eyebrow
      is not a headline and does not close that gap.

### Re-verified after all of it

- [x] Build + audit clean at 17 pages. Zero em/en dashes and zero exclamation marks
      in visible copy on both new pages. No console errors on the LP or a site page.
- [x] At a true 390px: overflow 0, 1 H1, primary CTA bottom **565px** against the
      844 fold (up from 546 — the eyebrow costs ~19px and there is plenty spare).
      Section alternation unchanged, and unchanged on `/homecare-plans/` too.

### New for the client, from this round

- [ ] **Photographed customer testimonials.** Abbey are inside customers' homes every
      year for the annual service. An engineer with a phone can capture a photo and
      two lines with consent at the visit. Three would properly close B1, and making
      it part of the service routine compounds every year.
- [ ] **Reviewer locations, with consent** ("Angela, Sleights"). For a Whitby
      audience that carries the credibility a company name carries in B2B.
- [ ] **Change the review request wording** to "What was the problem, and how quickly
      did we get to you?" That one question reliably produces specific reviews
      instead of "would use again".
- [ ] **Google review screenshots**, if Amy can grab them — unpolished proof shows
      the reviewer's own Google avatar and name, which is more convincing than a
      styled card and self-evidently unfaked.
- [ ] **Font weight audit (site-wide, needs a design decision, not just a build
      one).** Five Inter weights ship. 500, 600 and 700 are all genuinely used across
      the components, so dropping to three means restyling, not deleting. Worth a
      pass, but not something to slip into an LP change.
- [ ] **PageSpeed Insights on mobile, twice, once staging is up.** The only way the
      3-second item closes.

## Homecare paid-traffic landing page (3 August 2026) — built, for review

`/lp/homecare/` and `/thank-you/`, built to `Landing pages/abbey-homecare-lp-spec.md`.
`npm run verify` clean at 17 pages. **It is not a trimmed `/homecare-plans/`**: that
page serves Most Aware traffic and correctly opens with the category and the price;
Meta traffic is Problem Aware at best, so the top third agitates the problem first
and the seven-tier comparison table is gone entirely.

### The two new pages

- [x] **`/lp/homecare/`** — eleven sections: hero, cost of inaction (new, does not
      exist on the site page), what the annual visit gets you, the plan picker, the
      three plans, the £48 offer (dark band), trust, reviews, a score strip, the
      objection FAQ, urgency, and the form. Backgrounds alternate the whole way
      down. **No page-level schema at all** — only the site-wide Organization +
      WebSite from BaseLayout. Deliberate: page-level `Service`/`FAQPage` here would
      compete with the page built to rank.
- [x] **`/thank-you/`** — it did not exist, and the sitemap filter and a robots.txt
      comment had anticipated it since the foundation build. Chromeless, noindex,
      what-happens-next in three steps, the direct number, and the plan terms.
      **It is the conversion URL**: an ad platform counts a Lead on a page view, and
      firing one on a button click counts intent rather than a completed enquiry.

### Cannibalisation control, proved rather than assumed

- [x] `noindex,follow` on both pages (the `noindex` prop existed on BaseLayout and
      had never been used by any page).
- [x] Sitemap filter extended to `/lp/`. **Proved**: removing that one clause puts
      `/lp/homecare/` straight into `sitemap-0.xml`; restored, the sitemap holds the
      same 15 indexable URLs as before.
- [x] `robots.txt` deliberately **not** changed. A `Disallow` would stop a crawler
      fetching the page, and it has to fetch it to see the noindex.
- [x] Neither page reaches `/llms.txt` or `/llms-full.txt`, and nor do the four new
      FAQ answers: the new set is deliberately kept out of `allFaqs`. Verified zero
      occurrences in all three generated files.
- [x] **Adjacent-background rule proved on this page**: setting the urgency band to
      sunken made `npm run verify` exit non-zero and name both offending pairs
      (#10/#11 and #11/#12). Reverted, exits 0.

### Three additive component changes, every existing page untouched

- [x] **`BaseLayout chromeless`** — swaps Header/Footer/PlanPrompt for
      `LpBar.astro` (lockup + tappable number, nothing else) and `LpFooter.astro`
      (legal links, address, Companies Act line). Everything in `<head>` is kept,
      because canonical, noindex and any future tracking all belong there.
      One CSS consequence, fixed at cause in `global.css` rather than in the page:
      the site header is *fixed*, which is why every hero carries 150px of top
      padding and `:target` clears 104px. The LP bar is static and in the flow, so
      `body[data-chromeless]` drops both. **Standing rule 20 still holds**: the LP
      hero measures exactly 820px at 1280 / 1440 / 1600.
- [x] **`EnquiryForm redirect`** (default off) — sends a completed enquiry to
      `/thank-you/`. Same "always resolves" rule as the inline path.
- [x] **`EnquiryForm planPickerTags`** (default off) — merges the quiz into the
      lead. It reads the picker's state **from the DOM at submit and stores
      nothing**, which is the same PECR-safe pattern the attribution code uses and
      for the same reason. It does not reimplement the eligibility logic either: it
      reads the answers off the checked radios and the recommendation off whichever
      result card the CSS has actually revealed, so the two can never drift.
      **Proved end to end** with a test webhook. Own home + boiler 10 years or older
      + "it is fine" returns **Service Care only** (the gate overriding the wish),
      and the payload carried:
      `tags: homecare,boiler-cover,lp,meta,property: My own home,boiler age: 10 years or older,boiler condition: Fine…`,
      `recommendedPlan: Service Care`, plus name, phone, email, postcode, house,
      source, page, timestamp, `gclid: TEST_CLICK_456`, `utm_source`,
      `utm_campaign`. Then landed on `/thank-you/`.
      **`recommendedPlan` is a NEW payload field and needs mapping in GHL** (add it
      to the list in Outstanding B1).
      Control case also proved: an untouched picker adds no tags and no
      `recommendedPlan` at all.
      **localStorage 0, sessionStorage 0, cookies empty** before and after, so the
      30 July PECR fix survives intact and `consent-registry.ts` stays correctly
      empty. `/cookies/` still generates a zero-row table.
- [x] **`PlanPicker altHref` / `altLabel`** (defaults unchanged) — the old-boiler
      replacement route was the only link off the landing page, and it dropped a
      paid click into the full site where it cannot be counted. The LP points it at
      its own form ("Ask us about a new boiler"); `/homecare-plans/` still reads
      "See Plumbing & Heating" to `/plumbing-heating/`, verified.

### Copy decisions

- [x] **"One free call-out" stays.** The spec made "1 hour free call-out" launch
      blocker 5. Josh has now ruled on it three times, 3 August 2026 being the
      clearest: in Abbey's business the two phrasings describe the same
      entitlement and the shorter one reads better. Recorded so it stops coming
      back. Angela's verified review, now a pull quote in section 3, happens to use
      the customer's own version of it ("one callout per year").
- [x] **The hero sub-headline does not say "twenty minutes down the road."** The
      spec's wording implies a response time, and
      `_Specs/07 AD LANDING PAGE ALIGNMENT.md` explicitly says not to promise one
      while it is unconfirmed. Replaced with the confirmed address, which is
      concrete and says "local" plainly rather than over-explaining it.
- [x] **"Find My Plan in 3 Questions"**, not the spec's "Find My Plan — 3
      Questions": no em dashes in visible copy.
- [x] **Every figure in the new cost-of-inaction section is sourced.** £120 to £230
      for an emergency call-out and "most home insurance will not cover a
      breakdown" are both already client-approved copy in `faqs.ts`; £119.88 is
      twelve months of a confirmed £9.99. The spec's "a new boiler runs to several
      thousand pounds" is **not** stated, because no such figure is confirmed.
- [x] **The ten-year eligibility rule is now visible copy**, on the Service Care+
      card. It has been the gate the picker runs on since 31 July but appeared in no
      copy anywhere, so the site could route someone away from parts cover without
      ever explaining why.
- [x] **Four new objection FAQs**, all drawn from Abbey's own terms, in
      `src/data/faqs.ts` as `homecareLpObjections`. LP only for now (Josh).
- [x] **Reviews curated, not just reused.** Angela's moved out of the grid and next
      to the priority-response claim it actually evidences, which also fixed the
      duplicate-Angela problem the spec flagged ("Angela" and "Angela Weldon" sat in
      the same block and read as one person twice). Karen Hartas's is cut: verified
      and true, but it makes no argument. Four remain, an even single row.
- [x] **The £48 CTA points at the form, not at ServiceM8.** An off-site booking page
      is an exit from a one-goal page and cannot be counted as a conversion, which on
      paid traffic makes it invisible. The date is confirmed on the call back.
      **Worth Josh's view**: a completed booking is a stronger action than a lead.

### Deliberately not built, and why

- [ ] **No tracking of any kind.** GA4, Meta Pixel + CAPI and the Ads tag all fire
      from these two pages, but no measurement IDs exist (Outstanding B2) and a
      pixel cannot ship without the consent banner, Consent Mode v2 and its entry in
      `consent-registry.ts` **in the same change** — that registry generates the
      cookie policy table, so a pixel added without it publishes a policy that is
      untrue. Still launch blockers 3 and 4, and Meta domain verification plus
      Aggregated Event Measurement have a lead time that has not started.
- [ ] **No OFTEC badge and no OFTEC claim.** The spec asks for both. OFTEC
      registration is unconfirmed (Outstanding C3 — it comes from a sticker visible
      on a van in the About photograph), and no badge art exists. Golden rule 1 and
      standing rule 21.
- [ ] **No Gas Safe badge image**, because the file is not in the repo. The number
      (303376) is confirmed and checkable, so section 7 states it as text.
- [ ] **No "Abbey Home Care" logo in the top bar.** The spec asks for it; that art
      does not exist. The four sub-brand lockups were built from site type and were
      removed from the whole site on 30 July, so the bar reads ABBEY GROUP with the
      homecare crescent, exactly as every other page does.
- [ ] **No deadline on the £48 offer.** The spec asks for one; Abbey have agreed
      none, and an invented expiry would wreck the tone the page runs on. Urgency is
      carried by the two facts that are genuinely true instead: the 14-day claims
      wait and the October-onwards diary.
- [ ] **£48 scoped to Service Care only**, per the spec, until Amy confirms whether
      it extends further (Outstanding C3).
- [ ] **Message match is not yet scorable.** The LP Quality Checklist requires the
      hero visual and headline to mirror the winning ad creative, and no ad creative
      exists. `boiler-service-portrait.webp` is the only boiler photograph in the
      set and stands in; swap it, and the H1 if needed, once the ad is built.

### Verified

- [x] Build + audit clean, 17 pages. LP: 1 H1, title 52, description 150, canonical
      slashed and absolute, valid JSON-LD, alt on every image, backgrounds
      alternating. Thank you: 1 H1, title 31, description 153.
- [x] At a true 390px (iframe method): **horizontal overflow 0** on both pages;
      LP primary CTA bottom at 546px and the thank-you call button at 578px, both
      above the 844 fold; every phone number single-line and unwrapped. The only
      grid still multi-column on a phone is the without/with contrast block, kept
      paired on purpose — collapsing it to one column loses the comparison that is
      the whole point of the section. Cells run 3 to 4 lines in a 175px column.
- [x] No console errors or warnings.
- [x] Regression-checked `/`, `/homecare-plans/`, `/contact/`, `/electrical/` and
      `/cookies/`: site header and footer intact, no LP chrome anywhere, plan prompt
      still mounted on all of them except `/homecare-plans/`, both new form props
      absent, the picker's alt route unchanged, and the cookie table still empty.

### Found while measuring, NOT fixed (pre-existing, approved pages)

- [ ] **Standing rule 20 drifts at 1280px wide.** Every hero is 820px at 1440 and
      1600, as recorded. At **1280** `/homecare-plans/` measures **829** and
      `/renovations/` **846**: the copy column narrows, the content grows past the
      820 min-height and pushes the hero taller. The LP is 820 at all three widths.
      It is 9px and 26px on two client-approved pages, so it is logged rather than
      changed. Fix would be in `PageHero`, not per page.

### Landing page — needs Josh / the client

- [ ] **`PUBLIC_GHL_WEBHOOK` (launch blocker 1).** Unset, so a submission
      validates, redirects to `/thank-you/` and looks entirely successful while the
      lead is discarded. Paying for traffic into this is the worst possible failure
      mode precisely because nothing about it looks broken. **No spend until a live
      lead has been through end to end.**
- [ ] Map **`recommendedPlan`** in the GHL workflow alongside the existing fields.
- [ ] Tracking, consent and Meta domain verification (blockers 3 and 4).
- [ ] Abbey's real average repair and call-out figures, to replace the general
      £120 to £230 range in the cost-of-inaction section with their own numbers.
- [ ] **Is there an excess per claim?** Nothing in the brochure or the specs says
      either way, and it is not safe to assume there is none. If there is one and
      the page does not state it, that is a complaint.
- [ ] **How many homes are currently on cover?** "Looking after X homes across
      Whitby and the coast" would be the single strongest proof point on the page.
      No such figure exists in the project files and none has been estimated.
- [ ] Public liability insurance — worth stating if held. Not claimed.
- [ ] Gas Safe and OFTEC badge image files; the remaining four engineer headshots.
- [ ] Whether the £48 CTA should book through ServiceM8 instead of the form.
- [ ] **Resolved while checking**, so the spec's §1.6 query can be closed:
      `about-james-eddon.webp` is **James Eddon**, the MD and founder, and its alt
      text has said so since the About build. James Fawcett is a different person in
      the team list, with no photograph yet. No mix-up.

## Conversion round (Josh, 31 July 2026) — done, for review

### The plan picker — "Is Homecare right for you?" (v2)

`src/components/PlanPicker.astro`, on `/homecare-plans/#which-plan`.

**v1 was rejected by Josh and rebuilt.** His objection was right: it assumed you
already knew what Homecare was, and "if it broke tomorrow, what would you want"
is not a real question, because everyone wants everything covered. It made the
visitor do the segmenting, and it never mentioned the half-price service so the
plan read as though it were free.

**What fixed it came out of the client's own terms.** Reading
`Abbey Care Brochure JAN2026 (2).pdf` turned up an eligibility rule nobody had
recorded: T&C 2.1(a)(vi) and 2.5(e) say **a boiler ten years or older cannot have
Service Care+ and is offered Service Care only.** So boiler age is not a
preference, it is a gate — a fact the visitor already knows about their own
house, that genuinely decides the answer, and that stops the site recommending a
plan Abbey would have to refuse.

- Three questions: who it is for, how old the boiler is, and **how the boiler is
  at the moment** (its condition, not a wish list). Nobody is asked to pick a
  level of cover.
- Flow to Josh's spec: **one question at a time**, each revealed only when the
  previous is answered, and **no result until all three are answered and the
  button is pressed**.
- Still **zero JavaScript** — progressive reveal, the submit gate and the result
  are all `:has()`. Nothing stored on the device. `@supports` hides the tool
  entirely where `:has()` is unavailable.
- Verified across **all 27 answer combinations: exactly one result every time.**
  The gate correctly overrides the wish — "boiler is 10+ years old" plus "I would
  want the heating and plumbing looked after too" returns Service Care and says
  plainly why parts cover is not available on that boiler.
- **The saving is now explicit**: "You save £48 on day one" on Service Care and
  "£81" on Landlord Care.

- **Old boilers now get a replacement route as well** (Josh's suggestion). When
  the boiler is 10+ or unknown, the Service Care result also signposts a new
  boiler, because someone just told parts cover is unavailable is exactly the
  person who should hear replacing it is an option, and an install is worth far
  more to Abbey than a £9.99 plan. Checked both of Abbey's existing sites first:
  **neither links plan membership to an installation discount**, so none is
  claimed. The efficiency wording is Abbey's own, from abbeygas.com. Verified it
  appears for over/unsure only, and never for a new boiler, a landlord or a
  business. Two follow-ups logged in Outstanding C3: whether the 5/10/20% "future
  work" discount covers an installation, and whether James would rather lead old
  boilers with a replacement quote outright.

**One open item:** the half-price offer is shown on Service Care and Landlord
Care only, because those are the two Amy confirmed. Josh believes it applies to
all plans, but it appears **nowhere in the January 2026 brochure**, including the
terms. Logged in Outstanding C3. If Amy confirms, it is one line per result.

**Also found while checking the brochure** (all logged in `02 PLAN DATA`): every
price and inclusion matches what we had; "Home Electrics" is listed in the
brochure's "what we can look after" but has no row in the plan matrix, so it is
claimed nowhere; and the brochure footer still reads "2024".

### The plan prompt — Josh's idea, offer the plan at the moment of booking

`src/components/PlanPrompt.astro`, mounted **site-wide** from `BaseLayout`.

- Click "Book an annual boiler service" and a native `<dialog>` offers the
  £96 → £48 Service Care deal; the landlord gas safety check offers £162 → £81
  with Landlord Care. Those offers previously only existed on the Homecare page,
  which someone booking from elsewhere would never see. This is the mechanic that
  turns a one-off job into a subscription.
- **Now site-wide, not per page** (Josh, 31 July 2026). It was on `/book-online/`
  and `/plumbing-heating/`, and Josh rightly pointed out `/book-online/` is a page
  almost nobody finds. The offer follows the booking LINK, not the page, so the
  prompt is mounted in `BaseLayout` and is inert anywhere those two ServiceM8
  links do not appear. Excluded from `/homecare-plans/` only, derived from the
  URL so it cannot be forgotten. Verified mounted on all 10 content pages and
  absent from Homecare.
- **A real gap it exposed:** `booking.boilerService` existed in only TWO places on
  the entire site — the Homecare offer band and `/book-online/`. Plumbing &
  Heating LISTS "Boiler service" as something Abbey do but had no way to book one.
  Added **"Book a Boiler Service"** beside "Request a Quote" in that page's
  What-we-do section, which is both a genuine fix and the click that now triggers
  the offer.
- **X BUG FIXED** (Josh spotted it). Closing with the X used to open the booking
  tab anyway. Now only the explicit "No thanks, just book my ..." link continues
  to the booking; the X, Escape and the backdrop simply close. Verified: X leaves
  zero navigations, backdrop the same, and "No thanks" still goes through to the
  right ServiceM8 link.
- Triggered only by a user click, never on load, so it sits outside Google's
  intrusive-interstitial rules. Confirmed nothing opens on page load anywhere.
- **Stores nothing.** One prompt per job per page view, held in a plain variable,
  not sessionStorage.
- Both offers are in the HTML with CSS choosing one, so no copy is injected by
  script and the numbers cannot drift.
- To remove: delete the `<PlanPrompt />` line from `BaseLayout.astro`.

## AEO / GEO pass (Josh idea 4, 30 July 2026) — done

Making Abbey the business an AI assistant recommends for "who does X in Whitby".
The channel is real: AI Overviews now appear on roughly half of Google searches
and cut organic click-through when they do, ChatGPT is the largest AI-search
surface, and ~45% of consumers now use AI tools to find local services (up from
~6% a year ago) — while assistants recommend only a small fraction of local
businesses, because almost none are structured to be quoted.

- [x] **`/robots.txt` now exists and explicitly welcomes AI crawlers.** It was
      missing entirely (the build standard §4 requires it). Generated route, so
      the sitemap URL cannot drift. Names GPTBot, OAI-SearchBot, ChatGPT-User,
      ClaudeBot, PerplexityBot, Google-Extended, Applebot, CCBot and the rest as
      `Allow`. Nothing is disallowed.
- [x] **`/llms.txt` and `/llms-full.txt` now exist and are real.** Also missing
      (an earlier note claimed llms.txt was done; it was not). Both are generated
      from `site.ts`, `faqs.ts` and `legal.ts`, so **every word is already on the
      site and they cannot drift.** `llms.txt` is the index (identity, checkable
      facts, areas, published prices, page map, the question list); `llms-full.txt`
      adds every Q&A verbatim, grouped by page. Two rules enforced: no marketing
      voice (assistants quote facts, not adverts), and nothing outstanding appears
      (no VAT number, no Saturday hours).
- [x] **FAQ answers rewritten to be citable, and the sets centralised.** All eight
      FAQ arrays moved to `src/data/faqs.ts`, the single source the page, its
      FAQPage JSON-LD, and llms.txt all read — so an answer can never differ
      between them. **Proved content-neutral:** 7 of 8 built pages are byte-identical
      before/after, the 8th differs only in Astro's inline-vs-external CSS
      threshold. Writing rule recorded in the file: the first sentence of every
      answer must stand alone, because assistants lift one or two sentences.
- [x] **Entity depth added to the schema.** `Organization` and `LocalBusiness`
      now carry `knowsAbout` (22 expertise topics — this is how an assistant
      judges topical authority, and it matters most for electrical, which has no
      schema.org subtype), `hasOfferCatalog` (the five service lines with their
      published entry prices), `alternateName` (Abbeygas / Abbey Gas),
      `foundingDate`, `founder`, the company-number `identifier`, and `hasMap`.
      Org + WebSite builders moved out of BaseLayout into `schema.ts` so entity
      data has one home.
- [x] **`GeoCoordinates` is wired but omitted until real.** `nap.geo` is null;
      the block appears automatically once the GBP pin lat/lng is set. Guessing
      it would put Abbey on the wrong pin in an AI answer, which is worse than
      none. Outstanding A/B4 updated.
- [x] **Audit extended and proved.** `tools/audit.mjs` now fails the build if
      robots.txt / llms.txt / llms-full.txt go missing, if robots disallows the
      site or drops its sitemap line, or if either llms file contains an em dash
      or an unresolved `undefined`/`${}`. Proved by deleting `dist/llms.txt` and
      watching the audit error and exit non-zero, then restoring.

### Needs the client (new, from this pass)

- [ ] **GBP map-pin latitude and longitude** (Outstanding B4), one edit to
      `nap.geo`. And the GBP address is still 59 Mayfield Road — that actively
      undermines the entity work and should be fixed to 20 Skinner Street.
- [ ] After launch: submit to **Bing Webmaster Tools** as well as GSC (Bing feeds
      Copilot), and register on Google Business Profile if not already. These are
      launch-day, not build, tasks.

## Build-review round 9 (Josh, 30 July 2026) — done

Site-wide identity changes, four Electrical alignment fixes, and the Renovations
premium rebuild. `npm run verify` clean; all fifteen pages re-measured.

### Site-wide

- [x] **The header lockup now reads ABBEY GROUP on every page.** Only the
      crescent takes the division colour, and the scrolled bar keeps the page's
      own dark ground and accent hairline. `Lockup.astro` gained a `descriptor`
      prop; header and footer both pass `"Group"`. Side effect worth having: the
      four *fabricated* sub-brand lockups (built from site type because the
      client's art is a screenshot) are now off the site entirely, so standing
      rule 21 is stronger, not weaker.
- [x] **The footer crescent follows the division too.** The footer ground and
      accent rule already did; the tri-colour Group mark was the last element on
      a division page ignoring the page's colour.
- [x] **The hero division marker replaces the hero badge, and it is loud.** It was
      a small stacked sub-brand lockup inside a bordered chip — quiet, and a
      second brand mark in the same screen region as the header one (rule 14).
      Now typographic: a full-strength accent bar, "Abbey" in muted caps, and the
      division name at 17px, tracked, in the division's accent. No brand art, so
      **Renovations gets one for the first time** ("Renovations", with no "Abbey"
      prefix, because that sub-brand does not exist).
- [x] **New per-division token `accentOnDark`** (`--page-accent-on-dark`). The
      bright 500s are 2.41-4.11:1 on their own dark grounds and fail AA as text;
      the 400 steps measure 5.42 / 6.47 / 5.46 / 5.13 / 5.83 / 8.74:1 and still
      read as the division colour rather than an off-white. Used by the marker
      and the Renovations pull quote.
- [x] **The menu marks the current page**, with three signals rather than one: an
      accent-tinted ground, a full-strength accent bar down the left edge and a
      dot on the right. The old single 300-shade colour change read as a hover
      state on some pages.
- [x] **Contact is permanently styled as the CTA in the menu**, in orange (the one
      action colour, rule 3), so it never competes with the accent marker even on
      `/contact/` where both apply.
- [x] **Nav order changed: Renovations moves to the foot of the services**, after
      Building & Joinery. `footerNav.services` follows the same order so the two
      lists cannot disagree. Reasoning is in `site.ts`.

### Homepage

- [x] **Van pulled in and dropped to the floor.** `bottom: 0` puts the tyre
      contact patches on the hero's bottom edge (measured: 0.9px, and the asset's
      last opaque row is y=473 of 475, so there is nothing to fake).
- [x] **BUG FOUND while moving it, and it pre-dated today.** `right: -450px` drove
      the van into the hero lead at every viewport between about 1024px and
      1400px — roughly 100px into the paragraph at 1280px. The pixels it sits
      behind are the bright crescent on the van's own rear panel, sampled at
      **1.18-2.72:1 against white text**, so words of the lead were genuinely
      unreadable at those widths. Now the horizontal position is
      `max(<clear of the copy column>, <the -340px rule>)`, so it can never reach
      the copy at any width. Clearance measured at 12px at 1100 / 1280 / 1440.
      The hero lead's measure came in 520px → 470px to buy the room; 470px at
      18px is a ~56-character line, a better measure than 62 was.
- [x] **The Electrical card has a designed panel instead of a hatched
      placeholder.** New `DivisionSlot.astro`: the division's dark ground, its
      crescent as a watermark, and a real credential ("NAPIT registered / Part P
      self-certified, City & Guilds qualified"). Stock would undercut a card
      arguing "certified"; an empty placeholder reads as a hole. Give that card an
      `img` and it renders a `Photo` like the other five, no other change.
- [x] **BUG: `.dv__photo` was dead CSS.** The hairline between each division
      card's photo and its body had never rendered — computed
      `border-bottom-width` was `0px`. It is passed INTO `Photo`, so it carries
      *that component's* scope id, not the page's: rule 19's gotcha, live on the
      homepage. Fixed with `:global()` from a scoped ancestor.
- [x] The map slot caption lost its em dash, the only one in visible copy
      anywhere on the site.

### Electrical — four alignment fixes, all anchored on structure

Josh gave eyeball offsets; each is implemented as an alignment to something real,
and the measured result is within ~10px of his number in three of four cases.

- [x] **"What we do":** the credentials card is now the whole of column 2, so its
      top edge sits level with the first line of text in the section instead of
      with the service list 153px below it.
- [x] **"Landlords":** eyebrow and heading are their own row, so the Q&A cards
      start on the lead paragraph's line. **Down 139px** (Josh said ~130).
- [x] **"EV chargers":** was the one section on the page with its columns
      *reversed* (0.95fr / 1.05fr against everything else's 1.05fr / 0.95fr), and
      vertically centred. Now matches its neighbours: **right 55px, down 91px**
      (Josh said ~50 and ~100).
- [x] **"Business and commercial":** the CTA note ran 166px past the start of the
      right-hand column. It is now a grid item in column 1, so there is a real
      column edge it cannot cross. Phone number wrapped in `nowrap` (rule 13).

### Other pages

- [x] **Homecare final CTA:** the two cross-links are one line each. As a single
      paragraph they ran together and read as one sentence with two questions.
- [x] **About "The specifics, not "fully qualified"" is on one line.** It needed
      657px and its column gave it 643, so it broke for the sake of 14px. Column
      widened 1.05fr → 1.15fr (703px).

## Renovations premium rebuild (30 July 2026) — for review

Josh: *"if someone is potentially going to use Abbey Group for a £400k renovation
project, they should feel special as soon as they arrive here"*, the "What we do"
grid *"looks crap, lazy, uninspiring"*, and the page *"feels too close to the
Building and Joinery page"*.

Direction taken from research rather than taste: the consistent findings on what
reads as expensive are **restraint, whitespace, one strong visual per section,
few type sizes, and story-driven case studies** — and for high-ticket trades
specifically, that **proof of craft and process outperforms copy**. So the
rebuild *removes* as much as it adds.

- [x] **The photography was the biggest lever, and it was already in the folder.**
      Thirteen photographs of a second, clearly high-end whole-house job were
      sitting unused in `Images/Unconfirmed Project (ask Amy which one)/`. Five
      are now on the page. The hero is the **black handleless kitchen with a
      book-matched quartz island** (which also proves the Sparkle Granite worktop
      claim); the second case study carries the **pink onyx marble bathroom**, the
      **brass basin detail** and a **stone-and-oak dining room with a log burner**
      — the warm register this division was designed around and which the
      cool-toned Riviera set could never supply. Record in the page's
      `image-manifest.md`. Budgets: hero 102kb, rest 35-99kb.
- [x] **"What we do" is now an editorial index, not a 3x2 grid.** A tall portrait
      photograph holds column 1; each service is a full-width row with a 40px
      display numeral in stone and the service name at up to 31px in DM Serif.
- [x] **"Our work" is two case studies, not a feature shot plus four thumbs.**
      Each is a large 3:2 lead plate, the project name, its scope as
      hairline-ruled items, and two supporting photographs. A £300k buyer wants to
      see a whole job, not a contact sheet.
- [x] **A verified review is now a display pull quote** inside "How we work" —
      Colin Robertson's, because his review is about James running a multi-trade
      job and that is the section it speaks to. He moved OUT of the grid, so he is
      not shown twice, and the grid dropped 6 → 4 (an even single row).
- [x] **Concrete separation from Building & Joinery**, so it is structural rather
      than a colour swap: no ticked list (numbered rows on hairlines instead), no
      chip icons, no card shadows, square photo plates instead of rounded,
      136px bands via a new `Section pad="loose"`, a masthead-style credential
      line in the hero instead of four green ticks (new `PageHero trustStyle`),
      and a square hero plate (new `PageHero mediaRadius`). Joinery keeps all the
      trade-page furniture.
- [x] **Nothing was invented.** No cost guide and no premium-handover section
      (both correctly excluded by copy conventions §7). Every scope item is
      visible in that project's photographs. The second project is captioned
      "Recent project, North Yorkshire" with **no name**, the same treatment
      Building & Joinery already uses.
- [x] Verified: build + audit clean, 1 H1, canonical slashed, valid JSON-LD, alt
      on every image, backgrounds alternating. **Every hero on the site still
      measures exactly 820px** (rule 20 survived the hero changes). At a true
      390px: overflow 0 on all ten content pages, CTA above the 844 fold on all
      ten, Renovations at 739px.

### Renovations — needs Josh / the client (new)

- [ ] **Which named project is the second photo set?** Linfitt, Customs House,
      Argyle Road, Morrisons or Danby Castle. One edit to the `projects` array
      once Amy confirms, and it stops being "Recent project".
- [ ] Copy changed in the rebuild is flagged **needs re-proofing** at the top of
      `04 Renovations/Text/Renovations - COPY.md`.

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

## Renovations page built (29 July 2026) — for review

- [x] **`/renovations/`** built by composing the existing components. Ten sections:
      hero, what we do, how we work (dark), who we work with, our work (Riviera),
      reviews, areas, FAQ, cross-link band (dark), enquiry. Service + FAQPage +
      Breadcrumb schema. `npm run verify` clean.
- [x] **New division key `renovations`** (`src/data/divisions.ts`). Plum-anchored like
      Building & Joinery, but warmed and lifted: dark ground `#3d2c42` (warm aubergine
      rather than Joinery's indigo `#342650`, white on it 12.83:1), footer `#31233a`,
      and a new `surfaceSunken` override so every light band on the page is warm stone
      instead of the cool ink grey. `hasLockup: false`, which is what keeps the **Abbey
      Group** lockup in the header, as agreed.
- [x] **Warm stone tokens** added (`--stone-50/100/200/300/700`). The only warm
      neutrals on the site; used as surfaces and hairlines, with `--stone-700` as the
      one AA-safe text value (6.62:1 on white, 5.87:1 on stone-100) for captions.
- [x] **BUG FIXED — the site was inventing lockups.** `Header.astro` computed
      `showLockup` from `hasLockup` and then never used it, so Renovations rendered as
      a fabricated "ABBEY RENOVATIONS" in the header, and the footer did the same.
      Fixed at cause with `lockupFor()` in `divisions.ts`, applied inside
      `Lockup.astro`, so header, footer and hero badge are all safe by default and no
      page can show a lockup the client does not have. `PageHero`'s badge guard now
      checks `hasLockup` too.
- [x] **AA MISS FIXED (site-wide).** `--text-muted` was `#6f6e82`: 4.97:1 on white but
      only **4.40:1 on `--surface-sunken`**, and muted labels (review sources, FAQ
      notes, form microcopy) sit on sunken grounds on every page. Deepened to
      `#6b6a7d`: 5.27:1 on white, 4.67:1 on sunken. Visually near-identical, but the
      three approved pages have changed by this one token, so it is worth a look.
- [x] **`PageHero media="feature"`** added: a wider photo column and a bigger asset for
      pages whose photography is the argument. Opt-in, so the trade pages are untouched.
- [x] **`:target { scroll-margin-top: 104px }`** in global.css so the hero's
      "See Our Work" anchor does not land under the fixed header. Applies site-wide.
- [x] **Nine Riviera photographs** processed with the project's own `sharp` (WebP,
      <=2x slot, 18-64kb each). Featured shot is the domestic open-plan kitchen, not
      the guest-house breakfast room, for message match. Full record of file → source
      frame in `04 Renovations/image-manifest.md`.
- [x] Verified: build clean, audit clean, 1 H1, title 58 chars, desc 146, canonical
      slashed, valid JSON-LD, every `<img>` has alt. At a true 390px (iframe method,
      §10): **horizontal overflow 0**, primary CTA bottom at 631px (above the 844
      fold), every grid single-column except the 4-item project grid at 2x2, phone
      numbers unwrapped. Other three pages re-checked: correct lockups, no stone
      override leaking, titles unchanged.
- [x] **Safeguard proved, not assumed**: setting Areas to `sunken` on this page made
      `npm run verify` exit 1 and name both offending pairs (#6/#7 and #7/#8); reverted,
      exits 0.

## Utility pages built + pre-consent storage fixed (30 July 2026)

Josh confirmed the four legal inputs (30 July 2026), so these are drafts for Abbey
Group and their solicitor rather than placeholders:
processors = GoHighLevel, ServiceM8, Netlify, plus Google/Meta only once live;
retention = 24 months unconverted enquiries, 6 years customer records;
controller = Abbey Gas (Whitby) Limited, co. no. 08134722, registered office
20 Skinner Street.

- [x] **PRE-CONSENT STORAGE REMOVED.** The enquiry form used to write `ag_attribution`
      (gclid, gbraid, wbraid, utm_*) to localStorage the moment anyone landed. Storing
      that is not "strictly necessary" under PECR, so it needed consent that does not
      exist yet — it was the only pre-consent storage in the build. Now nothing is
      written: the parameters are read from the URL at submit and travel with the
      enquiry. **Proved end to end** with a test webhook: the lead payload carries
      `gclid: TEST_CLICK_123`, `utm_source`, `utm_campaign`, the form reaches its
      success state, and localStorage, sessionStorage and cookies are all empty before
      and after. That test also stands as the first proof the **GHL webhook pattern
      works** (open launch item).
      Deliberate trade-off: land-on-one-page, submit-on-another loses the click id
      until consent exists. Zero cost today, one line to restore later via
      `window.__agAttribution`.
- [x] **Five legal pages**, all sharing `LegalLayout` (compact dark header, not an
      820px marketing hero, because these are for reading):
      `/privacy/`, `/terms/`, `/homecare-plan-terms/`, `/cookies/`, `/credits/`.
      Breadcrumb schema on each; footer now links all of them.
- [x] **`src/data/legal.ts`** holds the controller details, the four named processors
      and the two retention periods, so a change is one edit rather than five.
- [x] **`src/data/consent-registry.ts` added, and the cookie table is generated from
      it** — the build standard's §6/§7 requirement, so the policy cannot drift from
      what the site loads. The registry is **empty, and that is accurate**: no
      analytics, no pixels, no embeds, self-hosted fonts, and now no form storage. So
      the cookie policy states plainly that the site sets no cookies, and explains why
      there is no banner. Add a service to the registry in the same change as the code
      that loads it and the page updates itself.
- [x] **TradeHelp Limited (co. no. 03712438) named as a processor.** It was not in the
      list Josh confirmed — it comes from Abbey's own plan brochure, which names it as
      the administrator of the Homecare Plans, so plan customers' data reaches it and
      it has to be disclosed.
- [x] **Home Care Plan terms transcribed faithfully** from Abbey's brochure rather than
      rewritten, with two queries marked in the page for the solicitor: confirm the
      edition is current, and confirm the Section 3 heading (the brochure heads it
      "Filter Monitoring" but the clauses beneath deal with quotes and works — not
      re-headed by us, since it is their contract).
- [x] Verified: 15 pages build and audit clean. Every legal page at a true 390px has
      zero overflow, one H1, and a title inside the limit.

### Utility pages — needs Josh / the client

- [ ] **VAT registration number.** The only field still missing. Abbey quote prices
      excluding VAT, so the E-Commerce Regulations require it on the site. Marked
      visibly on `/privacy/` and `/terms/` with an orange-ruled gap block, and it is one
      edit in `src/data/legal.ts` once it arrives.
- [ ] **Company number vs incorporation date.** `081…` numbers were issued in 2012, but
      the About notes say the limited company was formed in 2021. A Companies House
      lookup settles which is right. Using the confirmed 08134722 meanwhile.
- [ ] **Solicitor review**, then Abbey's own sign-off. Nothing goes live before it. The
      plan terms are the part that needs real scrutiny: a binding consumer subscription.
- [ ] Codebreak's standard credit wording for `/credits/`.
- [ ] The Contact page's Saturday hours question is still open and appears in the copy,
      the schema and the FAQ.

## Reviews page built (30 July 2026) — for review

- [x] **`/reviews/`** built, the destination for every "read all our reviews" link
      on the site. Five sections: hero with the real score card, the review wall in
      three groups, the recurring themes, leave-a-review, final CTA (dark).
      ItemList of Review + Breadcrumb schema. Verify clean.
- [x] **All 19 reviews verbatim** from the verified master, in the copy's three
      groups (9 heating and plumbing, 3 renovations and joinery, 7 general).
      Curated set, not a live Google feed, per Amy's decision.
- [x] **Stars only where a star rating exists.** The 13 Google entries the master
      records as 5★ show stars; the 6 Facebook entries are "recommends", which
      carries no rating, so they get a "Recommends" label instead of five invented
      stars. The schema follows the same line: `reviewRating` on 13 of 19.
- [x] **One aggregate rating on the page, and it is the real one.** BaseLayout's
      Organization already carries 4.6 / 19, so the page does not add a second
      aggregate for the same entity. Verified: exactly one `aggregateRating` in the
      page's JSON-LD, reading 4.6 from 19.
- [x] **Years shown only where the master has an absolute date** (2020, 2023, 2024,
      2025). The rest were recorded as "5 weeks ago" and inventing a year on the
      one page whose point is verifiability would be a fabricated detail.
- [x] **The wall is a column wall, not a row grid** — a deliberate exception to the
      even-grid rule, not a miss. Quotes run from six words to sixty and 19 will
      not divide into even rows; CSS columns balance by height, so there is no
      orphan cell and no ragged final row. 3 columns, 2 at tablet, 1 on phones.
- [x] Verified: 19 cards render, 13 with stars and 6 with Recommends, 1 H1,
      title 47, desc 154, backgrounds alternating. At a true 390px: overflow 0,
      CTA bottom 426px against the 844 fold, wall single-column.

### Reviews — needs Josh / the client

- [ ] **Anne's Facebook quote** is recorded in the master with an ellipsis in the
      middle ("another van arrived... Two hours later"). It is quoted exactly as
      recorded, but the untouched original would be better if Amy can find it.
- [ ] **The other pages' review grids still show five stars on Facebook
      recommendations**, which have no star rating. Same accuracy point as above.
      Those pages are approved, so I have not changed them: worth a decision to
      apply the "Recommends" label there too.
- [ ] Live Google feed stays off, per Amy. If that changes it needs Google Business
      Profile access, and it would surface the lower reviews she wants held back.

## Contact + Book Online built, round 8 refinements (30 July 2026)

### Round 8 (Josh)

- [x] **Pointer parallax, properly this time.** Two corrections: the mark only
      responds when the cursor is actually **near** it (nothing moves beyond
      260px, and the response is squared so it fades in late rather than
      creeping), and its **three arcs move independently** by their own depth
      rather than the whole logo sliding as one piece.
      That needed the mark inlined as SVG, so each arc is its own element:
      new `HeroMark.astro` + `src/data/crescent.ts` (the real brand geometry as
      path data). The flat `.svg` files still serve the static watermarks on inner
      bands. Electrical's arcs take the three real logo greens, Group keeps the
      tri-colour mark, everything else is its single accent.
      **Measured**: cursor far from the mark leaves all three transforms at
      exactly 0; cursor on it gives 3.97 / 8.34 / 13.5px — three different
      amounts, on Home, Electrical and About alike.
- [x] **BUG caught by measuring, not looking.** A class passed into a component
      does not match the *page's* scoped CSS, because the element carries the
      component's scope id. So `.hero__crescent` / `.phero__mark` silently stopped
      applying: the mark fell into normal flow at default size. Fixed with
      `:global()` from the scoped ancestor, and documented in the component. A
      generator script had also stripped the quotes from the SVG attributes, so
      the paths shipped empty and the mark was invisible on every page. Both only
      surfaced because the check read the rendered box, not the screenshot.
- [x] **Van: new artwork in, and slower again.** Josh supplied `NEWVAN.png`, a
      clean cut-out with no baked shadow (verified: 341 semi-transparent pixels in
      the bottom third against thousands in the old one). Used at its native
      1302px rather than upscaled — 78kb, half the old file. Travel cut from 0.55
      to 0.42 of the viewport and the ease softened from 0.1 to 0.075.
- [x] Hero height rule kept as standard, per Josh.

### The pages

- [x] **`/contact/`** — the SEO-bearing half of the pair, so it owns the NAP and
      LocalBusiness schema. Six sections: hero with the essentials card, enquiry
      form, book-online pointer, find us, emergency (dark), FAQ.
- [x] **The essentials live IN the hero**, not in a section below it. On a contact
      page the phone number is the content, so it sits above the fold, and it
      gives the standard 820px hero something real to hold. New optional `aside`
      slot on `PageHero` for exactly this (used by both new pages).
- [x] **`/book-online/`** — deliberately thin, repeating none of Contact's NAP,
      schema or keywords (cannibalisation, per the brief). Hero with a
      what-happens-next card, three cards on Amy's confirmed ServiceM8 **deep
      links** (free onsite quote, annual boiler service, landlord gas safety), and
      a prefer-to-talk section. Breadcrumb schema only.
- [x] **No embedded map, and no embedded booking iframe.** Both would load a third
      party and set cookies before anyone consents, and the consent layer is not
      built yet (build standard §6/§7). Contact links out to Google Maps
      directions instead; Book Online opens ServiceM8 in a new tab, exactly as
      every other CTA on the site already does. Both swap to real embeds when the
      consent banner lands.
- [x] **Audit caught the Contact title**: the copy file's 60 characters became 62
      once the ampersand is counted. Reworded to keep brand, Whitby and all three
      trades at 59.
- [x] `mail` icon added to the Icon set for the email row.
- [x] Verified: 9 pages build and audit clean. At a true 390px both new pages have
      zero overflow with the CTA above the fold (457px and 355px against 844), and
      every phone number measured single-line, unwrapped, non-overflowing.

### Contact — needs Josh / the client

- [ ] **Saturday hours.** The copy assumes Monday to Friday, 9am to 5pm and flags
      Saturday as unconfirmed. It is in the page copy, the schema and the FAQ, so
      it needs confirming before launch.
- [ ] **Office photo** still awaited (fit-out), and the real map embed is blocked
      on the consent layer.

## About page built (29 July 2026) — for review

- [x] **`/about/`** built. Nine sections: hero, our story, meet the team, why one
      team one roof (dark), credentials you can check, areas, reviews, FAQ, final
      CTA into Homecare. Group colourway and Group lockup, since the page speaks
      for the whole business. **No enquiry form**, deliberately: the copy's CTA is
      into Homecare and Contact, and the Contact page owns the form.
      LocalBusiness + Person + FAQPage + Breadcrumb schema. Verify clean.
- [x] **Every business fact is Amy's confirmed version** (21 July 2026): since
      2008, became Abbey Group in 2024, the six named people and their roles, Gas
      Safe 303376, City & Guilds, NAPIT for electrical. No staff count (never
      confirmed), no "family-run" label (James's decision), no certification body
      beyond those three. The 2021 limited-company date is in the client notes but
      not in the public copy, so the story marks show 2008 and 2024 only.
- [x] **`person()` schema builder added** for James as founder/MD — real E-E-A-T
      entity data, and only ever used for people the client has confirmed by name
      and role, since a name in schema is a factual claim.
- [x] **Five photographs used, all real Abbey work**: James's portrait in the hero,
      the full team-and-fleet shot leading the team section, the four division
      marks on a team jacket on the "one team" band (the literal proof of that
      section's claim), a working detail in the story, and the van's registration
      marks beside the credentials list. 16-141kb each.
- [x] **Honest team placeholders.** Only James has a headshot, so the other five
      carry a monogram card rather than a stock face — on the page whose whole job
      is trust, a stock face would undercut it. Six cards in a 3x2 even grid.
- [x] **Separate square headshot crop for James** (`about-james-eddon-headshot`):
      the hero's portrait centre-cropped to his jacket inside a square card and
      read as an empty grey box. Caught by measuring the rendered card, not by
      assuming the file was fine.
- [x] Verified: 1 H1, title 55, desc 144, canonical slashed, valid JSON-LD, alt on
      every image, backgrounds alternating. At a true 390px: overflow 0, CTA bottom
      457px against the 844 fold, every grid single-column.

### About — needs Josh / the client

- [ ] **Headshots for Amy, Natasha, Richard, Mal and James Fawcett.** Monograms
      stand in until then. Same shoot ideally, so the six read as one set.
- [ ] **The van in the credentials photo carries an OFTEC "Registered Heating
      Business" sticker.** If that registration is current, it is another
      checkable credential worth adding to the list; the copy does not claim it,
      because it is not in Amy's confirmations. Visitors can see it in the photo.
- [ ] Registered company name and number for the footer legals still outstanding
      (the 2021 limited company; the entity found in discovery no longer matches).
- [ ] Amy's open question: name only the key people, or list the wider team too.
      Built as the six named plus a "wider team" line, per the copy.
- [ ] Office exterior/interior shot still awaiting the fit-out.

## Build-review round 7 (Josh, 29 July 2026) — done

Notes on the Electrical page plus three site-wide items.

- [x] **"What we do" spacing fixed.** The services list and its CTA are now one
      column, so the CTA sits under the last service instead of being pushed down
      by the taller credentials card beside it, which had left a hole in the
      middle of the section.
- [x] **Orange against green resolved: navy on green grounds** (Josh's call from
      three options). New `navy` Button variant, used on the Electrical hero and
      the emergency band. Orange stays the action colour on every white and stone
      section, including the EV and commercial CTAs, so the rule still holds
      everywhere the two colours are not fighting. Navy on a dark ground has
      almost no shape separation of its own (1.85:1 against `#364627`), so the
      variant carries a division-accent ring; the label is white at 17:1.
      Standing rule 3 amended rather than quietly broken.
- [x] **EV section lifted**: a three-step panel (a quick look → fitted safely →
      certified), each step restating what the copy already claims. Nothing new
      asserted.
- [x] **Commercial section lifted**: four property types as an even 2x2 of
      labels, and the work as three items, both drawn from the existing paragraph.
- [x] **Hero watermark motion is now site-wide, and it is the POINTER animation
      Josh meant** plus the scroll drift. Round 7 first shipped only the scroll
      drift; the animation he liked on the old homepage was the mark easing toward
      the cursor. Both now live in **one** script in `BaseLayout`, driving any
      hero mark on the page (`[data-hero-mark], [data-phero-mark]`), so the two
      implementations cannot drift apart. The pointer motion eases toward its
      target each frame rather than snapping, and eases back to rest on
      mouseleave. **Proved by measurement**: dispatching a mousemove over each
      hero moves the mark ~17px x / ~15px y on all six pages, and the mark
      translates ~40px at 400px of scroll. Reduced motion is guarded twice (the
      script early-returns and the CSS forces `transform: none`), both confirmed
      in the built output. Inner section watermarks stay static by choice.
- [x] **Every hero is exactly the same height.** They ran 746-881px because each
      grew with whatever photo it held, which was visible moving between pages
      (Josh). Two fixes: the hero photo slot is now sized by **height** (520px)
      rather than by its ratio, so the variants differ in width instead; and both
      hero implementations share `min-height: min(92vh, 820px)` with the same
      padding. All seven pages now measure **820px** at 1440x900. Below 1024px the
      min-height is dropped so stacked heroes grow with their content as before.
- [x] **Homepage hero calmed.** The three drifting coloured crescent layers,
      their pointer parallax and their CSS drift animations are replaced by a
      single white mark at 9% opacity, larger and with no drop shadow. It was
      three independent animations competing with the van and with the mark on
      the van's own livery.
- [x] **Van bigger, further off the edge, shadow gone, and now smoothed.** Scaled
      up (438px tall against 326px) and pushed to `right: -450px`. The offset is
      load-bearing: scaling up alone put the rear of the van over the lead
      paragraph and the CTA, so the offset is what keeps its left edge clear of
      the copy column. Its motion felt fast (Josh), partly because scaling the van
      up had also scaled its travel: the distance was derived from the van's own
      width. Now it is a fraction of the viewport (0.55) and the position **eases**
      toward its scroll target each frame instead of tracking it exactly, so it
      glides. Measured: after a jump to 400px of scroll it moves
      0 → 9 → 107 → 199 → 279 → 322 → 352px over ~600ms rather than snapping.
      The baked-in ground shadow came out of the asset in two passes, because it
      was half soft alpha and half an **opaque** grey band between the wheels
      that the first pass left behind. Rebuilt at 1500px, 149kb, inside the
      150KB hero budget.
- [x] **Footer carries the Abbey Group lockup on every page**, keeping each
      page's division colours and accent rule. Verified across all six pages.
- [x] Re-verified after all of it: build and audit clean, and at a true 390px all
      six pages still have zero horizontal overflow with the primary CTA above
      the fold.

## Electrical green corrected + Electrical page built (29 July 2026)

### The green was wrong site-wide

- [x] **Corrected to the real logo (Josh).** `#c0ff71` from `_Specs/03` is a long
      way off the actual Abbey Electrical lockup. The real art uses three greens,
      and sampling the supplied PNG **and** the PDF rendered at 300dpi confirms
      them exactly: **`#78ab0a`** (main), **`#96d707`** (bright outer crescent),
      **`#adea6a`** (pale inner crescent). The whole green scale is rebuilt around
      them, so the darker steps look nothing like the old ones.
- [x] **The Electrical crescent is now tri-tone**, coloured bright / dark / pale in
      the same path order as the supplied logo, so the built lockup matches the
      real art rather than approximating it. `mark-electrical-solid.svg` keeps a
      single-tone version for large low-opacity watermarks.
- [x] **A green can carry text again.** The "green is never text" rule existed only
      because `#c0ff71` was so pale that even its darkest step reached 4.31:1,
      forcing `--green-ink` to be an olive (`#4a6529`) that was not a brand colour.
      The real logo green yields `--green-800` `#517407` at **5.45:1 on white,
      4.83:1 on sunken**, so `--green-ink` now points at it. The brand greens
      themselves still never carry text (`#78ab0a` 2.75:1, `#96d707` 1.75:1).
- [x] Electrical's dark ground moved `#36483c` -> **`#364627`** (navy tinted toward
      the logo green, the same rule the other divisions follow; white 10.18:1) and
      the footer to `#2c3a20` (12.12:1).
- [x] Homepage Electrical card now uses the logo green for its tab, chip and link.
      Spec updated with a dated correction note; handover rule 4 reworded.

### The page

- [x] **`/electrical/`** built. Ten sections: hero, what we do + credentials card,
      emergency band (dark), landlord EICR, EV chargers, commercial, reviews,
      areas, FAQ, enquiry. Service + FAQPage + Breadcrumb schema. Verify clean.
- [x] **Built to work with no photography**, because none exists for this trade:
      no hero image, and the trust argument carried by a credentials card, the
      EICR price, the compliance intervals and the emergency-line facts instead of
      six hatched placeholders. No stock: it would undercut a page arguing
      "certified and properly signed off". Reasoning recorded in the page's
      `image-manifest.md`.
- [x] **The client's real lockup is used**, once, in that card: extracted from the
      supplied PDF at 3375px, background removed, trimmed, 43kb transparent WebP
      (`public/brand/logos/abbey-electrical-lockup.webp`). Light grounds only, as
      its wordmark is navy.
- [x] **Only confirmed credentials appear**: NAPIT registered (self-certifies Part
      P), City & Guilds qualified, signed off to current wiring regulations.
      NICEIC is never named anywhere on the page, per the brief.
- [x] Third review added (Pip Strafford) so the grid is an even row of three; all
      three are general trust reviews, as the copy notes, since no
      electrical-specific ones exist. Robert Woodhouse quoted to his last complete
      sentence only.
- [x] Verified: 1 H1, title 53, desc 136, canonical slashed, valid JSON-LD, alt on
      every image, backgrounds alternating. At a true 390px: **overflow 0**, CTA
      bottom 708px (above the 844 fold), grids single-column, phone numbers
      unwrapped. Homepage re-checked for the token change.

### Electrical — needs Josh / the client

- [ ] **Photography for this trade at all.** Highest value: an electrician at a
      consumer unit, an EICR test in progress, an installed EV charger.
- [ ] Copy revised at build time is flagged **needs re-proofing** in
      `06 Electrical/Text/Electrical - COPY.md` (third review, the credentials card
      move, the emergency facts list, one new EV line, tightened EICR Q&A).
- [ ] The real lockup is a **raster** (the PDF holds no vector paths). True vector
      art would let the header lockup use the client's own letterforms rather than
      site type. Still outstanding for all five divisions.

## Building & Joinery page built (29 July 2026) — for review

- [x] **`/building-joinery/`** built. Ten sections: hero, what bespoke joinery means
      (the AEO definition block), what we make, our work (six-photo craft gallery),
      materials (dark band), structural work to standard, reviews, areas, FAQ, enquiry.
      Service + FAQPage + Breadcrumb schema. `npm run verify` clean.
- [x] **Built as a trade page, not a second premium showcase.** It uses the joinery
      division (plum `#342650`), carries the **Abbey Building & Joinery** lockup and
      hero badge (unlike Renovations, which stays Group), and reuses the proven ticked
      service list rather than Renovations' editorial numerals. The two pages read as
      the same team without looking like the same page.
- [x] **Photography found rather than waited for.** The copy had the portfolio as a
      placeholder; eight real images were assembled from three folders (this page's own
      two shots, the Riviera set, and the two unconfirmed-project sets). Hero is the
      joiner fitting a window above Whitby harbour. Record in the page's
      `image-manifest.md`.
- [x] **Anne's review dropped, Karen used instead**: Anne's quote is truncated
      mid-sentence in the reviews master and only complete quotes ship (convention #8).
      Three reviews, so the grid is an even single row.
- [x] Verified: 1 H1, title 52, desc 147, canonical slashed, valid JSON-LD, alt on
      every image, adjacent backgrounds alternate the whole way down. At a true 390px:
      **horizontal overflow 0**, CTA bottom 636px (above the 844 fold), every grid
      single-column, phone numbers unwrapped.

### Building & Joinery — needs Josh / the client

- [ ] **No fitted-wardrobe photograph exists** in any supplied folder, so wardrobes are
      named in "What we make" and the FAQ but never shown, on a page that argues
      through pictures. One wardrobe shot and one joint/grain close-up would fix it.
- [ ] **Two gallery photos are from projects we cannot name** (the bar and function room
      fit-out, and the timber-clad wall), captioned "Recent project" until Amy confirms.
      The bar set is the one the Renovations manifest flagged: it is used here, since a
      bar front and oak worktop are joinery.
- [ ] Copy revised at build time is flagged **needs re-proofing** in
      `05 Building & Joinery/Text/Building & Joinery - COPY.md`.

### Renovations — needs Josh / the client

- [ ] **Is Riviera a guest house, and can we say so?** The set is plainly one: a framed
      photograph reads "Riviera Guesthouse", and there is a lift and a fire exit sign.
      Saying so is a stronger proof point than a domestic job and it feeds the
      holiday-let/second-home angle in the SEO brief. The copy is neutral until Amy
      confirms.
- [ ] **Suppliers link dropped** ("Read more about who we work with"): there is no
      Suppliers page to link to. It returns if that folder graduates to a page.
- [ ] Copy revised at build time is flagged **needs re-proofing** in
      `04 Renovations/Text/Renovations - COPY.md` (Our work section, reviews set,
      reviews heading, trust row, cross-link band).
- [ ] No photograph of a working site exists in this set, so
      `renovations-project-management.webp` is still unfilled. Worth one shot from Amy.

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

- [x] **Renovations page** — BUILT 29 July 2026 (see the section above).
      Positioning RESOLVED (Josh, 29 July 2026).

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

## Outstanding before go-live (detail in `_Specs/01 OUTSTANDING FROM CLIENT.md`)

**All fifteen pages are built.** What is left is not page building.

### Hard gates
- [ ] **Solicitor + Abbey review of the five legal pages.** Drafts are live; the
      Home Care Plan terms are the part that needs real scrutiny (binding consumer
      subscription), plus the two queries marked in that page.
- [ ] **VAT number** — the only visible gap on the site. One edit to `vatNumber`
      in `src/data/legal.ts` and the orange gap blocks disappear.
- [ ] **Saturday opening hours** — currently "Mon to Fri, 9am to 5pm" in Contact
      copy, the LocalBusiness schema and a Contact FAQ. Wrong in three places if
      Saturdays are worked.
- [ ] **Company number check** — footer publishes 08134722 on all 15 pages, but
      `081…` is a 2012 number and the About notes say the company was formed in
      2021. Companies House settles it.

### Launch-day credentials
- [ ] **GHL webhook URL** — set `PUBLIC_GHL_WEBHOOK` in Netlify. The pattern is
      already proved end to end: a test post carried name, phone, email, postcode,
      message, source, page, tags, timestamp and the gclid/utm values.
- [ ] **Tracking IDs** (GA4 `G-`, Ads `AW-` + label, Meta Pixel) → add each to
      `src/data/consent-registry.ts` **in the same change as the loading code**,
      which regenerates the cookie table, then build the consent banner.
      Nothing tracking-related exists today, so zero pre-consent tracking is true.
- [ ] **Deploy access** — GitHub org, Netlify team, DNS for abbeygroup.uk,
      decision on a preview password.
- [ ] **Google Business Profile** — still lists 59 Mayfield Road; needs 20 Skinner
      Street.

### Assets and polish
- [~] **Photography** — real photos are live on Home, Homecare, Plumbing,
      Renovations (Riviera), Building & Joinery and About. Gaps: **Electrical has
      none at all**, no fitted wardrobe or joint close-up for Joinery, five team
      headshots (monogram cards stand in), the office (fit-out), the other named
      projects, and a working-site shot for Renovations.
- [ ] **Per-page OG images** — `public/og/default.png` is one branded placeholder.
      Generating fifteen from the brand assets is on us, not the client.
- [ ] **Division logos** — only Electrical's real lockup exists. The other four are
      built from the vector crescent plus site type (`Lockup.astro` is the single
      place to swap them in).
- [ ] **Real map + booking embeds** — both deliberately links-out today, because an
      iframe would load a third party pre-consent. Revisit with the banner.
- [ ] **Consistency decision** — the four service-page review grids still show five
      stars on Facebook recommendations, which carry no star rating. `/reviews/`
      uses a "Recommends" label instead.
- [ ] Lighthouse on the live domain (PSI twice); CrUX watch post-launch.

## Notes

- Every internal link on the site now resolves: `/reviews/`, `/contact/`,
  `/book-online/` and the five legal pages are all built.
- Routes live in `src/data/site.ts`; legal facts in `src/data/legal.ts`; anything
  that stores data on a device in `src/data/consent-registry.ts` (which generates
  the cookie policy table).
- Trailing-slash canon holds: canonical == sitemap URL == 200 URL.
