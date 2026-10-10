import cases from '../data/cases.json';

export const SITE_URL = 'https://chrowmdesigns.com';
export const publicPaths = ['/', '/info/', '/cases/', '/contact/', '/services/', '/for-agencies/', '/chronicles/', ...cases.map(item => `${item.url}/`)];
export const normalizePath = (path: string) => path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`;
// Publishing a new page is explicit; design explorations stay out of search by default.
export const isIndexable = (path: string) => publicPaths.includes(normalizePath(path));
export function canonicalFor(path: string) {
  const normalized = normalizePath(path);
  const aliases: Record<string, string> = {
    '/about/': '/info/',
    '/cases/marriott-vacation-club-v2/': '/cases/marriott-vacation-club/',
  };
  return new URL(aliases[normalized] ?? normalized, SITE_URL).href;
}
export const caseForPath = (path: string) => cases.find(item => normalizePath(item.url) === normalizePath(path));

export function structuredData(path: string, name: string, description: string, image: string) {
  const url = canonicalFor(path);
  const personId = `${SITE_URL}/#angelo-manzano`;
  const studioId = `${SITE_URL}/#studio`;
  const websiteId = `${SITE_URL}/#website`;
  const project = caseForPath(path);
  const pageType = path === '/info/' ? 'ProfilePage' : path === '/contact/' ? 'ContactPage' : path === '/cases/' ? 'CollectionPage' : 'WebPage';
  const graph: object[] = [
    { '@type': 'Person', '@id': personId, name: 'Angelo Manzano Jr.',
      url: `${SITE_URL}/info/`, jobTitle: 'Senior UX Strategist', worksFor: { '@id': studioId },
      sameAs: ['https://www.linkedin.com/in/angelomanzano/', 'https://www.behance.net/angelomanzanojr'] },
    { '@type': 'Organization', '@id': studioId, name: 'ChrowmDesigns', alternateName: 'Chrowm Designs', url: `${SITE_URL}/`,
      description: 'Independent UX strategy and product design studio led by Angelo Manzano Jr. in Palm Bay, Florida.',
      logo: `${SITE_URL}/logo.svg`, founder: { '@id': personId }, email: 'chile@chrowmdesigns.com', telephone: '+13212227944', foundingDate: '1999-01-01',
      location: { '@type': 'Place', name: 'Palm Bay, Florida' },
      sameAs: ['https://www.linkedin.com/in/angelomanzano/'] },
    { '@type': 'WebSite', '@id': websiteId, name: 'ChrowmDesigns', alternateName: 'Chrowm Designs', url: `${SITE_URL}/`,
      inLanguage: 'en', publisher: { '@id': studioId } },
    { '@type': pageType, '@id': `${url}#webpage`, url, name, description, inLanguage: 'en',
      isPartOf: { '@id': websiteId }, primaryImageOfPage: { '@type': 'ImageObject', url: image },
      ...(path === '/info/' ? { mainEntity: { '@id': personId } } : {}),
      ...(path === '/' ? { about: { '@id': studioId } } : {}),
      ...(path === '/services/' ? { mainEntity: { '@id': `${url}#service-catalog` } } : {}),
      ...(path === '/for-agencies/' ? { mainEntity: { '@id': `${url}#agency-service` } } : {}),
      ...(path === '/cases/' ? { mainEntity: {
        '@type': 'ItemList', itemListElement: cases.map((item, index) => ({
          '@type': 'ListItem', position: index + 1, name: item.title, url: canonicalFor(item.url),
        })),
      } } : {}),
      ...(project ? { mainEntity: { '@id': `${url}#case-study` }, breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
    },
  ];
  if (path === '/services/') {
    const services = [
      ['ux-strategy-audits', 'UX strategy & audits', 'User journeys, information architecture, interface reviews, and prioritized design recommendations.'],
      ['product-design', 'Website & digital product design', 'User flows, wireframes, responsive interfaces, and design notes for implementation.'],
      ['interactive-prototypes', 'Interactive prototypes', 'Connected screens and interactions for exploring ideas and reviewing design direction.'],
      ['design-systems', 'Design systems & UI consistency', 'Reusable components, interface patterns, and guidance for extending a design system.'],
    ];
    graph.push({ '@type': 'ItemList', '@id': `${url}#service-catalog`, name: 'ChrowmDesigns services',
      itemListElement: services.map(([id], index) => ({
        '@type': 'ListItem', position: index + 1, item: { '@id': `${url}#${id}` },
      })),
    });
    for (const [id, name, description] of services) graph.push({
      '@type': 'Service', '@id': `${url}#${id}`, name, description, url: `${url}#${id}`,
      provider: { '@id': personId }, areaServed: { '@type': 'Country', name: 'United States' },
      mainEntityOfPage: { '@id': `${url}#webpage` },
    });
  }
  if (path === '/for-agencies/') graph.push({
    '@type': 'Service', '@id': `${url}#agency-service`, name: 'Freelance UX and product design support for agencies',
    description: 'Senior UX consulting and contract product design for agency client projects, from discovery through design handoff.',
    url, provider: { '@id': personId }, areaServed: { '@type': 'Country', name: 'United States' },
    mainEntityOfPage: { '@id': `${url}#webpage` },
  });
  if (project) graph.push(
    { '@type': 'CreativeWork', '@id': `${url}#case-study`, name: project.title, description,
      url, image, author: { '@id': personId }, publisher: { '@id': studioId },
      mainEntityOfPage: { '@id': `${url}#webpage` }, genre: project.category },
    { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Cases', item: `${SITE_URL}/cases/` },
      { '@type': 'ListItem', position: 3, name: project.title, item: url },
    ] },
  );
  return { '@context': 'https://schema.org', '@graph': graph };
}
