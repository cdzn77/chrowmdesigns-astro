import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { getCollection } from 'astro:content';
import { isPublished } from './chronicles-policy.mjs';
export const categories = ['UX strategy', 'Product design', 'Visual craft', 'Design systems', 'Creative practice'];
export async function publishedChronicles() {
  const now = Date.now();
  return (await getCollection('chronicles')).filter(p => isPublished(p.data, now) && existsSync(resolve('src/content/chronicles', `${p.id}.md`)))
    .sort((a,b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime() || (b.data.coverageWeek?.getTime() ?? 0) - (a.data.coverageWeek?.getTime() ?? 0));
}
export const readingMinutes = (body = '') => Math.max(1, Math.ceil(body.split(/\s+/).filter(Boolean).length / 220));
export const filedDate = (date: Date) => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date).replaceAll('-', ' · ');
