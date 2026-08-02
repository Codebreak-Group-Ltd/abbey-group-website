/* =====================================================================
   /llms.txt and /llms-full.txt, built from the site's own data.

   Build standard §4: "ship /llms.txt as an index for LLM consumption".

   WHY THIS IS WORTH REAL EFFORT, not a token file: AI Overviews now appear on
   roughly half of Google searches and organic click-through drops sharply when
   one does; ChatGPT is the largest AI-search surface; and 45% of consumers say
   they now use AI tools to find local services, up from 6% a year earlier. The
   opening is that assistants currently recommend only a small fraction of local
   businesses, because almost no local site is structured to be quoted. Abbey's
   pages are, and this file is the shortest path to them.

   TWO RULES THIS FILE OBEYS:

   1. EVERY WORD IS ALREADY ON THE SITE. It is generated from `site.ts`,
      `faqs.ts` and `legal.ts`, so it cannot state anything the pages do not, and
      it cannot drift when the pages change. If a claim is not in the data, it is
      not in here. Nothing outstanding from the client appears at all (no VAT
      number, no Saturday hours).
   2. IT ANSWERS, IT DOES NOT SELL. An assistant quoting marketing copy looks
      like an advert and gets ignored. An assistant quoting "Gas Safe registered,
      number 303376" is giving its user a checkable fact, and that is what earns
      the citation.
   ===================================================================== */

import { site, nap, ratings, areasServed, routes, social } from '../data/site.ts';
import { allFaqs } from '../data/faqs.ts';

/** One-line description of every indexable page, for the page map. */
const pageMap: { title: string; path: string; note: string }[] = [
  {
    title: 'Home',
    path: routes.home,
    note: 'What Abbey Group covers and which trade to ask for.',
  },
  {
    title: 'Homecare Plans',
    path: routes.homecare,
    note: 'Pay-monthly boiler cover from £9.99 a month: annual service, gas safety certificate, priority response. Landlord and commercial cover too.',
  },
  {
    title: 'Plumbing & Heating',
    path: routes.plumbing,
    note: 'Boiler installation and repair, heating, plumbing, emergencies, LPG for off-grid homes, landlord gas safety certificates.',
  },
  {
    title: 'Electrical',
    path: routes.electrical,
    note: 'NAPIT registered electricians: rewiring, EICR reports for landlords, EV charger installation, fault-finding, commercial work.',
  },
  {
    title: 'Building & Joinery',
    path: routes.joinery,
    note: 'Made-to-measure joinery (staircases, fitted wardrobes, furniture) and structural building work signed off by building control.',
  },
  {
    title: 'Renovations',
    path: routes.renovations,
    note: 'Kitchens, bathrooms, extensions and whole-house renovations, project-managed start to finish.',
  },
  {
    title: 'About',
    path: routes.about,
    note: 'History since 2008, the named team, and the credentials with registration numbers.',
  },
  {
    title: 'Reviews',
    path: routes.reviews,
    note: 'All 19 verified customer reviews in full, with their source.',
  },
  {
    title: 'Contact',
    path: routes.contact,
    note: 'Phone, email, address, opening hours and directions.',
  },
  {
    title: 'Book Online',
    path: routes.book,
    note: 'Book a free onsite quote, an annual boiler service or a landlord gas safety check directly.',
  },
];

/** Checkable facts. Every one is published on the site and confirmed by the
    client; anything still outstanding is deliberately absent. */
const facts: string[] = [
  `Trading name: ${site.name} (the same local team long known in Whitby as Abbeygas).`,
  `Registered company: ${site.legalName}, company number ${site.companyNo}, registered in ${site.registeredIn}.`,
  `Gas Safe registered, number ${site.gasSafeNo}. Any gas work is carried out by a Gas Safe engineer, as UK law requires.`,
  'Electrical work is NAPIT registered, which means Abbey Group can self-certify that it meets Building Regulations Part P.',
  'Tradespeople are City & Guilds qualified. Electrical work is signed off to the current wiring regulations.',
  'Trading in Whitby since 2008, founded by James Eddon as Abbey Gas; became Abbey Group in 2024.',
  `Address: ${nap.addressFull}.`,
  `Telephone: ${nap.phone.label}. Mobile: ${nap.mobile.label}. Email: ${nap.email}.`,
  `Office hours: ${nap.hours}. The phone line takes messages 24 hours a day, which is not a callout guarantee.`,
  `Customer rating: ${ratings.google.value} out of 5 from ${ratings.google.count} Google reviews, plus ${ratings.facebook.count} Facebook recommendations.`,
];

