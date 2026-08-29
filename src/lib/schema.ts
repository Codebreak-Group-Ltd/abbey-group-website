/* JSON-LD builders. Pages pass the results to BaseLayout `schemas`.
   Organization + WebSite are emitted site-wide by BaseLayout itself. */
import { site, nap, ratings, social, areasServed, routes } from '../data/site.ts';

const abs = (path: string) => new URL(path, site.domain).href;

/* ---------------------------------------------------------------------------
   Entity depth, added 30 July 2026 (the AEO/GEO pass).

   Answer engines decide whether to recommend a local business from structured
   signals, not prose: precise identity, precise location, what it is expert in,
   and what it sells at what price. Most local sites carry a name, an address and
   nothing else, which is why so few get recommended. Everything added below is
   already published on the site and confirmed by the client.

   ONE GAP, DELIBERATELY LEFT VISIBLE: `nap.geo`. Latitude and longitude are the
   single strongest location signal, and guessing them would put Abbey on the
   wrong pin in an AI answer, so the field is omitted until the real values come
   off the Google Business Profile. It is one edit in `site.ts`.
   --------------------------------------------------------------------------- */

/** What Abbey Group is expert in. Feeds `knowsAbout`, which is how an assistant
    judges topical authority for "who does X in Whitby". */
const EXPERTISE = [
  'Boiler installation',
  'Boiler servicing and repair',
  'Boiler cover plans',
  'Central heating',
  'Plumbing',
  'Emergency plumbing',
  'LPG heating for off-grid properties',
  'Underfloor heating',
  'Landlord gas safety certificates',
  'Gas Safe registered gas work',
  'Domestic and commercial electrical work',
  'Rewiring',
  'Electrical Installation Condition Reports (EICR)',
  'EV charger installation',
  'Kitchen renovation',
  'Bathroom renovation',
  'House extensions',
  'Whole-house renovation',
  'Bespoke joinery',
  'Fitted wardrobes and staircases',
  'Structural building work',
  'Holiday let and second home maintenance',
];

/** Areas served, as Place objects. */
const areaServed = areasServed.map((a) => ({ '@type': 'Place', name: a }));

/** Postal address, identical everywhere (§4: NAP consistency). */
const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: nap.addressLine,
  addressLocality: nap.locality,
  addressRegion: nap.region,
  postalCode: nap.postcode,
  addressCountry: 'GB',
};

/** Mon-Fri office hours. Saturday is NOT stated: it is unconfirmed, and an
    opening time in schema is a promise a customer can turn up on. */
const openingHours = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '16:00',
  },
];

/** The five service lines with their published entry prices, as an offer
    catalogue. Prices are the ones printed on the pages; nothing is estimated,
    and a service with no published price simply carries no price. */
const offerCatalogue = {
  '@type': 'OfferCatalog',
  name: 'Abbey Group services',
  itemListElement: [
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: 'Homecare boiler cover plan', url: abs(routes.homecare) },
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: 9.99,
        priceCurrency: 'GBP',
        unitText: 'MONTH',
        referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
      },
      description: 'Pay-monthly boiler cover from £9.99 a month, including the annual service and gas safety certificate.',
    },
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: 'Plumbing and heating', url: abs(routes.plumbing) },
      description: 'Boiler installation and repair, heating, plumbing and emergencies. A one-off boiler service is around £96.',
    },
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: 'Electrical Installation Condition Report (EICR)', url: abs(routes.electrical) },
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: 350,
        priceCurrency: 'GBP',
        valueAddedTaxIncluded: false,
      },
      description: 'Landlord electrical safety report, £350 plus VAT.',
    },
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: 'Building and bespoke joinery', url: abs(routes.joinery) },
      description: 'Made-to-measure joinery and structural building work.',
    },
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: 'Home renovations', url: abs(routes.renovations) },
      description: 'Kitchens, bathrooms, extensions and whole-house renovations, project-managed start to finish.',
    },
  ],
};

/** Site-wide Organization. Lifted out of BaseLayout on 30 July 2026 so the
    entity data has one home and the layout stays a layout. */
