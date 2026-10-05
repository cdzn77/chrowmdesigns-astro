---
title: "A component should know how much room it has"
description: "Design components around the room they receive, with responsive rules that follow content instead of device labels."
publishedAt: "2026-10-05T18:39:30.303485+00:00"
coverageWeek: "2026-06-24T14:00:00+00:00"
draft: false
category: "Design systems"
image: "/images/chronicles/responsive-components.webp"
imageAlt: "Orange and violet accordion-folded paper against a sky-blue background."
imageConcept: "Physical studio photograph of richly colored accordion-folded paper, coral-orange outer face and deep violet reverse, stretching across a pure sky-blue backdrop. Tight frontal crop of folds, sharply directional light. Real paper, no architecture, no arch shapes. Concept responsive components expand to their available space."
sources: [{"title": "Container queries land in stable browsers", "url": "https://web.dev/blog/cq-stable"}]
---

The same card can fit a laptop screen and still fail in a narrow column.

That sounds contradictory only if “responsive” means responding to the browser width. A card inside a sidebar has less room than a card spanning the page, even when both appear on the same monitor. The surrounding component matters.

The [arrival of size container queries across stable browsers in February 2023](https://web.dev/blog/cq-stable) gave developers a way to respond to the dimensions of a containing element. Looking back, the interesting part for design is the change in the brief. A component no longer needs to assume that a large screen guarantees a generous allocation of space.

Consider a hypothetical article card used in an archive and a related-reading panel. The archive can accommodate a horizontal image, title and metadata. The narrow panel may need a stacked arrangement with the date moved below the title. Shrinking everything proportionally would preserve the picture of the card while weakening its reading order.

Design the change as a decision. Identify the width at which the text becomes awkward or the image stops contributing. Then specify the alternative arrangement. The breakpoint should follow the content's needs rather than an arbitrary device name.

A useful design file shows at least one uncomfortable intermediate width. Wide and narrow examples can both look excellent while the transition between them creates a title only two words across. That middle state is where the component's rules become visible.

For ChrowmDesigns, this is a practical way to discuss reuse with an implementation team: the reusable part is the relationship between content and available room, not a single fixed rectangle.

Container queries do not remove the need for broader page layout decisions. Navigation, overall spacing and content order still need attention. They also do not guarantee a good result when the component contains unusually long text. The component has to tolerate real content within the rules provided.

Try a simple review. Place the same card in three genuinely different contexts, keeping its content identical. If the design requires a separate custom version every time, ask which difference is essential and which is an accidental limitation of the original layout.

The answer may be a small set of arrangements rather than dozens of variants. Fewer variants are useful only if they cover the actual cases. A compact component that cuts off the article's distinguishing words has not solved the problem.

The most useful annotation might be a sentence: when the title no longer reads comfortably beside the image, let the image sit above it. That gives the code a reason for changing, and gives future designers a reason to preserve the behavior.
