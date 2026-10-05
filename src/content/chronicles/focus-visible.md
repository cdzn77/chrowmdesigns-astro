---
title: "The focus ring is a location marker"
description: "Review keyboard focus around sticky panels and overlays so people can see the control they have reached."
publishedAt: "2026-10-05T18:39:30.303485+00:00"
coverageWeek: "2026-08-19T14:00:00+00:00"
draft: false
category: "Product design"
image: "/images/chronicles/focus-visible.webp"
imageAlt: "A dark keyboard with one key outlined in luminous lime."
imageConcept: "Close crop of an ordinary graphite keyboard photographed under near-black light, one key surrounded by a precise luminous lime outline. Photoreal key surfaces without letters or text, shallow depth, graphic negative space to the left. Concept keyboard focus as location marker."
sources: [{"title": "Understanding Focus Not Obscured (Minimum)", "url": "https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html"}]
---

A keyboard user can arrive at a control that the page itself has covered.

A hypothetical website keeps a promotional panel fixed along the bottom edge. Tabbing moves focus to a link behind that panel. The browser has advanced through the page, but the person cannot see where they are.

The focus indicator may be perfectly styled. Its location is still hidden.

[WCAG 2.2's Focus Not Obscured criterion](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) addresses author-created content that entirely hides a focused component. The minimum criterion has a precise scope; making more of the focused item visible is a sensible design aim beyond simply avoiding total concealment.

Think of the focus ring as a location marker. It needs to be recognizable against the surrounding surface, and the page must leave room to see what it marks. Those are related but separate responsibilities.

For the hypothetical promotional panel, review the actual keyboard path with the panel open. Do not assume that a screenshot of the top of the page proves the rest of the page remains usable. Sticky elements become most troublesome at the edges of the viewport.

ChrowmDesigns can include that path in a visual review. Start at the browser's address bar, enter the page, and move through the important controls without touching the mouse. The exercise is not a substitute for a full accessibility evaluation, but it exposes decisions that a pointer-driven review misses.

Pay attention to the order. A visible ring that jumps unpredictably around the page may leave the person searching for the next item. The visual composition and document structure need to support a comprehensible sequence.

Then try the state that changes the page: open a menu, dismiss a notice, or reveal a form section. Focus should remain understandable after the change. Styling the default state cannot answer what happens when an element disappears.

Avoid removing the browser's focus indicator simply because it looks different from the rest of the brand. Replace it only with a treatment that remains clear, and test that treatment on every surface it crosses. A subtle outline on ivory may vanish over an image.

There is a maintenance issue too. New fixed-position banners can cover controls in pages their author never examined. Document the behavior expected of overlapping elements, not just their maximum height in one mockup.

The ring is not decorative punctuation around a button. It is the visible answer to a person's immediate question: where am I about to act?
