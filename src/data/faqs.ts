/* =====================================================================
   Abbey Group — the FAQ sets, in ONE place.

   Every page's FAQ array used to live inside that page's frontmatter. They are
   now here because THREE things consume the same text and must never disagree:

     1. the page itself,
     2. that page's FAQPage JSON-LD,
     3. `/llms.txt`, the index AI assistants read (build standard §4).

   A question answered one way on the page and another way in llms.txt is worse
   than not shipping llms.txt at all, so there is one source. Moved 30 July 2026;
   the text is the client-approved copy, unchanged.

   WRITING RULE (AEO/GEO): the FIRST SENTENCE of every answer must stand alone as
   the complete answer. Assistants lift one or two sentences, not paragraphs, so
   an answer that builds to its point does not get cited. Detail goes after.
   ===================================================================== */

export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  {
    q: 'Is there one company in Whitby that does plumbing, electrical and building work?',
    a: 'Yes. Abbey Group is a Whitby firm that covers boiler cover, plumbing and heating, renovations, building and joinery, and electrical work, all from one local team. You deal with one number for the whole job rather than chasing separate trades.',
  },
  {
    q: 'What areas around Whitby do you cover?',
    a: "We cover Whitby and the surrounding coast and villages, including Sandsend, Sleights, Ruswarp, Robin Hood's Bay, Egton and Egton Bridge, Goathland, Staithes and Runswick Bay, as well as Scarborough. If you are nearby and not sure, ask, we're always happy to help.",
  },
  {
    q: 'Is Abbey Group the same company as Abbeygas?',
    a: 'Yes. Abbey Group is the same local team many people in Whitby know as Abbeygas.',
  },
  {
    q: 'Are your engineers Gas Safe registered?',
    a: 'Yes. Abbey Group is Gas Safe registered under number 303376. Any gas work is carried out by a Gas Safe engineer, which is a legal requirement for work on boilers and gas appliances.',
  },
];

export const homecareFaqs: Faq[] = [
  { q: 'How much does boiler cover cost per month?', a: 'Abbey Group boiler cover starts at £9.99 a month for our Service Care plan. That is below what the big national cover providers charge for comparable annual cover, and some of their plans rise sharply after the first year. With us the price stays fair, and it is set by a local team rather than a national call centre.' },
  { q: 'Is boiler cover worth it?', a: 'A single boiler call-out usually starts at over £100, and most home insurance will not cover a breakdown. Cover is worth it if you would rather pay a small fixed amount each month than face a surprise bill, and if you want your annual service handled without having to remember it. For landlords and holiday-let owners, it also keeps the yearly certificate and paperwork sorted.' },
  { q: 'How often should a boiler be serviced?', a: 'Once a year. An annual service keeps most manufacturer warranties valid, catches small faults before they turn expensive, and keeps the boiler running safely and efficiently. Every Abbey Group plan includes that yearly service, so it is booked in and handled for you.' },
  { q: 'What is included in a boiler cover plan?', a: 'Every plan includes a full boiler service, a gas safety certificate, flue gas analysis, a heating filter clean, a balance of your radiators and a heating health check, with priority response and one free call-out. Higher plans add parts and labour cover and unlimited call-outs. The full breakdown is in the comparison table above.' },
  { q: 'Does boiler cover include landlord gas safety certificates?', a: 'Yes. Our Landlord Care plan at £13.99 a month bundles the annual gas safety certificate landlords are legally required to hold, alongside the full boiler service. Your certification stays current without a separate booking each year. If you only need a one-off certificate, see our Plumbing & Heating page.' },
  { q: 'Can I cancel my boiler cover plan anytime?', a: 'Yes. There is no minimum contract and no cancellation fee, so you can cancel at any time by emailing or writing to us. If you cancel within the first 14 days and we have not yet carried out any work or a service, you get a full refund. After that, the plan spreads your annual service across the year, so if you cancel before your next service we cannot refund payments already made or carry out that service. Full terms are in your Homecare plan agreement.' },
  { q: 'Do you cover holiday lets and second homes?', a: 'Yes, though the cover depends on how the property is used. A holiday let is treated as a rental, so it needs a Landlord Gas Safety Certificate, priced at £162. Guest houses and B&Bs normally fall under our Ultimate Commercial Cover, priced from £74.99 a month after a site inspection, though this depends on the size and number of appliances.' },
  { q: 'What is the difference between a one-off boiler service and a boiler cover plan?', a: 'A one-off boiler service is a single visit you book and pay for each time, usually around £96. A boiler cover plan spreads that yearly service across monthly payments and adds priority response, call-outs and discounts on other work. If you just need a single service or repair, see our Plumbing & Heating page.' },
];