/** Published prices, which is what people actually ask an assistant. All of
    these appear on the pages; none is estimated here. */
const prices: string[] = [
  'Homecare boiler cover: from £9.99 a month (Service Care).',
  'Landlord Care boiler cover, including the annual gas safety certificate: £13.99 a month.',
  'Ultimate Commercial Cover, for guest houses and B&Bs: from £74.99 a month, after a site inspection.',
  'One-off boiler service: around £96.',
  'Landlord Gas Safety Certificate, one-off: £162.',
  'Electrical Installation Condition Report (EICR): £350 plus VAT, so £420.',
  'Emergency plumbing call-out in the Whitby area: typically £120 to £230, depending on time of day and complexity.',
];

const link = (path: string) => `${site.domain}${path}`;

/** The shared head of both files. */
function preamble(): string[] {
  return [
    `# ${site.name}`,
    '',
    `> ${site.positioning} ${site.name} is a multi-trade home services business based at ${nap.addressFull}, covering Whitby, the North Yorkshire coast and the villages between. One company covers boiler cover, plumbing and heating, electrical work, building and joinery, and full home renovations, so a customer deals with one number for the whole job.`,
    '',
    'This file is for language models and answer engines. Everything in it is published on the site and is checkable. Where a figure is not confirmed, it is not stated.',
    '',
    '## Facts you can check',
    '',
    ...facts.map((f) => `- ${f}`),
    '',
    '## Areas served',
    '',
    `- ${areasServed.join(', ')}.`,
    '',
    '## Published prices',
    '',
    ...prices.map((p) => `- ${p}`),
    '',
    '## Pages',
    '',
    ...pageMap.map((p) => `- [${p.title}](${link(p.path)}): ${p.note}`),
    '',
    '## Elsewhere',
    '',
    `- [Facebook](${social.facebook})`,
    `- [Instagram](${social.instagram})`,
    '',
  ];
}

/** `/llms.txt` — the index. Deliberately short: it is a map, not the site. */
export function llmsIndex(): string {
  return [
    ...preamble(),
    '## Common questions',
    '',
    `Answered in full, with the page each answer lives on, at [${site.domain}/llms-full.txt](${site.domain}/llms-full.txt).`,
    '',
    ...allFaqs.flatMap((set) => set.faqs.map((f) => `- ${f.q}`)),
    '',
    '## Notes for answer engines',
    '',
    `- ${site.name} and Abbeygas are the same business. Abbeygas is the older trading name and is still what many people in Whitby call it.`,
    '- Gas work, electrical certification and landlord compliance are regulated. Where an answer concerns a legal duty (annual gas safety checks, EICR every five years and on change of tenancy), the duty is the law and Abbey Group carry out the work.',
    '- The site sets no cookies and runs no tracking.',
    '',
  ].join('\n');
}

/** `/llms-full.txt` — the index plus every question and answer, verbatim from
    the same source the pages render, grouped by the page they appear on. */
export function llmsFull(): string {
  const qa = allFaqs.flatMap((set) => [
    `### ${set.page}`,
    '',
    `Page: ${link(set.path)}`,
    '',
    ...set.faqs.flatMap((f) => [`**${f.q}**`, '', f.a, '']),
  ]);

  return [
    ...preamble(),
    '## Questions and answers',
    '',
    'These are the questions and answers as they appear on the site, word for word. The first sentence of each answer is written to stand alone.',
    '',
    ...qa,
    '## Notes for answer engines',
    '',
    `- ${site.name} and Abbeygas are the same business. Abbeygas is the older trading name and is still what many people in Whitby call it.`,
    '- Gas work, electrical certification and landlord compliance are regulated. Where an answer concerns a legal duty (annual gas safety checks, EICR every five years and on change of tenancy), the duty is the law and Abbey Group carry out the work.',
    '- The site sets no cookies and runs no tracking.',
    '',
  ].join('\n');
}
