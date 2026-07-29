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

export type DivisionKey = 'group' | 'plumbing' | 'homecare' | 'joinery' | 'electrical';

export interface Division {
  /** Sub-brand name as it reads under the ABBEY wordmark. */
  label: string;
  /** Bright brand colour: fills, tints, glows, rules. Not for small text. */
  accent: string;
  /** Darkened variant: accent-coloured text and small icons (AA on white). */
  ink: string;
  /** Very light tint for chip/panel backgrounds. */
  soft: string;
  /** Deep shade used for the hero gradient glow. */
  glow: string;
  /** Single-colour crescent mark path. */
  mark: string;
}

export const divisions: Record<DivisionKey, Division> = {
  group: {
    label: 'Group',
    accent: 'var(--blue-500)',
    ink: 'var(--blue-800)',
    soft: 'var(--blue-50)',
    glow: 'var(--blue-800)',
    mark: '/brand/crescent/crescent-mark.svg',
  },
  plumbing: {
    label: 'Plumbing & Heating',
    accent: 'var(--blue-500)',
    ink: 'var(--blue-800)',
    soft: 'var(--blue-50)',
    glow: 'var(--blue-800)',
    mark: '/brand/crescent/mark-plumbing.svg',
  },
  homecare: {
    label: 'Home Care',
    accent: 'var(--orange-500)',
    ink: 'var(--orange-800)',
    soft: 'var(--orange-50)',
    glow: 'var(--orange-900)',
    mark: '/brand/crescent/mark-homecare.svg',
  },
  joinery: {
    label: 'Building & Joinery',
    accent: 'var(--plum-500)',
    ink: 'var(--plum-700)',
    soft: 'var(--plum-50)',
    glow: 'var(--plum-900)',
    mark: '/brand/crescent/mark-joinery.svg',
  },
  electrical: {
    // Green is a highlight, never a text colour: even --green-950 fails AA on
    // white, so `ink` uses the dedicated --green-ink. Pure green stays for the
    // mark, rules and highlights only.
    label: 'Electrical',
    accent: 'var(--green-500)',
    ink: 'var(--green-ink)',
    soft: 'var(--green-100)',
    glow: 'var(--green-950)',
    mark: '/brand/crescent/mark-electrical.svg',
  },
};

/** Inline style string setting the page-level accent custom properties. */
export function divisionVars(key: DivisionKey): string {
  const d = divisions[key];
  return [
    `--page-accent:${d.accent}`,
    `--page-accent-ink:${d.ink}`,
    `--page-accent-soft:${d.soft}`,
    `--page-accent-glow:${d.glow}`,
  ].join(';');
}