export const plumbingFaqs: Faq[] = [
  { q: 'How much does an emergency plumber cost in Whitby?', a: 'Emergency call-outs in the area typically run from around £120 to £230, depending on the time of day and how complex the job is. We will always be straight with you about the cost before we start, so there are no surprises on the bill.' },
  { q: 'How long does a boiler installation take?', a: 'A straightforward boiler swap usually takes a day. A bigger job, such as moving the boiler, changing fuel type or upgrading the whole system, can take two to three days. We give you a clear timescale with your quote so you know what to expect.' },
  { q: 'Can I get LPG heating in a rural property near Whitby?', a: 'Yes. Many homes on the coast and moors are off the gas grid, and we install and service LPG boilers and heating for them. We work with Calor for LPG supply, so we can sort both the system and the fuel side.' },
  { q: 'What is the difference between a boiler service and a boiler cover plan?', a: 'A boiler service is a single visit you book and pay for each time, usually around £96. A boiler cover plan spreads your annual service across monthly payments and adds priority response and call-outs. If you want ongoing cover rather than a one-off visit, see our Homecare Plans page.' },
];

export const electricalFaqs: Faq[] = [
  {
    q: 'How often do I need an EICR as a landlord?',
    a: "As a landlord, you must have an EICR carried out at least every five years, and on a change of tenancy. The report checks that the property's fixed wiring is safe. We carry out the inspection, issue the certificate, and flag anything that needs putting right. An EICR is £350 plus VAT (£420).",
  },
  {
    q: 'Are your electricians certified?',
    a: 'Yes. Our electricians are NAPIT registered and City & Guilds qualified, and our electrical work is signed off to the current wiring regulations. NAPIT registration means we can self-certify that electrical work meets Building Regulations Part P.',
  },
  {
    q: 'Do you install EV chargers?',
    a: 'Yes, we install home EV charge points, fitted safely and certified. The price depends on your property and the charger, so we quote it after a quick look.',
  },
  {
    q: 'How quickly can an emergency electrician come out in Whitby?',
    a: 'Our line is open 24 hours a day, so you can always get through and leave a message. A real local person takes your call and we get to you as quickly as we can, with urgent jobs prioritised. The office is open Monday to Friday, 9am to 5pm.',
  },
  {
    q: 'Do you do electrical work for holiday lets and rental properties?',
    a: 'Yes. We carry out electrical work, safety inspections and EICR reports for holiday lets, rental properties and second homes, so your property stays safe and compliant for guests and tenants.',
  },
];

export const renovationsFaqs: Faq[] = [
  {
    q: 'Do you project manage the whole renovation?',
    a: 'Yes. One team manages the job from first drawing to final clean, with a single point of contact and trades that arrive in the right order. You are not left chasing separate contractors or working out what happens next.',
  },
  {
    q: 'Can you renovate a holiday let without disrupting bookings?',
    a: 'Yes. We plan holiday-let and second-home renovations around your booking calendar, working to agreed dates so the property is ready for guests. Bring your key dates to the consultation and we build the programme around them.',
  },
  {
    q: 'Do you use local materials for renovations?',
    a: 'Yes. We source a lot of our materials locally, including worktops from Sparkle Granite in Guisborough and building materials from MKM in Whitby, alongside recognised brands like Worcester Bosch, Ideal and Nu-Heat. You get quality you can trust rather than generic materials marked up.',
  },
  {
    q: 'How long does a home renovation take?',
    a: 'It depends on the size and spec. As a rough guide, a bathroom usually takes one to two weeks, a kitchen two to four weeks, and a larger extension or whole-house renovation several months. We give you a clear programme with your quote so you know what to expect.',
  },
];

