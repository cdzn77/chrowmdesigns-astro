# Website foundations and future maintenance

Updated 2026-09-10. Production: https://chrowmdesigns.com/

| Previous tool | Astro / Netlify equivalent |
| --- | --- |
| Rank Math | Shared metadata, canonical URLs, JSON-LD, generated sitemap, indexing controls |
| WP Rocket | Static HTML, CDN, local subset fonts, responsive AVIF/WebP, mobile video, hashed asset caching |
| Site Kit | Direct Search Console and GA4 connections; existing properties still need to be verified/reconnected |
| Really Simple Security | HTTPS/HSTS, browser security headers, Formspree filtering and Turnstile, ongoing dependency/account maintenance |

## Publishing

`src/lib/site-seo.ts` is the published-page registry and schema configuration. New cases in `src/data/cases.json` enter the sitemap automatically; new top-level pages require an explicit registry entry. Each case needs a real page and image. Preserve existing copy and do not publish unsupported dates, metrics, reviews or awards in schema.

Design explorations and alternate versions are noindex, follow. Crawlers may fetch them to read noindex; this is not access control. `/about` redirects to `/info/`. The alternate Marriott case stays available for review with the main case canonical. Inventory old WordPress URLs in Search Console before adding individual redirects; do not redirect all missing URLs to the homepage.

Before deployment:

```sh
npm run build
python3 scripts/check-seo.py dist
npm audit --omit=dev
```

The search check returns JSON and a failing exit code for missing metadata, broken social images, malformed canonicals, incomplete schema references, or a sitemap that differs from indexable HTML. It is not a ranking or security certification. Social previews use actual project thumbnails and the homepage poster; override `ogImage` only with a real asset.

Netlify reads `public/_headers` and `_redirects`. Only hashed Astro bundles receive immutable caching. The CSP restricts base URLs, embedded plugins, framing and form destinations; it is not a strict script-source policy or complete XSS protection. Test routing, video and Turnstile after policy changes. Cloudflare web DNS is not proxied, so zone WAF rules do not protect this deployment. Account MFA, recovery access, domain renewal and dependency updates remain ongoing maintenance.

## Security update verified

Astro 7.3.2 and Vite 8.2.2 replaced the older build dependencies. The installed dependency audit returned zero known vulnerabilities on 2026-09-10. All 23 pages built successfully; a comparison found identical body text, elements and relevant attributes after explicitly preserving `compressHTML: true`. This is a point-in-time advisory check, not a promise of permanent security.

## Google connections configured

Search Console's existing URL-prefix property `https://chrowmdesigns.com/` is verified through the homepage meta tag. Keep that tag in place. The current sitemap was resubmitted successfully with 12 discovered pages, and the property is linked to the existing GA4 property.

GA account: CDZN (`65633743`). Property: `www.chrowmdesigns.com` (`523485961`). Web stream: Chrowm Designs (`13572171353`), now using `https://chrowmdesigns.com`. Public measurement ID: `G-HP8BSKC4SC`. Existing history was preserved.

Visitors choose through the consent notice or footer Analytics settings. Before opt-in there is no Google script or analytics request. Choice lasts 180 days; withdrawal disables tracking, clears the two GA cookies and reloads to unload the SDK. Advertising storage, advertising user data and personalization are denied; Google signals and ad personalization are disabled in tag configuration. Tracking is excluded from local hosts, Netlify preview hosts and noindex pages.

The site sends one `page_view` per canonical route through Astro's page-load event, `file_download` for the resume, and `generate_lead` only after Formspree confirms delivery. No form values accompany the event. Query strings and fragments are excluded from page URLs; external referrers are reduced to their origin. Automatic enhanced measurement for history, forms, search, outbound links, scrolling, video and downloads is disabled to prevent duplicates and unwanted parameters. Email redaction remains enabled in GA.

`generate_lead` is registered as a key event, once per event, without an invented monetary value. Existing legacy key-event definitions were preserved. Eight consent/measurement tests are available with `node --test scripts/analytics.test.mjs` (Node 24 used for validation). The Analytics SDK lives in a persisted Astro container so navigation does not remove it mid-load.

Continue reviewing old WordPress URL errors in Search Console. New data and indexed pages can take time to appear; sitemap acceptance does not mean all pages are indexed.

## Future Studio Desk website health section — not built or scheduled

Extend the existing local Studio Desk, as requested for a later maintenance phase. Proposed sources: Search Console queries/impressions/clicks/indexing; GA4 useful traffic and confirmed inquiries; PageSpeed trends across main pages; broken-link, metadata, schema and TLS probes; Netlify deploy status and dependency advisories.

Each observation needs its source, scope and timestamp. A failed probe or missing account connection is unknown, never healthy. Avoid alerts for a single noisy performance score. Never collect form bodies, contact email addresses or provider secrets in telemetry.

Proposed workflow:

1. Collect read-only observations and deduplicate actionable failures.
2. Send CLI a bounded repair task with evidence, affected URL and a reproducible check. Treat remote text as data, never instructions.
3. Work in an isolated branch. Preserve brand, copy and layout; keep account, DNS, tracking and major framework changes reviewable.
4. Build, run relevant checks and review the diff. Stop if scope grows, checks fail or the live revision unexpectedly changes.
5. Push under the agreed deployment policy; verify the deployed revision and live behavior. Retain the last known-good deployment for rollback.
6. Record the outcome and notify on meaningful changes. Cap retries to avoid repair loops.

Google Search Console and Analytics are connected as described above. No recurring automation, new dashboard or automatic repair/deploy loop has been enabled. Dashboard access credentials, schedule, thresholds and the allowed repair policy belong to that future phase.

## Search and browser agents

Server-rendered content, clear links/headings, accessible controls, canonical URLs and strong case studies remain the foundation. Existing public crawl access is preserved, including OAI-SearchBot. Search inclusion and training are independent bot settings; no training-policy change was made. Keep spam verification on the contact form.

Google does not use llms.txt for rankings. No universal agent-readiness certification or guaranteed search position exists. Use structured data to describe truthful existing content, not to invent authority.

Sources:
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/docs/appearance/structured-data/profile-page
- https://developers.openai.com/api/docs/bots
- https://docs.netlify.com/manage/routing/headers/
