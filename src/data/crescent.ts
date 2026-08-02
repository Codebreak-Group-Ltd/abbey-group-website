/* The Abbey crescent, as path data.

   Same geometry as `public/brand/crescent/*.svg` — lifted from the client's real
   brand mark — but available to inline, so the three arcs can be separate
   elements and move independently of each other (see HeroMark). The .svg files
   are still what the static watermarks use, where nothing moves.

   Order is the order the art is built in, and the order the real Abbey
   Electrical lockup colours them: outer sweep, middle ring, inner crescent. */

export const crescentViewBox = '490 -10 600 630';

/** Width-to-height ratio of the viewBox, for sizing without a layout shift. */
export const crescentRatio = 600 / 630;

export const crescentPaths = [
  'M894.4,606.3c44.7-47.1,75.6-108,85.1-177.2c24.3-176-98.7-338.3-274.7-362.6c-69.2-9.5-136.2,3.8-193.6,34  C580.1,27.9,681.8-11.7,788.6,3c176,24.3,299,186.6,274.7,362.5C1048.6,472.4,983,559.6,894.4,606.3',
  'M623.5,607.1c-33.7-35.6-57.1-81.6-64.3-133.8c-18.3-133,74.6-255.6,207.5-273.9  c52.3-7.2,102.9,2.8,146.3,25.7c-52.1-54.9-128.9-84.7-209.6-73.6c-133,18.3-225.8,140.9-207.5,273.8  C506.9,506,556.5,571.8,623.5,607.1',
  'M831.1,606.2c25-26.3,42.3-60.4,47.6-99.1c13.6-98.3-55.2-189.1-153.5-202.7c-38.7-5.3-76.2,2.1-108.2,19  c38.5-40.6,95.4-62.7,155.1-54.5c98.3,13.5,167.1,104.2,153.6,202.6C917.3,531.3,880.6,580.1,831.1,606.2',
] as const;

/** How far each arc travels under the pointer, outer to inner. */
export const crescentDepths = [10, 21, 34] as const;
