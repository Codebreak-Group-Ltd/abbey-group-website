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
  /* Latitude/longitude of the Skinner Street office. LEFT NULL DELIBERATELY:
     coordinates are the strongest single location signal an AI assistant reads,
     and a guessed pin would place Abbey on the wrong spot in an answer, which is
     worse than none. Fill from the Google Business Profile pin (open the GBP,
     "Edit profile" → the map marker gives the exact lat/lng) and the
     GeoCoordinates block in schema.ts appears automatically. Outstanding §C.
     Shape when set: `geo: { lat: 54.4863, lng: -0.6133 }`. */
  geo: null as { lat: number; lng: number } | null,
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
  /* The Home Care Plan terms are a separate binding consumer contract, not
     website terms, so they get their own page rather than being buried inside
     /terms/. */
  homecareTerms: '/homecare-plan-terms/',
  /* The boiler-draw prize terms, separate from the Home Care Plan contract
     terms above. First added 25 Aug 2026 at `/prize-draw-terms/` so the
     landing pages' "full terms" link had a real destination instead of an
     in-page promise to publish later; superseded the same day by the full
     numbered-clause version at `/lp/boiler-draw-terms/` (Josh's brief),
     which is noindex/chromeless like the campaign pages rather than a
     site-wide indexed legal page. The old path 301s here (netlify.toml). */
  drawTerms: '/lp/boiler-draw-terms/',
  cookies: '/cookies/',
  credits: '/credits/',
} as const;

/* ---- Primary navigation ----
   Order set by Josh, 30 July 2026: Renovations moves to the FOOT of the service
   list rather than the middle. It is the most expensive service and the least
   frequently searched, and sitting between Plumbing and Joinery made it read as
   one more trade in a row. Last in the list, after the everyday work, it reads
   as the top of the range. The trades run in the order people arrive on them:
   cover, then heating, then electrical, then building, then renovation. */
export const nav = [
  { label: 'Home', href: routes.home },
  { label: 'Homecare Plans', href: routes.homecare },
  { label: 'Plumbing & Heating', href: routes.plumbing },
  { label: 'Electrical', href: routes.electrical },
  { label: 'Building & Joinery', href: routes.joinery },
  { label: 'Renovations', href: routes.renovations },
  { label: 'About', href: routes.about },
  { label: 'Contact', href: routes.contact },
] as const;

// ---- Footer link groups ----
export const footerNav = {
  // Same order as `nav`, so the two lists never disagree.
  services: [
    { label: 'Homecare Plans', href: routes.homecare },
    { label: 'Plumbing & Heating', href: routes.plumbing },
    { label: 'Electrical', href: routes.electrical },
    { label: 'Building & Joinery', href: routes.joinery },
    { label: 'Renovations', href: routes.renovations },
  ],
  company: [
    { label: 'About', href: routes.about },
    { label: 'Reviews', href: routes.reviews },
    { label: 'Contact', href: routes.contact },
  ],
} as const;

// ---- Verified reviews (quoted verbatim, incl. punctuation — convention #8) ----
export type Review = { quote: string; name: string; source: string };

/* The full wall for /reviews/, grouped as the page copy groups them. Adds two
   fields the service-page sets do not need:
   - `year`: shown only where the master records an absolute date. The rest were
     recorded as "5 weeks ago" and so on, and a made-up year would be a fabricated
     detail on a page whose whole point is verifiability.
   - `stars`: true only for the Google reviews the master records as 5★. Facebook
     entries are "recommends", which carries no star rating, so they get a
     "Recommends" label instead of five invented stars.
   Amy has ruled out a live Google feed (a couple of lower reviews should not
   surface), so this curated set is what ships. */
export type WallReview = Review & { year?: string; stars?: boolean };

