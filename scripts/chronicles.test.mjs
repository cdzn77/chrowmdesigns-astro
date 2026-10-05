import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { isPublished } from '../src/lib/chronicles-policy.mjs';
test('publication gate excludes drafts, future dates and invalid dates',()=>{
 const now=Date.parse('2026-10-05T14:00:00Z');
 assert.equal(isPublished({draft:false,publishedAt:'2026-10-05T14:00:00Z'},now),true);
 assert.equal(isPublished({draft:true,publishedAt:'2026-01-01'},now),false);
 assert.equal(isPublished({draft:false,publishedAt:'2099-01-01'},now),false);
 assert.equal(isPublished({draft:false,publishedAt:'invalid'},now),false);
 assert.equal(isPublished({publishedAt:'2026-01-01'},now),false);
});
const read = p => readFile(new URL(`../${p}`,import.meta.url),'utf8');
test('homepage entry appears once above footer, not in navigation',async()=>{
 const doc=new JSDOM(await read('dist/index.html')).window.document;
 const links=[...doc.querySelectorAll('a[href="/chronicles/"]')];assert.equal(links.length,1);
 assert.ok(links[0].closest('.chronicles-gateway'));assert.equal(doc.querySelectorAll('nav a[href="/chronicles/"],footer a[href="/chronicles/"]').length,0);
 const footer=doc.querySelector('footer');assert.ok(footer);assert.ok(links[0].compareDocumentPosition(footer)&4);
});
test('archive metadata, real empty state, controls and canonical are present',async()=>{
 const doc=new JSDOM(await read('dist/chronicles/index.html')).window.document;
 assert.equal(doc.querySelector('h1').textContent,'Chronicles');
 assert.equal(doc.querySelector('link[rel=canonical]').href,'https://chrowmdesigns.com/chronicles/');
 assert.equal(doc.querySelectorAll('.subject-filter').length,5);assert.ok(doc.querySelector('input[type=search]'));
 const rows=[...doc.querySelectorAll('.register-row')];
 if(rows.length===0)assert.match(doc.querySelector('#archive-empty').textContent,/first chapter/);
 for(const row of rows){const slug=row.getAttribute('href').split('/')[2];await access(new URL(`../dist/chronicles/${slug}/index.html`,import.meta.url));}
});
test('RSS and both sitemaps agree on published article routes',async()=>{
 const feed=new JSDOM(await read('dist/chronicles/feed.xml'),{contentType:'text/xml'}).window.document;
 assert.equal(feed.querySelector('parsererror'),null);
 const sitemap=await read('dist/sitemap.xml');assert.equal(await read('dist/sitemap_index.xml'),sitemap);assert.match(sitemap,/https:\/\/chrowmdesigns.com\/chronicles\//);
 const archive=new JSDOM(await read('dist/chronicles/index.html')).window.document;
 const urls=[...archive.querySelectorAll('.register-row')].map(a=>'https://chrowmdesigns.com'+a.getAttribute('href'));
 assert.deepEqual([...feed.querySelectorAll('item link')].map(x=>x.textContent),urls);
 for(const url of urls)assert.ok(sitemap.includes(url));
});
test('published articles have schema, source notes, a real image and return navigation',async()=>{
 const dirs=await readdir(new URL('../dist/chronicles/',import.meta.url),{withFileTypes:true});
 for(const dir of dirs.filter(d=>d.isDirectory())){
  const doc=new JSDOM(await read(`dist/chronicles/${dir.name}/index.html`)).window.document;
  const schema=JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent);assert.equal(schema['@type'],'BlogPosting');assert.ok(doc.querySelector('.chronicles-prose').textContent.trim());
  const img=doc.querySelector('.article-hero img');assert.ok(img.alt.length>=15);await access(new URL(`../public${img.getAttribute('src')}`,import.meta.url));assert.ok(doc.querySelector('.article-back[href="/chronicles/"]'));assert.match(doc.querySelector('.article-notes').textContent,/Produced with AI/);
 }
});
test('retrospective batch has twenty weekly coverage dates separate from publication dates',async()=>{
 const ledger=JSON.parse(await read('docs/chronicles/editorial-ledger.json')).filter(x=>x.batch==='retrospective-20');
 assert.equal(ledger.length,20);assert.equal(new Set(ledger.map(x=>x.image)).size,20);
 const dates=ledger.map(x=>Date.parse(x.coverageWeek)).sort((a,b)=>a-b);
 assert.equal(new Date(dates[0]).toISOString().slice(0,10),'2026-05-20');
 assert.equal(new Date(dates.at(-1)).toISOString().slice(0,10),'2026-09-30');
 for(let i=0;i<dates.length;i++){assert.equal(new Date(dates[i]).getUTCDay(),3);if(i)assert.equal(dates[i]-dates[i-1],7*86400000);}
 for(const item of ledger){
  const doc=new JSDOM(await read(`dist/chronicles/${item.slug}/index.html`)).window.document;
  const schema=JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent);
  assert.equal(Date.parse(schema.datePublished),Date.parse(item.publishedAt));assert.ok(Date.parse(schema.datePublished)>Date.parse(item.coverageWeek));
  assert.match(doc.querySelector('.retrospective-note').textContent,/Written and published/);
 }
});
