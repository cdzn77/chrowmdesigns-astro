#!/usr/bin/env python3
"""Check a production Astro build without network access or third-party packages.

Usage: python3 scripts/check-seo.py [dist-directory]
Exit 1 blocks a deployment; JSON output can feed a future maintenance dashboard.
"""
import json
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import xml.etree.ElementTree as ET

SITE = 'https://chrowmdesigns.com'

class Document(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.meta, self.links, self.schemas = {}, {}, []
        self.title, self.in_title, self.in_schema, self.schema = '', False, False, ''
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'meta': self.meta.setdefault(a.get('name', a.get('property', '')), []).append(a.get('content', ''))
        if tag == 'link': self.links.setdefault(a.get('rel', ''), []).append(a.get('href', ''))
        if tag == 'title': self.in_title = True
        if tag == 'script' and a.get('type') == 'application/ld+json': self.in_schema, self.schema = True, ''
    def handle_data(self, value):
        if self.in_title: self.title += value
        if self.in_schema: self.schema += value
    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
        if tag == 'script' and self.in_schema:
            self.schemas.append(json.loads(self.schema))
            self.in_schema = False

def check(dist):
    errors, pages, indexable = [], {}, set()
    def require(condition, message):
        if not condition: errors.append(message)
    def asset_exists(url):
        parsed = urlsplit(url)
        return parsed.netloc == urlsplit(SITE).netloc and (dist / unquote(parsed.path).lstrip('/')).is_file()
    for file in sorted(dist.rglob('*.html')):
        rel = file.relative_to(dist).as_posix()
        # Third-party libraries are not portfolio pages.
        if rel.startswith('assets/'): continue
        route = '/' + (rel[:-10] if rel.endswith('index.html') else rel)
        try: doc = Document(file.read_text())
        except Exception as error:
            errors.append(f'{route}: HTML/schema parse failed: {error}'); continue
        pages[route] = doc
        canonical = doc.links.get('canonical', [])
        robots = doc.meta.get('robots', [])
        require(len(robots) == 1, f'{route}: expected one robots directive')
        require(len(canonical) == 1, f'{route}: expected one canonical URL')
        if canonical:
            parsed = urlsplit(canonical[0])
            require(canonical[0].startswith(SITE + '/') and not parsed.query and not parsed.fragment and parsed.path.endswith('/'), f'{route}: malformed production canonical')
            destination = dist / parsed.path.lstrip('/') / 'index.html'
            require(destination.is_file(), f'{route}: canonical destination missing')
        require(bool(doc.title.strip()), f'{route}: empty title')
        require(len(doc.meta.get('description', [])) == 1 and bool(doc.meta['description'][0].strip()), f'{route}: missing description')
        for name in ['og:image', 'twitter:image']:
            values = doc.meta.get(name, [])
            require(len(values) == 1 and asset_exists(values[0]), f'{route}: missing or broken {name}')
        for name in ['og:image:alt', 'twitter:image:alt']:
            require(bool(doc.meta.get(name, [''])[0]), f'{route}: missing {name}')
        if robots and 'noindex' not in robots[0]:
            indexable.add(SITE + route)
            require(canonical == [SITE + route], f'{route}: indexable page must be self-canonical')
            require(doc.links.get('sitemap') == ['/sitemap.xml'], f'{route}: sitemap discovery missing')
            require(len(doc.schemas) == 1, f'{route}: missing or duplicate structured data')
            if doc.schemas:
                graph = doc.schemas[0].get('@graph', [])
                types = [item.get('@type') for item in graph]
                require(all(t in types for t in ['WebSite', 'Person', 'Organization']), f'{route}: site identity incomplete')
                ids = {item['@id'] for item in graph if '@id' in item}
                def refs(value):
                    if isinstance(value, dict):
                        if set(value) == {'@id'}: require(value['@id'] in ids, f'{route}: unresolved schema reference {value["@id"]}')
                        for child in value.values(): refs(child)
                    elif isinstance(value, list):
                        for child in value: refs(child)
                refs(graph)
                if route.startswith('/cases/') and route != '/cases/':
                    require('CreativeWork' in types and 'BreadcrumbList' in types, f'{route}: case schema missing')
                if route == '/info/': require('ProfilePage' in types, f'{route}: profile schema missing')
    try:
        tree = ET.parse(dist / 'sitemap.xml')
        locations = [node.text for node in tree.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
        require(len(locations) == len(set(locations)), 'Sitemap contains duplicate URLs')
        require(set(locations) == indexable, 'Sitemap differs from built, indexable pages')
        require(bool(locations), 'Sitemap is empty')
    except Exception as error: errors.append(f'Sitemap invalid: {error}')
    robots_file = dist / 'robots.txt'
    require(robots_file.is_file() and f'Sitemap: {SITE}/sitemap.xml' in robots_file.read_text(), 'robots.txt missing sitemap')
    headers = dist / '_headers'
    require(headers.is_file() and 'X-Content-Type-Options: nosniff' in headers.read_text(), 'Netlify security headers missing')
    result = {'status': 'pass' if not errors else 'fail', 'html_pages': len(pages), 'indexable_pages': len(indexable), 'errors': errors}
    print(json.dumps(result, indent=2))
    return 1 if errors else 0

if __name__ == '__main__':
    sys.exit(check(Path(sys.argv[1] if len(sys.argv) > 1 else 'dist').resolve()))
