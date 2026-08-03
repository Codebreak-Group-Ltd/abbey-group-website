/* Division (sub-brand) definitions.

   Abbey Group runs sub-brands with their own colourway and lockup:
   Plumbing & Heating (blue), Home Care (orange), Building & Joinery (plum),
   Electrical (green). A page declares its division once and every accent on
   it follows: hero glow, crescent watermark, eyebrows, chips, rules.

   `mark` is a single-colour crescent generated from the vector brand mark.
   NOTE: the client's supplied division lockups are ~320px screenshots plus a
   raster-only PDF, so the wordmark here is set in the site's own type. Swap in
   the real vector lockups when they arrive (see LAUNCH.md).

   `ink` shades are the AA-safe variants for accent-coloured text on white. */

export type DivisionKey =
  | 'group' | 'plumbing' | 'homecare' | 'joinery' | 'electrical'
  /* Renovations is not a sub-brand: it is the flagship service, plum-anchored
     like Building & Joinery (same team) but treated as the premium end, and it
     keeps the Abbey GROUP lockup in the header. It is a division key purely so
     the page inherits the colourway system. `hasLockup: false` is what keeps
     the Group logo in the header (see Header.astro). */
  | 'renovations';

export interface Division {
  /** Sub-brand name as it reads under the ABBEY wordmark. */
  label: string;
  /** Bright brand colour: fills, tints, glows, rules. Not for small text. */
  accent: string;
  /** Darkened variant: accent-coloured text and small icons (AA on white). */
  ink: string;
  /** Very light tint for chip/panel backgrounds. */
  soft: string;
  /** Accent-coloured TEXT on this division's own dark ground. The bright 500s
      are 2.4-4.1:1 there, so they fail; these are the 400 steps, all above
      5:1 on their own `surfaceDark` (checked), and still read unmistakably as
      the division colour rather than an off-white. */
  accentOnDark: string;
  /** Deep shade used for the hero gradient glow. */
  glow: string;
  /** Single-colour crescent mark path. Used for the static watermarks on inner
      bands and in the Areas panel. Hero watermarks use `HeroMark`, which inlines
      the same geometry so its three arcs can move independently. */
  mark: string;
  /** Colours for the hero watermark's three arcs, outer to inner. Omit and all
      three take `accent`. Group keeps the tri-colour brand mark; Electrical uses
      the three greens of its real logo. */
  markLayers?: [string, string, string];
  /** Navy tinted toward the division hue: the ground for this page's dark
      sections, so a trade page reads as its own colour at a glance while
      staying in the navy family. All four keep white text above 9:1. */
  surfaceDark: string;
  /** Footer ground: the same hue as `surfaceDark` but deeper, so the footer
      always reads as the base of the page it belongs to. */
  surfaceFooter: string;
  /** Optional override for the light "sunken" band on this page. Only
      Renovations sets it (warm stone instead of the cool ink grey), which is
      how that page reads warmer without any per-section colour overrides.
      Any value here must keep --text-muted above 4.5:1 (checked). */
  surfaceSunken?: string;
  /** Does this section have its own lockup in the client's brand set? */
  hasLockup: boolean;
}

