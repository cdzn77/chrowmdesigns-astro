---
title: "The button moved. The design failed."
description: "Review the page before it settles. Unexpected layout movement can undermine an otherwise polished interaction."
publishedAt: "2026-10-05T18:39:30.303485+00:00"
coverageWeek: "2026-06-17T14:00:00+00:00"
draft: false
category: "Product design"
image: "/images/chronicles/stable-layouts.webp"
imageAlt: "Off-white horizontal bands on black, with one band displaced beside a blue marker."
imageConcept: "Graphic optical editorial image: clean black background with irregular off-white horizontal bands, one band suddenly displaced to the right, one tiny electric blue vertical line reveals the mismatch. Printlike ink grain, no 3D rendering. Concept layout shift and a moved target."
sources: [{"title": "Cumulative Layout Shift (CLS)", "url": "https://web.dev/articles/cls"}]
---

A button can move between the moment someone sees it and the moment they tap.

Picture a hypothetical service page with a late-loading promotional banner. A visitor reaches for “View pricing.” The banner appears, the page shifts, and the finger lands on another link. The layout eventually settles into the approved design. The interaction has already gone wrong.

The final arrangement is not enough.

[Google's explanation of Cumulative Layout Shift](https://web.dev/articles/cls) describes a metric for unexpected visual movement. It helps make a familiar frustration visible in measurement. The metric has specific calculation rules, so it should not be treated as a count of every movement a person finds annoying.

For a designer, the immediate task is to identify which pieces of the page can change size after they appear. Images without reserved dimensions are an obvious candidate. A font swap, an expanding notice, or third-party content can also alter the structure.

Consider the same service page with space reserved for the banner. The design may show a quiet placeholder until the content is ready. That is not wasted space if it prevents a control from jumping under a person's hand. It is an explicit decision about stability.

The same reasoning applies to editorial imagery. If the aspect ratio is known, the layout can reserve it before the file arrives. Choosing a crop therefore has a behavioral consequence, not just an aesthetic one.

ChrowmDesigns can treat stable layout as part of visual craft: the relationships between elements should remain trustworthy while the page loads.

Review the page as a sequence. Start with an empty cache where practical, watch the early states, and interact before everything finishes. A review that begins only after the page has loaded skips the period when movement is easiest to miss.

Test content that is longer than the sample. A short notification may look harmless, while a translated version adds another line and displaces the form below it. Ask whether the content should occupy its own area or appear only after a deliberate action.

A score can help locate trouble, but the recording explains what it felt like. Keep both when reporting a problem. “The appointment button moved after the visitor aimed at it” gives the implementation team a clearer target than an isolated number.

There is a useful approval question for the next design review: what is allowed to move without a request from the visitor? If nobody can answer, the stable final screenshot may be hiding an unstable page.
