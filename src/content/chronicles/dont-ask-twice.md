---
title: "Do not ask people to enter it twice"
description: "Carry valid information through a task, making repeated requests deliberate rather than accidental."
publishedAt: "2026-10-05T18:39:30.303485+00:00"
coverageWeek: "2026-09-02T14:00:00+00:00"
draft: false
category: "UX strategy"
image: "/images/chronicles/dont-ask-twice.webp"
imageAlt: "A turquoise river through violet cliffs continues across a foreground mirror."
imageConcept: "Surreal aerial landscape photograph: one bright turquoise river flows through a purple canyon, then its reflection continues into a flat rectangular mirror in the lower foreground. A single continuous path, no repeated gates. Grainy landscape collage finish. Concept information should carry forward."
sources: [{"title": "Understanding Redundant Entry", "url": "https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html"}]
---

The second request for an address can make the first one feel pointless.

In a hypothetical booking flow, a visitor enters contact details on one step, then reaches a confirmation form that asks for the same information again. The team may see two separate components. The visitor sees one task that has forgotten what they just supplied.

That difference is worth designing around.

[WCAG 2.2's Redundant Entry criterion](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html) addresses information previously entered or provided during the same process. It generally calls for that information to be populated or available for selection, subject to specified exceptions such as security, essential re-entry or invalid information.

This is not an instruction to retain personal data indefinitely. It concerns the work the person has already done within the process and how the interface makes that work available.

For the booking example, the next screen might show the supplied address with an edit action. The visitor can verify it without retyping it. If the delivery address differs from the contact address, offer that choice explicitly instead of assuming either sameness or difference.

The copy matters. A checkbox labeled “Use these details” needs enough context to identify which details it means. A clear summary nearby can make the choice understandable without forcing the person to return to an earlier step.

ChrowmDesigns can use this question during a flow review: where is the interface asking someone to reconstruct information it already has? The answer often crosses component boundaries, so reviewing isolated screens is insufficient.

Trace one complete task with realistic data. Note every repeated field and why it appears. A legitimate reason should be explainable. “This form belongs to another team” describes an implementation boundary, not a user need.

Consider recovery as well. If a session expires, explain what was preserved and what must be entered again. Avoid implying that a submission succeeded merely because a field remains filled. Saved input and completed processing are different states.

Privacy choices remain part of the design. The ability to carry information through a task does not justify exposing it to another person using the same device or retaining it beyond the intended purpose. Work with the implementation team on the actual handling rather than promising behavior in a mockup.

The visual solution may be modest: a summary, an edit link, and a clearly labeled alternative. The deeper change is acknowledging continuity between steps.

When a person has already supplied the answer, the next screen should have a reason for asking again.
