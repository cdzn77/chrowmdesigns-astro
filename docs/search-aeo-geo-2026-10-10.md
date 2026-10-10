# Search, AEO and GEO implementation review

Date: 2026-10-10

## Scope

Apply useful findings from the October 9 search report and prepare the portfolio for direct answers and generative citations. Keep content available as server-rendered HTML, with factual service descriptions and schema matching what visitors can read.

## Changes

- Replace em dashes in browser and social-sharing title templates with pipes or colons.
- Clarify the homepage studio definition and agency contract offering.
- Link service entities to the existing Angelo Manzano Jr. and ChrowmDesigns identity graph.
- Add three visible service questions and matching FAQ markup; generate the four existing agency answers and their schema from one shared source per page, with stable anchors.
- Describe the Chronicles archive as a CollectionPage and Blog, retaining BlogPosting markup on individual articles and linking their identifiers to the archive and studio.
- Publish a concise llms.txt index of public canonical pages.
- Give the first case-gallery thumbnail high fetch priority; preserve responsive sources and lazy loading below the first row.
- Align the Info-page Marriott example with the current case study and link to its evidence. The older 30% satisfaction statement was not substantiated by that case study.

## Existing foundations retained

- Public crawler access and sitemap declaration in robots.txt.
- Canonical URLs, indexability rules and legacy redirects.
- Person, Organization, WebSite, case-study CreativeWork and breadcrumb schema.
- Article authorship, actual publication dates, source notes and retrospective coverage dates.
- Consent-based analytics and lead-event tracking.

## Interpretation and limits

AEO and GEO overlap with established search practices. Neither title punctuation, FAQ markup nor llms.txt guarantees better rankings or AI citations. Google does not require special AI text files or schema for its AI search features. FAQ rich results have restricted eligibility; this portfolio's FAQ markup describes visible answers without claiming rich-result eligibility.

The report does not establish which element caused the case-gallery LCP delay. Higher priority for its first responsive image is a targeted loading improvement, not a measured reduction in production LCP. The small search sample cannot establish causation or a reliable conversion trend.

No synthetic publication dates, reviews, ratings, awards, unsupported service outcomes or new analytics events were added. Existing private/client routes and authentication were not changed.

## Validation and follow-up

Validation passed: Astro built 47 routes; all 48 generated HTML files had no em dash in their titles. All 6 Chronicles tests and 25 lead-flow/analytics tests passed. Rendered checks verified 7 FAQ answers matched their schema in the head, 5 service entities, 21 linked published articles, 10 valid llms.txt links, and exactly one high-priority gallery thumbnail. The service FAQ disclosure was exercised in the local browser preview. git diff --check passed. Production LCP was not remeasured.

After deployment, confirm live titles, JSON-LD and llms.txt. Compare mobile case-gallery LCP across repeated equivalent runs. Review Search Console after recrawling, and use the same buyer prompts across answer engines to record whether the studio is mentioned, cited and described accurately. Track these as observations rather than attributing any change to one edit. No recurring monitoring job was created.

Live URL checks from this editing session were blocked by the client environment, so local validation does not establish deployed behavior.

## References

- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- https://developers.google.com/search/blog/2023/08/howto-faq-changes
- https://schema.org/CollectionPage
- https://schema.org/Blog
- https://web.dev/articles/optimize-lcp
