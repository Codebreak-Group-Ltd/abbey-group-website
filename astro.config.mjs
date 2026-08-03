// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Codebreak Astro build standard §1:
// - static output, trailing-slash canon ('always'), inline critical CSS,
//   compress HTML, sharp image service. Site set to the live domain so
//   canonicals / og:url / sitemap all emit slashed absolute URLs.
export default defineConfig({
  site: 'https://abbeygroup.uk',
  trailingSlash: 'always',
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
    format: 'directory',
  },
  image: {
    // sharp is the default service; declared explicitly for clarity.
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  integrations: [
    sitemap({
      // `/lp/` holds paid-traffic landing pages, deliberately NOT indexable:
      // `/lp/homecare/` and `/homecare-plans/` target the same terms, and the
      // site page is the one carrying Service + FAQPage + Breadcrumb schema and
      // built to rank. Two near-identical pages would cannibalise each other, so
      // the LP is excluded here AND carries BaseLayout's `noindex`.
      // `/thank-you/` is post-conversion, with nothing to rank for.
      // `/preview/` holds unshipped experiments (e.g. the house-journey demo).
      // Note: robots.txt deliberately Disallows none of these — a crawler has to
      // fetch the page to see the noindex.
      filter: (page) =>
        !page.includes('/lp/') &&
        !page.includes('/thank-you/') &&
        !page.includes('/preview/'),
    }),
  ],
});
