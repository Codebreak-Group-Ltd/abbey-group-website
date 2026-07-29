/* =====================================================================
   Abbey Group — site-wide data (single source of truth).
   NAP, nav, socials, ServiceM8 booking links, verified reviews, areas.
   Content from `_Global/Header Footer` + page copy files. Confirmed values
   only (build standard §3 / §4 — NAP identical everywhere for local SEO).
   ===================================================================== */

export const site = {
  name: 'Abbey Group',
  legalName: 'Abbey Gas (Whitby) Limited',
  tradingAs: 'Abbey Group',
  companyNo: '08134722',
  registeredIn: 'England & Wales',
  domain: 'https://abbeygroup.uk',
  positioning: "Whitby's one-stop home services team. One number, every trade, done properly.",
  gasSafeNo: '303376',
} as const;

export const nap = {
  addressLine: '20 Skinner Street',
  locality: 'Whitby',
  region: 'North Yorkshire',
  postcode: 'YO21 3AJ',
  addressFull: '20 Skinner Street, Whitby, North Yorkshire, YO21 3AJ',
  phone: { label: '01947 821 374', tel: '+441947821374' },
  mobile: { label: '07769 702 525', tel: '+447769702525' },
  email: 'office@abbeygroup.uk',
  // Mon–Fri office hours; phone lines take messages 24/7 (not a callout guarantee).
  hours: 'Monday to Friday, 9am to 5pm',
} as const;

export const ratings = {
  google: { value: 4.6, count: 19 },
  facebook: { recommend: 100, count: 7 },
  googleReviewLink: 'https://g.page/r/CTpQsMq6apceEAI/review',
} as const;

export const social = {
  facebook: 'https://www.facebook.com/Abbeygas',
  instagram: 'https://www.instagram.com/abbey_group',
} as const;

// Villages Abbey covers — feeds `areaServed` schema + areas blocks.
export const areasServed = [
  'Whitby', 'Sandsend', 'Sleights', 'Ruswarp', "Robin Hood's Bay",
  'Egton', 'Egton Bridge', 'Goathland', 'Staithes', 'Runswick Bay', 'Scarborough',
] as const;

// ---- ServiceM8 booking links (confirmed by Amy, 27 July 2026) ----
const SM8 = 'https://book.servicem8.com/request_service_booking?strVendorUUID=84ab4569-89c3-4648-b794-2186819424eb';
export const booking = {
  main: SM8,
  boilerService: `${SM8}#8dc9a474-3b99-42c7-917c-2245195fd18b`,
  quote: `${SM8}#11d4612f-b653-4caf-b018-22451c24af1b`,
  landlordGasSafety: `${SM8}#d72f6d42-6190-46b4-9621-2245198f5f0b`,
} as const;

// ---- Routes (trailing-slash canon) ----
export const routes = {
  home: '/',
  homecare: '/homecare-plans/',
  plumbing: '/plumbing-heating/',
  renovations: '/renovations/',
  joinery: '/building-joinery/',
  electrical: '/electrical/',
  about: '/about/',
  contact: '/contact/',
  book: '/book-online/',
  reviews: '/reviews/',
  privacy: '/privacy/',
  terms: '/terms/',
  credits: '/credits/',
} as const;

// ---- Primary navigation ----
export const nav = [
  { label: 'Home', href: routes.home },
  { label: 'Homecare Plans', href: routes.homecare },
  { label: 'Plumbing & Heating', href: routes.plumbing },
  { label: 'Renovations', href: routes.renovations },
  { label: 'Building & Joinery', href: routes.joinery },
  { label: 'Electrical', href: routes.electrical },
  { label: 'About', href: routes.about },
  { label: 'Contact', href: routes.contact },
] as const;

// ---- Footer link groups ----
export const footerNav = {
  services: [
    { label: 'Homecare Plans', href: routes.homecare },
    { label: 'Plumbing & Heating', href: routes.plumbing },
    { label: 'Renovations', href: routes.renovations },
    { label: 'Building & Joinery', href: routes.joinery },
    { label: 'Electrical', href: routes.electrical },
  ],
  company: [
    { label: 'About', href: routes.about },
    { label: 'Reviews', href: routes.reviews },
    { label: 'Contact', href: routes.contact },
  ],
} as const;

// ---- Verified reviews (quoted verbatim, incl. punctuation — convention #8) ----
export type Review = { quote: string; name: string; source: string };

export const homeReviews: Review[] = [
  {
    quote: 'What an AMAZING company Abbeygas of Whitby are, all the way from the owner, James.',
    name: 'Colin Robertson', source: 'Google review',
  },
  {
    quote: 'As always reliable and efficient. They came within hours when I had no heating. They have a home plan that covers servicing and one callout per year taking the sting out of a big bill.',
    name: 'Angela', source: 'Google review',
  },
  {
    quote: 'We could not have been happier with Abbey Group who came to install a new boiler at very short notice. They were very professional, knowledgeable and were tidy workers too.',
    name: 'Susan Hodgson', source: 'Facebook',
  },
  {
    quote: 'Very helpful and kind Engineer! Also I managed to get an appointment really quickly and they are very reasonably priced! Highly recommend.',
    name: 'Pip Strafford', source: 'Google review',
  },
  {
    quote: 'Timely, informative, helpful and a lovely fella. All business should be run like this.',
    name: 'Ann Mitchell', source: 'Google review',
  },
  {
    quote: "Fantastic service, easy to communicate with, very helpful. Had a boiler fitted and couldn't have asked for a better smoother service, lovely fella who actually fitted the boiler and great service from start to finish.",
    name: 'Sally McDermott', source: 'Facebook',
  },
];