export const joineryFaqs: Faq[] = [
  {
    q: 'What is bespoke joinery?',
    a: 'Bespoke joinery is woodwork designed and made to measure for a specific space, rather than bought off the shelf. Each piece is built to fit the room and the way you use it, from the timber up. It costs more than flat-pack, and it fits properly and lasts far longer.',
  },
  {
    q: 'Do you make custom staircases and fitted wardrobes?',
    a: 'Yes. We design and build custom staircases, fitted wardrobes and made-to-measure furniture for your space. Because each piece is built for the room it goes in, it fits properly and lasts, rather than being forced to work around a standard size.',
  },
  {
    q: 'What materials do you use for bespoke joinery?',
    a: 'We use quality timber and materials, much of it sourced locally from Whitby suppliers like MKM, with flooring from Fletcher & Woodhouse. Sourcing locally means we know where the materials come from and can choose the right timber for each job.',
  },
  {
    q: 'Is structural building work covered by building regulations?',
    a: 'Yes. Structural work, such as removing walls or altering the structure of a building, must meet current building regulations. We carry the work out to those standards, and it is inspected and signed off by building control.',
  },
];

export const aboutFaqs: Faq[] = [
  {
    q: 'How long has Abbey Group been established?',
    a: 'Abbey Group has served Whitby since 2008, when James Eddon started the business as Abbey Gas. It grew into a full multi-trade group and became Abbey Group in 2024.',
  },
  {
    q: 'Who runs Abbey Group?',
    a: 'Abbey Group was founded by James Eddon, who still runs the work on the ground, with Amy managing operations and a full-time local team across every trade. You deal with the same local people, not a chain or a franchise.',
  },
  {
    q: "Are Abbey Group's tradesmen certified?",
    a: 'Yes. Abbey Group is Gas Safe registered under number 303376, our tradespeople are City & Guilds qualified, and our electrical work is NAPIT registered and signed off to the current wiring regulations.',
  },
  {
    q: 'What is the relationship between Abbey Group and Abbeygas?',
    a: 'Abbey Group is the same local team many people in Whitby know as Abbeygas, now covering more than plumbing and heating.',
  },
];

export const contactFaqs: Faq[] = [
  {
    q: 'Can I book a plumber online with Abbey Group?',
    a: 'Yes. You can book a visit online in a couple of minutes on our Book Online page: choose the job and a time that suits you, and a real local person picks it up from there. If you would rather talk first, call 01947 821 374.',
  },
  {
    q: "What are Abbey Group's opening hours?",
    a: 'Our office is open Monday to Friday, 9am to 5pm. The phone line is open 24 hours a day so you can leave a message, and you can book online or send an enquiry any time.',
  },
  {
    q: 'How do I contact Abbey Group in an emergency?',
    a: 'Call the office on 01947 821 374. The line is open 24 hours a day, so you can always get through and leave a message. For a broken boiler or no heating see our Plumbing & Heating page, and for an electrical fault see Electrical.',
  },
  {
    q: 'How quickly will someone get back to me?',
    a: 'We answer the phone whenever we can. If we are with a customer, we return your call straight away once we are free, within working hours. Online enquiries and bookings are picked up quickly too.',
  },
];

