# Chronicles weekly publishing runbook

User authorization: October 5, 2026. The user requested autonomous weekly articles on ChrowmDesigns. The user subsequently approved 20 retrospective editions for launch, covering Wednesdays May 20 through September 30, 2026. These have accurate October 5 publication timestamps, separately labeled coverage weeks, and batch retrospective-20 in the ledger. Do not publish the earlier Medium draft automatically. No global menu or footer links to Chronicles: the homepage gateway is the only portfolio navigation entry point. RSS, sitemap and direct search discovery remain intentional.

## Schedule

Wednesday, 10:00 a.m. America/New_York is the initial run time, beginning October 7, 2026. This is an editorial hypothesis, not a measured best hour. Publishing follows research, generation and checks, so the live article can appear after the run time. Review timing after eight published entries using available analytics; avoid conclusions from tiny samples. One scheduled article per ISO week maximum. The retrospective-20 launch batch is excluded from this limit, so the first scheduled edition is October 7.

Runs are handled by the Codex desktop automation attached to the originating chat. They require the host/app, network, tools and repository credentials to be available. No API keys are embedded in source. If a run cannot publish, preserve its draft and report the concrete blocker. Never claim an article is live without verifying deployment. Do not invent metrics or silently bypass hosting security controls.

## Each run

1. Fetch current main from cdzn77/chrowmdesigns-astro into a clean isolated checkout. Inspect project instructions and uncommitted changes. Read this runbook, ART-FOUNDATION.md, WRITING-AUDIT.md, VOICE.md, current articles and editorial-ledger.json. If this ISO week already has a published scheduled article (excluding batch retrospective-20), exit without duplication. Resume the same draft after a partial failure.
2. Choose one useful topic for prospective clients or agency partners: UX strategy, product design, visual craft, design systems, or creative practice. Rotate subjects. Examine current primary sources when discussing changing tools, standards or industry developments. Prefer a specific practical question to generic trend roundups. Mix evergreen advice with relevant timely analysis. Never imply fabricated firsthand experience, client results or unapproved client disclosures. Do not copy reference-site articles.
3. Write approximately 700–1,200 words when the topic needs that space; the initial retrospective batch intentionally uses concise 400-word essays. Do not pad an article to satisfy a word count. Write copy that answer the question with specific examples. Apply Clean AI Writing; keep the audit outside public copy. The user's preference overrides skill rules that would force portfolio anecdotes. Label hypothetical examples. Preserve appropriate factual uncertainty. Cite sources directly where used and record at least one meaningful primary source in frontmatter. Verify factual claims and every outbound link. The user requested removal of the line “Produced with AI for Chronicles by ChrowmDesigns” on October 5. Do not reinsert that line. Preserve source notes and accurate hypothetical-example labels; do not claim human authorship or review that did not occur.
4. Design a new visual concept using the complete twelve-reference ART-FOUNDATION v2. Compare every previous image and ledger entry, including the earlier hand/portal/blocks/waves/coral-disc concept. Do not repeat that scene. Rotate subject, metaphor, composition, material, dominant palette and camera angle; retain the underlying editorial principles. Every image should have a different concept, not a color swap. Keep Chronicles UI neutral, with mint on dark surfaces; do not import the reference blog's pink/red UI. Image palettes can vary intentionally within the user's foundation. Supply actual source logo from public/logo.svg if branding is used, not a typeset substitute. Generate real images with image_gen; never substitute prompts or placeholders. Inspect the result for text/anatomy/artifacts and meaningful difference from prior art. Save a unique optimized image under public/images/chronicles/. This is an editorial review, not a mathematical guarantee that two images never resemble one another.
5. Add Markdown under src/content/chronicles/<descriptive-slug>.md with the schema below. Initially keep draft: true. Store source/research and writing/image audit in docs/chronicles/reviews/<slug>.md. Use existing services/agency links only where relevant. No generic link stuffing. Avoid raw HTML/scripts in article Markdown.
6. Set draft: false only after editorial/image checks pass. publishedAt must be actual current publication time, not a future/backdated claim. Run npm run build and npm run test:chronicles. Check archive, article, RSS and sitemap output plus desktop/mobile screenshots. Ensure no unrelated source changes, valid image paths, accurate metadata, unique slug and no draft/future entries in public output. Keep coverageWeek optional and use it only for explicitly retrospective editions; never substitute it for publishedAt.
7. Commit the article, artwork, audit and ledger update on a scoped branch. Push and create a PR; attach it to the chat. After checks pass, merge within the user's standing authorization for weekly publication. Verify Netlify production deployment and public article, archive, image, RSS and sitemap. If any step fails, record state and report it without duplicate retry posts or changing security settings. No automatic publishing to LinkedIn/Medium is authorized by this workflow; prepare optional adaptations separately.
8. Record publication URL, commit/deploy ID, category, primary question, source URLs, image concept, composition/material/palette, image path and actual publication time in editorial-ledger.json. Notify only for completed publication, failure, or required user action; keep unchanged/non-actionable runs quiet.

## Markdown frontmatter

```yaml
title: A specific title answering the reader's question
description: A concrete 40–180 character description of the article.
publishedAt: 2026-10-07T14:00:00Z # Replace with actual publication time.
draft: true
category: UX strategy # Or Product design, Visual craft, Design systems, Creative practice
image: /images/chronicles/unique-slug.webp
imageAlt: A meaningful description of the actual image.
imageConcept: Detailed original visual concept, different from earlier images.
author: ChrowmDesigns
coverageWeek: 2026-09-30T14:00:00Z # Optional retrospective coverage, never the publication date.
sources:
  - title: Verified source title
    url: https://example.org/replace-with-actual-source
```

No fabricated article is committed as a sample. Test fixtures must be removed before production build.
