#!/usr/bin/env node
/* =====================================================================
   Generate the static crescent watermark SVGs in public/brand/crescent/.

   Run after changing a division's crescent tones:
     node tools/crescents.mjs

   WHY THIS EXISTS. The crescent appears in two forms. `HeroMark.astro` INLINES
   the geometry so its three arcs can move independently under the pointer, and
   it takes its colours from `divisions.ts` `markLayers`, i.e. from CSS custom
   properties. The static watermarks (inner section bands, the Areas panel,
   DivisionSlot, Lockup) are loaded as `<img src>`, which cannot see CSS custom
   properties at all — so their colours have to be baked in as literal hex.

   That means two sources of truth for the same colours, which is exactly the
   kind of drift that goes unnoticed. This script is the fix: the hexes live
   here, it writes the SVGs, and the values are documented alongside the tokens
   in `src/styles/tokens.css`. Change one, change both, re-run this.

   The geometry is the client's real brand mark, same paths as `src/data/crescent.ts`.
   Order is outer sweep, middle ring, inner crescent — the order the real art is
   built in and the order the logo pack colours them.
   ===================================================================== */

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'public/brand/crescent';

const viewBox = '490 -10 600 630';

const paths = [
  'M894.4,606.3c44.7-47.1,75.6-108,85.1-177.2c24.3-176-98.7-338.3-274.7-362.6c-69.2-9.5-136.2,3.8-193.6,34  C580.1,27.9,681.8-11.7,788.6,3c176,24.3,299,186.6,274.7,362.5C1048.6,472.4,983,559.6,894.4,606.3',
  'M623.5,607.1c-33.7-35.6-57.1-81.6-64.3-133.8c-18.3-133,74.6-255.6,207.5-273.9  c52.3-7.2,102.9,2.8,146.3,25.7c-52.1-54.9-128.9-84.7-209.6-73.6c-133,18.3-225.8,140.9-207.5,273.8  C506.9,506,556.5,571.8,623.5,607.1',
  'M831.1,606.2c25-26.3,42.3-60.4,47.6-99.1c13.6-98.3-55.2-189.1-153.5-202.7c-38.7-5.3-76.2,2.1-108.2,19  c38.5-40.6,95.4-62.7,155.1-54.5c98.3,13.5,167.1,104.2,153.6,202.6C917.3,531.3,880.6,580.1,831.1,606.2',
];

/* Outer / middle / inner, matching `markLayers` in src/data/divisions.ts.
   Mid and inner are sampled straight off the client's logo pack; the outer is
   the division's confirmed accent token value. See tokens.css for why the two
   differ for Plumbing. */
const marks = {
  'mark-plumbing':   ['#1895cc', '#1878a8', '#36baea'],
  'mark-homecare':   ['#eb6740', '#b44e24', '#f08a66'],
  'mark-joinery':    ['#7f5d9c', '#603c72', '#9c7eb4'],
  /* Already correct from the real Electrical art (29 July 2026): the logo's own
     three greens, bright / main / pale, in its own path order. */
  'mark-electrical': ['#96d707', '#78ab0a', '#adea6a'],
  /* GROUP IS TRI-COLOUR AND STAYS THAT WAY. One tone of each division's colour,
     which is what ties the five together. The supplied Group logo is greyscale;
     Josh confirmed 2 August 2026 that it is reference only. */
  'crescent-mark':   ['#1895cc', '#eb6740', '#7f5d9c'],
};

const svg = (fills) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">` +
  paths.map((d, i) => `<path fill="${fills[i]}" d="${d}"></path>`).join('') +
  `</svg>\n`;

let n = 0;
for (const [name, fills] of Object.entries(marks)) {
  writeFileSync(join(OUT, `${name}.svg`), svg(fills));
  console.log(`  ${name}.svg  ${fills.join('  ')}`);
  n++;
}
console.log(`\n✓ wrote ${n} crescent(s) to ${OUT}/\n`);