export const divisions: Record<DivisionKey, Division> = {
  group: {
    label: 'Group',
    accent: 'var(--blue-500)',
    ink: 'var(--blue-800)',
    soft: 'var(--blue-50)',
    accentOnDark: 'var(--blue-400)',
    glow: 'var(--blue-800)',
    mark: '/brand/crescent/crescent-mark.svg',
    // The tri-colour brand mark, outer to inner, as the real art is built.
    markLayers: ['var(--blue-500)', 'var(--orange-500)', 'var(--plum-500)'],
    surfaceDark: 'var(--ink-500)',
    surfaceFooter: '#0e0c2d',
    hasLockup: false,
  },
  plumbing: {
    label: 'Plumbing & Heating',
    accent: 'var(--blue-500)',
    ink: 'var(--blue-800)',
    soft: 'var(--blue-50)',
    accentOnDark: 'var(--blue-400)',
    glow: 'var(--blue-800)',
    mark: '/brand/crescent/mark-plumbing.svg',
    // Three tones, from the real logo art. The outer keeps the confirmed
    // --blue-500; the logo's own outer is #00a2de, which is logged as a
    // question rather than changed unilaterally (see tokens.css).
    markLayers: ['var(--blue-500)', 'var(--crescent-plumb-mid)', 'var(--crescent-plumb-inner)'],
    surfaceDark: '#133d60',
    surfaceFooter: '#0f314f',
    hasLockup: true,
  },
  homecare: {
    label: 'Home Care',
    accent: 'var(--orange-500)',
    ink: 'var(--orange-800)',
    soft: 'var(--orange-50)',
    accentOnDark: 'var(--orange-400)',
    glow: 'var(--orange-900)',
    mark: '/brand/crescent/mark-homecare.svg',
    // Three tones from the real logo art; its outer (#ea6630) and our
    // --orange-500 (#eb6740) agree to within a point.
    markLayers: ['var(--orange-500)', 'var(--crescent-care-mid)', 'var(--crescent-care-inner)'],
    surfaceDark: '#4c2238',
    surfaceFooter: '#3e1b2e',
    hasLockup: true,
  },
  joinery: {
    label: 'Building & Joinery',
    accent: 'var(--plum-500)',
    ink: 'var(--plum-700)',
    soft: 'var(--plum-50)',
    accentOnDark: 'var(--plum-400)',
    glow: 'var(--plum-900)',
    mark: '/brand/crescent/mark-joinery.svg',
    // Three tones from the real Abbey Building logo; its outer (#7e4e9c) and
    // our --plum-500 (#7f5d9c) agree to within a point.
    markLayers: ['var(--plum-500)', 'var(--crescent-plum-mid)', 'var(--crescent-plum-inner)'],
    surfaceDark: '#342650',
    surfaceFooter: '#2a1e42',
    hasLockup: true,
  },
  renovations: {
    // Plum family (same team as Building & Joinery) but warmed: the dark ground
    // is a warm aubergine rather than Joinery's indigo-leaning #342650, and the
    // light band is warm stone. White on the dark ground is 12.83:1.
    // No lockup by design — the header keeps the Abbey Group mark, because a
    // page headed "Renovations" carrying the Joinery lockup would subordinate
    // the flagship service to the craft sub-brand (LAUNCH.md, round 6).
    label: 'Renovations',
    accent: 'var(--plum-500)',
    ink: 'var(--plum-700)',
    soft: 'var(--stone-100)',
    accentOnDark: 'var(--plum-400)',
    glow: 'var(--plum-900)',
    mark: '/brand/crescent/mark-joinery.svg',
    markLayers: ['var(--plum-500)', 'var(--crescent-plum-mid)', 'var(--crescent-plum-inner)'],
    surfaceDark: '#3d2c42',
    surfaceFooter: '#31233a',
    surfaceSunken: 'var(--stone-100)',
    hasLockup: false,
  },
  electrical: {
    /* The one division where the client's real lockup exists
       (`_Global/Brand Assets/abbey-electrical-logo.png`), so everything here is
       matched to it: the greens are the logo's own three (corrected 29 July
       2026, see tokens.css), and `mark` is the tri-tone crescent, coloured
       bright / dark / pale in the same path order as the supplied art.
       The brand greens still never carry text (#78ab0a is 2.75:1 on white);
       `ink` is --green-800, which is in the logo's family and passes AA. */
    label: 'Electrical',
    accent: 'var(--green-500)',
    ink: 'var(--green-ink)',
    soft: 'var(--green-100)',
    accentOnDark: 'var(--green-400)',
    glow: 'var(--green-950)',
    mark: '/brand/crescent/mark-electrical.svg',
    // The real logo's three greens, in the same order as its art.
    markLayers: ['var(--green-400)', 'var(--green-500)', 'var(--green-300)'],
    // Navy tinted toward the logo green, as the other divisions are tinted
    // toward theirs. White on it is 10.18:1, footer 12.12:1.
    surfaceDark: '#364627',
    surfaceFooter: '#2c3a20',
    hasLockup: true,
  },
};

/** The lockup a page should actually display. A division only gets its own
    lockup if one exists in the client's brand set; anything else falls back to
    the Abbey Group mark, so nothing on the site can render a lockup the client
    does not have (Renovations is the case that made this necessary: it is the
    flagship service, not a sub-brand). Used by Lockup and Header. */
export function lockupFor(key: DivisionKey): DivisionKey {
  return key !== 'group' && divisions[key].hasLockup ? key : 'group';
}

/** Inline style string setting the page-level accent custom properties. */
export function divisionVars(key: DivisionKey): string {
  const d = divisions[key];
  return [
    // Only set when the division overrides it (Renovations' warm stone).
    ...(d.surfaceSunken ? [`--surface-sunken:${d.surfaceSunken}`] : []),
    `--page-accent:${d.accent}`,
    `--page-accent-ink:${d.ink}`,
    `--page-accent-soft:${d.soft}`,
    `--page-accent-on-dark:${d.accentOnDark}`,
    `--page-accent-glow:${d.glow}`,
    // Overrides the global dark surface so every `Section bg="dark"` on this
    // page picks up the division-tinted ground automatically.
    `--surface-page-dark:${d.surfaceDark}`,
    `--surface-footer:${d.surfaceFooter}`,
    // Inline links follow the division too, so an orange page has no stray
    // blue links. Group's ink is blue-800, i.e. the site default, unchanged.
    `--text-link:${d.ink}`,
  ].join(';');
}
