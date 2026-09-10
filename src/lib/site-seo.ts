import cases from '../data/cases.json';

export const SITE_URL = 'https://chrowmdesigns.com';
export const publicPaths = ['/', '/info/', '/cases/', '/contact/', ...cases.map(item => `${item.url}/`)];
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
      url: `${SITE_URL}/info/`, jobTitle: 'Senior UX Strategist',
      sameAs: ['https://www.linkedin.com/in/angelomanzano/', 'https://www.behance.net/angelomanzanojr'] },
    { '@type': 'Organization', '@id': studioId, name: 'ChrowmDesigns', url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.svg`, founder: { '@id': personId }, email: 'chile@chrowmdesigns.com' },
    { '@type': 'WebSite', '@id': websiteId, name: 'ChrowmDesigns', url: `${SITE_URL}/`,
      inLanguage: 'en', publisher: { '@id': studioId } },
    { '@type': pageType, '@id': `${url}#webpage`, url, name, description, inLanguage: 'en',
      isPartOf: { '@id': websiteId }, primaryImageOfPage: { '@type': 'ImageObject', url: image },
      ...(path === '/info/' ? { mainEntity: { '@id': personId } } : {}),
      ...(path === '/cases/' ? { mainEntity: {
        '@type': 'ItemList', itemListElement: cases.map((item, index) => ({
          '@type': 'ListItem', position: index + 1, name: item.title, url: canonicalFor(item.url),
        })),
      } } : {}),
      ...(project ? { mainEntity: { '@id': `${url}#case-study` }, breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
    },
  ];
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
