# A confirmation screen is a promise

Scheduled edition: 2026-W41, October 7, 2026. Automation: publish-a-weekly-chronicle.

## Research and scope

Primary question: What can a success message truthfully promise when receipt and completion are different states?

Sources read October 7:
- https://design-system.service.gov.uk/patterns/confirmation-pages/ supports receipt details, next steps, timing, saving records and return visits. Less than 200 words of the article derive from this source.
- https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html supports the scoped description of SC 4.1.3, specifically updates without a change of context. Less than 200 words derive from this source. No claim that every confirmation page needs a live region.

The rehearsal-room scenario is explicitly hypothetical. Product-state analysis and testing suggestions are editorial recommendations, not measured findings. No invented client anecdotes, conversion figures or operational response promises. No claim of human review or detector scores.

## Audit report before rewrite

- Lexical: 0 substantive flags. No banned transitions, buzzwords or em dashes.
- Structural: 5 clusters of similar sentence lengths in the event explanation, example copy, receipt, email/accessibility transition and testing questions. Two consecutive short subject/verb explanations made the event section mechanical.
- Rhythm: 0 generic opening or summary-ending flags. Opening is 16 words; sections have different lengths and concrete functions.
- Brand: 0 flags after applying the publishing runbook's truthful-hypothetical exception to the anecdote requirement. ChrowmDesigns named; no unsubstantiated results.

Total: 5 structural clusters, moderate rewrite. Rebuilt the event paragraph around the distinction between stored and reserved, shortened the email instruction, varied receipt sentences and made the final test question concrete. Final copy is src/content/chronicles/confirmation-is-a-promise.md.

## Self-check

Lexical: pass. Structural: varied after rewrite; paragraphs support distinct points. Rhythm: concrete opening and operational ending retained. Brand: direct, specific, no fabricated experience. Source attribution and uncertainty preserved rather than rewritten into false certainty.

## Artwork review

Built-in image_gen used. Original: exec-5756cc63-ddfa-4c30-a86b-2a361e4e3a98.png. Final: public/images/chronicles/confirmation-is-a-promise.webp, 1536 by 1024.

All twelve original references visually inspected as a contact sheet. All twenty archive images visually compared at thumbnail size. This is a collection-level vocabulary, not a requirement to combine twelve objects. Reference contributions: spatial impossibility and color planes (1), tangible sculpture (2), luminous dimensional depth (3), cropped hierarchy and negative space (4), immediate poster reading (5), restrained spacing (6), uneven texture (7), silhouette/color separation (8), quiet rhythm (9), altered scale/depth (10), representation versus reality (11), directional energy (12).

New concept: a crooked suspended copper rod casts a complete checkmark, representing false certainty. New material and palette: scratched copper against plum plaster with amber highlights. Oblique view, subject right, shadow lower right, empty left. No beige stone, teal arch, landscape, portrait, mesh, folded paper or repeated graphic modules. Latest five now include sculpture, flat graphic, collage, portrait and textile macro. Thumbnail silhouette and palette differ from each archive image.

Generated result inspected: no text, invented logo or anatomy; wires intentional; mismatched shadow is the conceptual surreal intervention. Existing article template overlays public/logo.svg as a separate exact layer. No UI/typography/navigation changes.

## Validation and deployment

Production build passed (47 routes). Chronicles checks 6/6 passed; lead checks 25/25 passed. Desktop at 1440 pixels and narrow responsive layout inspected, hero and exact SVG logo loaded, no horizontal overflow. Mobile emulation also inspected. Only article, cover, review and ledger changed. PR checks and production verification remain pending. Dependency audit reports five existing transitive advisories (four high, one moderate); lockfile unchanged. This is a static output publication, with no dependency or runtime-code changes. Dependency remediation is separate work.


## Production verification

PR #4 merged after CodeQL and both Netlify previews passed. Production commit a2f9c8bcdf4f9487689ba014801b99be26042fff. Netlify cdzn deploy 6ac655ad01631c0007632395 is ready and published at 2026-10-07T14:22:51.440Z. Article, cover and archive verified HTTP 200. RSS and both sitemap URLs verified HTTP 200 with the new route after an exact-URL Cloudflare cache purge. Command-line requests receive 403; normal browser requests work. No hosting security controls changed. No LinkedIn/Medium posts.
