#!/usr/bin/env node
/* =====================================================================
   Static pre-deploy audit. Walks dist/ and flags problems that are cheap
   to catch here and expensive to catch on the live domain.

   Run after `npm run build`, before every deploy:
     npm run audit

   Exits non-zero if any ERROR is found, so it can gate a deploy.
   Build standard §4 ("keep a static pre-deploy audit script in the repo").
   ===================================================================== */

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const LIMITS = { title: 60, description: 155 };

if (!existsSync(DIST)) {
  console.error(`✗ ${DIST}/ not found. Run \`npm run build\` first.`);
  process.exit(1);
}

/* ---------- helpers ---------- */

function htmlFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) htmlFiles(p, out);
    else if (entry.endsWith('.html')) out.push(p);
  }
  return out;
}

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
   .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`, 'i'));
  return m ? m[1] : null;
};

/* Background "kind" of a top-level <section>. The hero and interior page hero
   are dark grounds; Section.astro emits section--white/sunken/dark. */
function bgKind(tag) {
  if (/\bsection--white\b/.test(tag)) return 'white';
  if (/\bsection--sunken\b/.test(tag)) return 'sunken';
  if (/\bsection--dark\b/.test(tag)) return 'dark';
  if (/class="[^"]*\b(hero|phero)\b/.test(tag)) return 'dark';
  return null; // unknown: skip from adjacency comparison
}

/* ---------- checks ---------- */

const errors = [];
const warnings = [];
const files = htmlFiles(DIST).sort();

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const page = '/' + relative(DIST, file).replace(/index\.html$/, '');
  const err = (msg) => errors.push(`${page} — ${msg}`);
  const warn = (msg) => warnings.push(`${page} — ${msg}`);

  const noindex = /<meta[^>]+name="robots"[^>]+noindex/i.test(html);

  /* 1. Adjacent sections sharing a background.
        Standing rule: consecutive bands must alternate, or they read as one
        oversized section with a floating heading in the middle. */
  const sectionTags = html.match(/<section\b[^>]*>/gi) ?? [];
  const kinds = sectionTags.map(bgKind);
  for (let i = 1; i < kinds.length; i++) {
    if (kinds[i] && kinds[i] === kinds[i - 1]) {
      err(`adjacent sections share a background (#${i} and #${i + 1} are both "${kinds[i]}")`);
    }
  }

  /* 2. Title / meta description length */
  const title = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!title) err('missing <title>');
  else {
    const t = decode(title[1]).trim();
    if (t.length > LIMITS.title) err(`title is ${t.length} chars (max ${LIMITS.title}): "${t}"`);
  }

  const descTag = html.match(/<meta[^>]+name="description"[^>]*>/i);
  if (!descTag) err('missing meta description');
  else {
    const d = decode(attr(descTag[0], 'content') ?? '').trim();
    if (!d) err('empty meta description');
    else if (d.length > LIMITS.description) {
      err(`meta description is ${d.length} chars (max ${LIMITS.description})`);
    }
  }

  /* 3. Exactly one H1 */
  const h1s = (html.match(/<h1\b/gi) ?? []).length;
  if (h1s !== 1) err(`expected exactly 1 <h1>, found ${h1s}`);

  /* 4. Canonical: present, absolute, trailing-slashed */
  const canonTag = html.match(/<link[^>]+rel="canonical"[^>]*>/i);
  if (!canonTag) err('missing canonical');
  else {
    const href = attr(canonTag[0], 'href') ?? '';
    if (!/^https?:\/\//.test(href)) err(`canonical is not absolute: ${href}`);
    else if (!href.endsWith('/') && !/\.[a-z0-9]+$/i.test(new URL(href).pathname)) {
      err(`canonical is not trailing-slashed: ${href}`);
    }
  }

  /* 5. Open Graph essentials */
  for (const prop of ['og:title', 'og:description', 'og:url', 'og:image']) {
    if (!new RegExp(`property="${prop}"`).test(html)) warn(`missing ${prop}`);
  }

  /* 6. Every <img> has an alt attribute (empty alt is fine for decoration) */
  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    if (!/\salt=/i.test(tag)) err(`<img> without alt: ${tag.slice(0, 90)}`);
  }

  /* 7. JSON-LD parses (and exists on indexable pages) */
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!ld.length && !noindex) warn('no JSON-LD schema');
  ld.forEach((m, i) => {
    try { JSON.parse(m[1]); }
    catch (e) { err(`JSON-LD block ${i + 1} is invalid: ${e.message}`); }
  });

  /* 8. Nothing render-blocking from Google Fonts (§5 / §7) */
  if (/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(html)) {
    err('references Google Fonts, which is render-blocking and leaks IPs');
  }
}

/* ---------- report ---------- */

console.log(`\nAudited ${files.length} page(s) in ${DIST}/\n`);
if (warnings.length) {
  console.log('WARNINGS');
  for (const w of warnings) console.log(`  ! ${w}`);
  console.log('');
}
if (errors.length) {
  console.log('ERRORS');
  for (const e of errors) console.log(`  ✗ ${e}`);
  console.log(`\n${errors.length} error(s). Fix before deploying.\n`);
  process.exit(1);
}
console.log(`✓ No errors${warnings.length ? ` (${warnings.length} warning(s))` : ''}.\n`);
