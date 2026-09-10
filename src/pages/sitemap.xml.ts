import { SITE_URL, publicPaths } from '../lib/site-seo';

// Generated from the same published-page registry as canonical and robots metadata.
// Deployment time is not a content revision date, so do not invent lastmod dates.
export function GET() {
  const entries = publicPaths.map(path => `<url><loc>${new URL(path, SITE_URL).href}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