/* ---------------------------------------------------------------------
   OBJECTIONS — the paid-traffic landing page, `/lp/homecare/`.

   Four questions the site page does not answer anywhere, and each is a real
   reason someone does not sign up. Every one is drawn from Abbey's own terms
   (the January 2026 brochure, Section 2), so nothing here is invented:

   - the ten-year rule is T&C 2.1(a)(vi) and 2.5(e), the same gate the plan
     picker runs on. It is already baked into that tool's logic but appears in no
     copy on the site, so a visitor can be routed to Service Care without ever
     being told why;
   - the exclusions are T&C 2.3(a);
   - the 14-day claims wait and the separate 14-day cooling-off period are two
     different fortnights that get confused constantly, so they are stated
     together on purpose.

   The framing rule throughout: lead with the yes, state the limit plainly, end
   on what the customer still gets. Competitors bury this; saying it out loud is
   a trust asset on a page asking a stranger for a monthly direct debit.

   DELIBERATELY NOT IN `allFaqs` BELOW. `/lp/` is noindex and excluded from the
   sitemap, so publishing a `/lp/` path in `/llms.txt` would point assistants at
   a page built for ad traffic instead of the page built to rank.

   WORTH DOING LATER (Josh, 3 August 2026 — "LP only for now, however it is maybe
   worth making a note here"): the first three belong on `/homecare-plans/` too,
   where they would also flow into that page's FAQPage schema and llms.txt, which
   is where the AEO value actually sits. That edits approved copy, so it needs
   James and Amy to re-proof first.
   --------------------------------------------------------------------- */
export const homecareLpObjections: Faq[] = [
  {
    q: 'My boiler is fifteen years old. Will you cover it?',
    a: 'Yes, on Service Care. The annual service, the gas safety certificate and priority response all apply whatever the age of your boiler. Parts cover on Service Care+ is for boilers under ten years old, so if yours is older, Service Care still gets it serviced, certified and looked after. We are simply not able to underwrite parts on a boiler that age.',
  },
  {
    q: 'Is there anything you will not cover?',
    a: 'Two things are worth knowing up front: faults that arise in the first 14 days of the plan are not covered, and neither is anything already broken when you join, unless it is a product we installed and have maintained since. Everything else is set out in the plan terms in plain English, and we would rather you read them than be surprised later.',
  },
  {
    q: 'How quickly can I claim after joining?',
    a: 'Cover starts working 14 days after you join. That is standard across the industry and it is there to stop people signing up on the morning the boiler fails. Separately, you have 14 days from joining to change your mind and get a full refund. Two different fortnights, and it is worth keeping them straight.',
  },
  {
    q: 'What actually happens after I get in touch?',
    a: 'We ring you back, confirm which plan fits and book your first service. That first visit is also the check that everything is in working order. If something is wrong we will tell you straight and talk through the options before anything is committed.',
  },
];

/* What the LP renders: the objections first, then the client-approved set from
   the site page. Objections lead because this is cold traffic — someone who was
   not thinking about their boiler ten minutes ago needs the catch answered
   before the detail is any use to them. */
export const homecareLpFaqs: Faq[] = [...homecareLpObjections, ...homecareFaqs];

/* Every set, so `/llms.txt` can walk them all without importing eight names. */
export const allFaqs: { page: string; path: string; faqs: Faq[] }[] = [
  { page: 'Home', path: '/', faqs: homeFaqs },
  { page: 'Homecare Plans', path: '/homecare-plans/', faqs: homecareFaqs },
  { page: 'Plumbing & Heating', path: '/plumbing-heating/', faqs: plumbingFaqs },
  { page: 'Electrical', path: '/electrical/', faqs: electricalFaqs },
  { page: 'Renovations', path: '/renovations/', faqs: renovationsFaqs },
  { page: 'Building & Joinery', path: '/building-joinery/', faqs: joineryFaqs },
  { page: 'About', path: '/about/', faqs: aboutFaqs },
  { page: 'Contact', path: '/contact/', faqs: contactFaqs },
];
