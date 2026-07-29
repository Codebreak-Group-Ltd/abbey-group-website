/* JSON-LD builders. Pages pass the results to BaseLayout `schemas`.
   Organization + WebSite are emitted site-wide by BaseLayout itself. */
import { site, nap, ratings, social, areasServed } from '../data/site.ts';

const abs = (path: string) => new URL(path, site.domain).href;

/** LocalBusiness (Home + About own the primary entity). */
export function localBusiness(opts: { path: string; description: string } ) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HVACBusiness', 'Plumber'],
    '@id': `${site.domain}/#localbusiness`,
    name: site.name,
    legalName: site.legalName,
    url: abs(opts.path),
    description: opts.description,
    telephone: nap.phone.tel,
    email: nap.email,
    image: abs('/og/default.png'),
    logo: abs('/brand/logos/group.svg'),
    priceRange: '££',
    address: {
      '@type': 'PostalAddress',
      streetAddress: nap.addressLine,
      addressLocality: nap.locality,
      addressRegion: nap.region,
      postalCode: nap.postcode,
      addressCountry: 'GB',
    },
    areaServed: areasServed.map((a) => ({ '@type': 'Place', name: a })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
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
    areaServed: areasServed.map((a) => ({ '@type': 'Place', name: a })),
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