export const reviewWall: { heading: string; reviews: WallReview[] }[] = [
  {
    heading: 'Heating, boilers and plumbing',
    reviews: [
      {
        quote: 'A year on from Abbeygas fitting my boiler it was due a service. As was the boiler fitting the service was seamless from start to finish. Wonderful company to deal with, brilliant engineer and I am very grateful.',
        name: 'Dan McDermott', source: 'Google review', stars: true,
      },
      {
        quote: 'Excellent response when heating system not working, came within hours and carried out the repair. Engineer was friendly and cost was very reasonable.',
        name: 'Angela Weldon', source: 'Google review', year: '2025', stars: true,
      },
      {
        quote: 'As always reliable and efficient. They came within hours when I had no heating. They have a home plan that covers servicing and one callout per year taking the sting out of a big bill.',
        name: 'Angela', source: 'Google review', year: '2025', stars: true,
      },
      {
        quote: "Efficient and reliable as always. It's good to know that there is someone you can trust for anything central heating related.",
        name: 'Diana Mortimer', source: 'Google review', stars: true,
      },
      {
        quote: 'James from Abbey Gas fitted all our radiators and re-piped all upstairs. Really efficient from start to finish.',
        name: 'Danny Cowens', source: 'Google review', stars: true,
      },
      {
        quote: "Fantastic service, easy to communicate with, very helpful. Had a boiler fitted and couldn't have asked for a better smoother service, lovely fella who actually fitted the boiler and great service from start to finish.",
        name: 'Sally McDermott', source: 'Facebook',
      },
      {
        quote: 'We could not have been happier with Abbey Group who came to install a new boiler at very short notice. They were very professional, knowledgeable and were tidy workers too.',
        name: 'Susan Hodgson', source: 'Facebook',
      },
      {
        quote: "Did some work for us after our upstairs radiators wouldn't work. Turned up when they said they would and the work was carried out to a great standard, and when they left couldn't tell they had been. Apart from piping hot radiators.",
        name: 'Sonia Wood', source: 'Facebook',
      },
      {
        quote: 'Excellent service when we had a broken boiler. Thank you.',
        name: 'Charlotte Elizabeth', source: 'Facebook',
      },
    ],
  },
  {
    heading: 'Renovations, building and joinery',
    reviews: [
      {
        quote: 'What an AMAZING company Abbeygas of Whitby are, all the way from the owner, James.',
        name: 'Colin Robertson', source: 'Google review', stars: true,
      },
      {
        quote: 'James was excellent. Great price, even better than the quote! Jobs done cleanly and efficiently. Will definitely be using James again!',
        name: 'Karen', source: 'Facebook',
      },
      {
        /* The master's own text elides the middle of this one and then finishes
           the sentence, so it is quoted exactly as recorded, ellipsis included.
           Worth asking Amy for the untouched original. */
        quote: 'Very impressed!! You said you could fit us in in 2 days time. Then 10 minutes after you left, another van arrived... Two hours later the job was completed, efficiently and tidily.',
        name: 'Anne', source: 'Facebook',
      },
    ],
  },
  {
    heading: 'General and trust',
    reviews: [
      {
        quote: 'Timely, informative, helpful and a lovely fella. All business should be run like this.',
        name: 'Ann Mitchell', source: 'Google review', year: '2023', stars: true,
      },
      {
        quote: 'What a great team! Would I go anywhere else?',
        name: 'Robert Woodhouse', source: 'Google review', stars: true,
      },
      {
        quote: 'Rang Abbey Gas and got an appointment offered within 3 days of making an enquiry. It was a very positive experience.',
        name: 'Victoria Rylands', source: 'Google review', stars: true,
      },
      {
        quote: 'Very helpful and kind Engineer! Also I managed to get an appointment really quickly and they are very reasonably priced! Highly recommend.',
        name: 'Pip Strafford', source: 'Google review', stars: true,
      },
      {
        quote: 'James not only is a great plumber but a really nice guy.',
        name: 'Beverley Sabine', source: 'Google review', year: '2024', stars: true,
      },
      {
        quote: 'Highly recommend, professional and friendly.',
        name: 'Lesley Hampson', source: 'Google review', year: '2020', stars: true,
      },
      {
        quote: 'Very efficient and reliable service. Would certainly use again.',
        name: 'Karen Hartas', source: 'Google review', year: '2020', stars: true,
      },
    ],
  },
];

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
  {
    quote: 'James not only is a great plumber but a really nice guy.',
    name: 'Beverley Sabine', source: 'Google review',
  },
  {
    // Quoted verbatim, exclamation marks included: they are the customer's
    // words. Abbey's own copy stays exclamation-free.
    quote: "James was excellent. Great price, even better than the quote! Jobs done cleanly and efficiently. Will definitely be using James again!",
    name: 'Karen', source: 'Facebook',
  },
];

/* Homecare Plans — plan value first, then servicing and trust.
   Six reviews so the grid runs an even 3x2. */
export const homecareReviews: Review[] = [
  {
    quote: 'As always reliable and efficient. They came within hours when I had no heating. They have a home plan that covers servicing and one callout per year taking the sting out of a big bill.',
    name: 'Angela', source: 'Google review',
  },
  {
    quote: 'A year on from Abbeygas fitting my boiler it was due a service. As was the boiler fitting the service was seamless from start to finish. Wonderful company to deal with, brilliant engineer and I am very grateful.',
    name: 'Dan McDermott', source: 'Google review',
  },
  {
    quote: "Efficient and reliable as always. It's good to know that there is someone you can trust for anything central heating related.",
    name: 'Diana Mortimer', source: 'Google review',
  },
  {
    quote: 'Excellent response when heating system not working, came within hours and carried out the repair. Engineer was friendly and cost was very reasonable.',
    name: 'Angela Weldon', source: 'Google review',
  },
  {
    quote: 'Timely, informative, helpful and a lovely fella. All business should be run like this.',
    name: 'Ann Mitchell', source: 'Google review',
  },
  {
    quote: 'Very efficient and reliable service. Would certainly use again.',
    name: 'Karen Hartas', source: 'Google review',
  },
];

/* Renovations — the craft-and-tidiness themes a renovation buyer is vetting for.
   FOUR reviews, not six, since 30 July 2026: Colin Robertson moved out of this
   grid and onto the page as a display pull quote inside "How we work", the
   section his review is actually about, so he is not shown twice. Four divides
   into an even single row, and one large quote plus a quiet row of four reads
   more restrained than six cards, which is the direction of that whole page.
   Sally McDermott's went too: it is about a boiler fitting, the least relevant
   of the set, and dropping it kept the row even. All 19 remain on /reviews/. */
