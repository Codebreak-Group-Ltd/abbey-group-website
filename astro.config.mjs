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
      // Hidden/ad landing + thank-you pages get excluded here later (§4).
      // `/preview/` holds unshipped experiments (e.g. the house-journey demo);
      // they are noindex and must never enter the sitemap.
      filter: (page) => !page.includes('/thank-you/') && !page.includes('/preview/'),
    }),
  ],
});
