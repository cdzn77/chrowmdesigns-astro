---
title: "WCAG 2.2 belongs in the working file"
description: "Bring accessibility behavior into components and working files instead of relying on a final visual checklist."
publishedAt: "2026-10-05T18:39:30.303485+00:00"
coverageWeek: "2026-08-12T14:00:00+00:00"
draft: false
category: "Design systems"
image: "/images/chronicles/wcag-real-work.webp"
imageAlt: "An orange hillside crossed by a stairway and a continuous curved ramp."
imageConcept: "Architectural photograph with a graphic color treatment: a broad simple stair and adjacent continuous ramp cut into one vivid orange hillside, seen from far above. Deep purple shadows, pale neutral sky sliver, no doors or arches. Concept access belongs in the plan."
sources: [{"title": "What’s New in WCAG 2.2", "url": "https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/"}]
---

An inaccessible interaction can look completely finished in a design review.

A dragging control may be elegant. A sticky banner may sit neatly at the bottom of a page. A sign-in screen may use the approved typography. None of those observations establishes that the interaction is usable.

[WCAG 2.2 became a W3C Recommendation on October 5, 2023](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/). Revisiting that release offers a concrete reminder that accessibility requirements reach into ordinary design decisions. They are not confined to a final color-contrast check.

The added criteria cover issues including dragging alternatives, focus visibility under overlapping content, and unnecessary repeated entry. Each issue can begin in a design file long before implementation.

Consider a hypothetical scheduling tool that lets people arrange appointments by dragging cards. The mockup may communicate the movement clearly, yet omit any other way to select a new position. Asking for an alternative during development can change the layout. Asking during design gives the team time to make it coherent.

The same applies to a sticky help panel. Its presence may be useful, but its overlap with the rest of the interface needs examination. A panel that fits the default viewport may cover a focused control when text is enlarged.

ChrowmDesigns can make these questions visible in component documentation. A control's behavior should describe more than its pointer hover state. Include how it is reached and operated without dragging, and what happens when the available space changes.

Do not turn a single article or checklist into a claim of conformance. WCAG evaluation concerns the relevant requirements and complete experiences, not a handful of selected components. This piece discusses design implications, not legal obligations or certification.

A practical starting point is to pick one important task and walk through every state. For a form, include validation and the confirmation. For a menu, include opening it, moving through it, and returning to the page. Record uncertainties rather than letting the polished screen imply they have been resolved.

The design team and implementation team need a shared place for those questions. A comment that disappears when a file is exported is not enough. Tie the behavior to the component or task so it remains discoverable during changes.

A useful review can end with fewer approved screens and better-defined interactions. That may look slower on a presentation slide. It is more specific about what the project is actually ready to build.

The next time a component is called complete, ask which input method and which failure state that statement includes.
