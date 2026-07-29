# Abbey Group — website

Marketing site for **Abbey Group**, Whitby home services (plumbing & heating,
renovations, building & joinery, electrical, and the priority Homecare Plans
product). Astro static site, built to Codebreak's Astro build standard.

## Stack

- **Astro** (static output), zero framework JS by default.
- Self-hosted fonts via `@fontsource` (DM Serif Display + Inter, latin subset).
- Icons: `lucide-static` inlined as SVG (currentColor), no CDN.
- Deploy target: **Netlify via GitHub CI** (not yet wired — build is local-first).

## Commands

```bash
npm install      # install deps
npm run dev      # dev server (http://localhost:4321)
npm run build    # static build → dist/
npm run preview  # preview the build
```

Node 20+ (`.nvmrc`).

## Structure

```
src/
  data/site.ts          NAP, nav, socials, ServiceM8 links, reviews (source of truth)
  lib/schema.ts         JSON-LD builders (LocalBusiness, Service, FAQPage, Breadcrumb)
  styles/tokens.css      design tokens (pure :root vars, zero selectors)
  styles/global.css      base + scroll-reveal + skip link + utilities
  layouts/BaseLayout.astro   <head>, SEO/OG, fonts, site-wide schema, header/footer
  components/            Header, Footer, Button, Icon, Section, Eyebrow, PhotoSlot,
                         Reviews, FAQ, Areas, PageHero, EnquiryForm
  pages/                 index (Home), homecare-plans, plumbing-heating
public/
  brand/                 logos + crescent SVGs (recoloured to confirmed hex)
  og/default.png         placeholder OG image (regenerate per-page later)
  favicon.svg
```

## Design system (reconciled)

Look/structure from the Claude Design handover; **values are client-confirmed**
(`_Specs/03 DESIGN TOKENS.md`): navy `#121037`, blue `#1895cc`, plum `#7f5d9c`,
orange `#eb6740` (Home Care accent), green `#c0ff71` (Electrical). One site-wide
CTA colour (orange). Signature corner radius `12px 12px 12px 2px`. See
`LAUNCH.md` for the full list of reconciliations and outstanding items.

## Content

Copy, plan data and briefs live in the client Dropbox project folder
(`Abbey Group/Website/*`). This repo consumes finished copy; it is not the copy
source. Only confirmed information is in the build.
