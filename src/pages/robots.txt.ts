import { SITE_URL } from '../lib/site-seo';

export function GET() {
  // Crawlers must fetch preview pages to read noindex. Preserve public crawl access.
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