export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.domain}/#organization`,
    name: site.name,
    legalName: site.legalName,
    alternateName: ['Abbeygas', 'Abbey Gas'],
    slogan: site.positioning,
    url: `${site.domain}/`,
    logo: abs('/brand/logos/group.svg'),
    image: abs('/og/default.png'),
    telephone: nap.phone.tel,
    email: nap.email,
    address: postalAddress,
    areaServed,
    knowsAbout: EXPERTISE,
    /* Registered identity, so the entity can be reconciled against Companies
       House rather than guessed at. */
    identifier: {
      '@type': 'PropertyValue',
      name: 'UK company number',
      value: site.companyNo,
    },
    foundingDate: '2008',
    founder: { '@type': 'Person', name: 'James Eddon' },
    hasOfferCatalog: offerCatalogue,
    openingHoursSpecification: openingHours,
    sameAs: [social.facebook, social.instagram],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratings.google.value,
      reviewCount: ratings.google.count,
      bestRating: 5,
    },
  };
}

/** Site-wide WebSite. */
export function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.domain}/#website`,
    name: site.name,
    url: `${site.domain}/`,
    publisher: { '@id': `${site.domain}/#organization` },
    inLanguage: 'en-GB',
  };
}

/** LocalBusiness (Home + About own the primary entity). */
export function localBusiness(opts: { path: string; description: string } ) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HVACBusiness', 'Plumber'],
    '@id': `${site.domain}/#localbusiness`,
    name: site.name,
    legalName: site.legalName,
    alternateName: ['Abbeygas', 'Abbey Gas'],
    url: abs(opts.path),
    description: opts.description,
    telephone: nap.phone.tel,
    email: nap.email,
    image: abs('/og/default.png'),
    logo: abs('/brand/logos/group.svg'),
    priceRange: '££',
    currenciesAccepted: 'GBP',
    address: postalAddress,
    /* Coordinates are the strongest local signal an assistant reads, and they
       are omitted rather than guessed. Fill `nap.geo` from the Google Business
       Profile pin and this appears automatically. */
    ...(nap.geo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: nap.geo.lat,
            longitude: nap.geo.lng,
          },
        }
      : {}),
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${site.name}, ${nap.addressFull}`,
    )}`,
    areaServed,
    knowsAbout: EXPERTISE,
    identifier: {
      '@type': 'PropertyValue',
      name: 'UK company number',
      value: site.companyNo,
    },
    foundingDate: '2008',
    founder: { '@type': 'Person', name: 'James Eddon' },
    hasOfferCatalog: offerCatalogue,
    openingHoursSpecification: openingHours,
    sameAs: [social.facebook, social.instagram],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratings.google.value,
      reviewCount: ratings.google.count,
      bestRating: 5,
    },
  };
}

/** Service offered by Abbey Group. */
export function service(opts: {
  name: string;
  path: string;
  description: string;
  serviceType?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.serviceType ?? opts.name,
    description: opts.description,
    url: abs(opts.path),
    provider: { '@id': `${site.domain}/#organization` },
    areaServed,
  };
}

/** FAQPage from a list of {q, a}. */
export function faqPage(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

/** A named person at Abbey Group, for the About page. Only ever used for people
    the client has confirmed by name and role (Amy's list, 21 July 2026) — this
    is entity data, so an unconfirmed name here would be a factual claim. */
export function person(opts: { name: string; jobTitle: string; image?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: opts.name,
    jobTitle: opts.jobTitle,
    worksFor: { '@id': `${site.domain}/#organization` },
    ...(opts.image ? { image: abs(opts.image) } : {}),
  };
}

/** The review wall as an ItemList of Review objects, for /reviews/.

    Only genuine reviews from the verified master are ever passed in — fabricated
    review markup is a real penalty risk, and the whole point of the page is that
    it is checkable. `reviewRating` is emitted ONLY where the source records a
    star rating: Facebook entries are "recommends" and carry none, so inventing
    five stars for them in schema would be a fabricated rating.

    The aggregate rating is not repeated here: BaseLayout's Organization already
    carries the real 4.6 / 19 figure site-wide, and one entity should not claim
    two aggregates. */
export function reviewList(
  items: { quote: string; name: string; source: string; stars?: boolean }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Review',
        reviewBody: r.quote,
        author: { '@type': 'Person', name: r.name },
        itemReviewed: { '@id': `${site.domain}/#organization` },
        ...(r.stars
          ? { reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 } }
          : {}),
      },
    })),
  };
}

/** BreadcrumbList. */
export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}