export const renovationsReviews: Review[] = [
  {
    quote: "James was excellent. Great price, even better than the quote! Jobs done cleanly and efficiently. Will definitely be using James again!",
    name: 'Karen', source: 'Facebook',
  },
  {
    quote: "Did some work for us after our upstairs radiators wouldn't work. Turned up when they said they would and the work was carried out to a great standard, and when they left couldn't tell they had been. Apart from piping hot radiators.",
    name: 'Sonia Wood', source: 'Facebook',
  },
  {
    quote: 'We could not have been happier with Abbey Group who came to install a new boiler at very short notice. They were very professional, knowledgeable and were tidy workers too.',
    name: 'Susan Hodgson', source: 'Facebook',
  },
  {
    quote: 'Timely, informative, helpful and a lovely fella. All business should be run like this.',
    name: 'Ann Mitchell', source: 'Google review',
  },
];

/* About — the three that name James personally, which is the point of that page.
   Linda Dent's master entry continues past this ("…a problem with our hive
   system has been a very testing time, but…"), so only her complete opening
   sentence is quoted. Three, so the grid runs an even single row. */
export const aboutReviews: Review[] = [
  {
    quote: 'James not only is a great plumber but a really nice guy.',
    name: 'Beverley Sabine', source: 'Google review',
  },
  {
    quote: 'Timely, informative, helpful and a lovely fella. All business should be run like this.',
    name: 'Ann Mitchell', source: 'Google review',
  },
  {
    quote: 'We have had first class service from James today.',
    name: 'Linda Dent', source: 'Google review',
  },
];

/* Electrical — no electrical-specific verified reviews exist yet, so these are
   the general trust ones, exactly as the page copy notes. Three, so the grid
   runs an even single row. Robert Woodhouse's entry in the master runs on after
   this ("…"), so only his two complete sentences are quoted, the same treatment
   Colin Robertson gets elsewhere on the site. */
export const electricalReviews: Review[] = [
  {
    quote: 'Timely, informative, helpful and a lovely fella. All business should be run like this.',
    name: 'Ann Mitchell', source: 'Google review',
  },
  {
    quote: 'What a great team! Would I go anywhere else?',
    name: 'Robert Woodhouse', source: 'Google review',
  },
  {
    quote: 'Very helpful and kind Engineer! Also I managed to get an appointment really quickly and they are very reasonably priced! Highly recommend.',
    name: 'Pip Strafford', source: 'Google review',
  },
];

/* Building & Joinery — the multi-trade project first, then price-against-quote
   and tidiness, which is what a joinery buyer is judging.
   Three reviews, so the grid runs a single even row of three.
   NOTE: the page copy listed Anne (Facebook) here, but her quote is truncated
   mid-sentence in the reviews master ("another van arrived..."), and only
   complete quotes go on the site (convention #8). Karen replaces her. */
export const joineryReviews: Review[] = [
  {
    quote: 'What an AMAZING company Abbeygas of Whitby are, all the way from the owner, James.',
    name: 'Colin Robertson', source: 'Google review',
  },
  {
    quote: "Did some work for us after our upstairs radiators wouldn't work. Turned up when they said they would and the work was carried out to a great standard, and when they left couldn't tell they had been. Apart from piping hot radiators.",
    name: 'Sonia Wood', source: 'Facebook',
  },
  {
    quote: "James was excellent. Great price, even better than the quote! Jobs done cleanly and efficiently. Will definitely be using James again!",
    name: 'Karen', source: 'Facebook',
  },
];

/* Plumbing & Heating — speed of response first, then installs and tidiness. */
export const plumbingReviews: Review[] = [
  {
    quote: 'Excellent response when heating system not working, came within hours and carried out the repair. Engineer was friendly and cost was very reasonable.',
    name: 'Angela Weldon', source: 'Google review',
  },
  {
    quote: 'We could not have been happier with Abbey Group who came to install a new boiler at very short notice. They were very professional, knowledgeable and were tidy workers too.',
    name: 'Susan Hodgson', source: 'Facebook',
  },
  {
    // Full verbatim text from the reviews master, including the opening clause
    // that earlier page copy had trimmed.
    quote: "Did some work for us after our upstairs radiators wouldn't work. Turned up when they said they would and the work was carried out to a great standard, and when they left couldn't tell they had been. Apart from piping hot radiators.",
    name: 'Sonia Wood', source: 'Facebook',
  },
  {
    quote: "Fantastic service, easy to communicate with, very helpful. Had a boiler fitted and couldn't have asked for a better smoother service, lovely fella who actually fitted the boiler and great service from start to finish.",
    name: 'Sally McDermott', source: 'Facebook',
  },
  {
    quote: 'Excellent service when we had a broken boiler. Thank you.',
    name: 'Charlotte Elizabeth', source: 'Facebook',
  },
  {
    quote: 'James not only is a great plumber but a really nice guy.',
    name: 'Beverley Sabine', source: 'Google review',
  },
];
