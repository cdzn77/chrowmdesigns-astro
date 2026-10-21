---
title: "An empty list is not the same as unavailable data"
description: "Design empty states around what the system knows, with different responses for first use, filtered results and failed requests."
publishedAt: "2026-10-21T15:55:56.686007+00:00"
draft: false
category: "Design systems"
image: "/images/chronicles/empty-is-not-unavailable.webp"
imageAlt: "A yellow flower appears through a small clear patch in textured blue glass, with the remaining petals obscured."
imageConcept: "Macro photograph of a yellow flower obscured by frosted cobalt glass, revealed through one small clear patch. Concealment is not absence."
author: "ChrowmDesigns"
sources:
  - title: "IBM Carbon: Empty states"
    url: "https://www.carbondesignsystem.com/building-blocks/core/patterns/empty-states"
  - title: "W3C: Understanding Status Messages"
    url: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html"
---

"No invoices yet" is a strange message to show someone waiting for an overdue payment.

Imagine a hypothetical invoicing product. A designer opens the invoice list on a slow connection. The request fails, but the page falls back to the same illustration it uses for a new account. Underneath sits a button to create an invoice. Nothing says the existing records could not be retrieved.

The designer now has to decide whether the invoices disappeared. A cheerful illustration cannot answer that question.

A ChrowmDesigns design-system review should separate these situations before choosing the empty-state component. An account with no records, a filter that matches nothing and an unsuccessful request may leave the same blank rectangle. They do not support the same message or action.

## Define what the product actually knows

Start with the evidence behind the message. If a request succeeds and returns no records, the product can describe the result. If the request fails, it cannot safely conclude that the account is empty. That distinction belongs in the interface specification, not just in the implementation notes.

[IBM Carbon's empty-state guidance](https://www.carbondesignsystem.com/building-blocks/core/patterns/empty-states) distinguishes first-use situations from the results of user actions and problems requiring intervention. Its examples include permissions and system issues. That is a useful starting point for a component inventory, because each cause changes what help is appropriate.

For the hypothetical invoice list, write the cases as separate messages:

- A new account: "Your invoices will appear here." Offer "Create an invoice" if this person has permission to do so.
- A successful filtered search: "No invoices match these filters." Keep the selected filters visible and offer a way to clear them.
- A failed request: "We couldn't load your invoices." Provide a retry action without suggesting that the records have been deleted.
- Restricted access: explain the access limitation and give the person a relevant route to request access, if the product supports one.

These are proposed interface examples, not copy lifted from a working client product. Their purpose is to expose a decision: does the person need to create something, change the query or recover access to something already there?

Do not display a permissions explanation unless the service can establish that permissions caused the problem. An uncertain cause needs an honest message about the failed operation. Guessing more specifically is still guessing.

## Reuse the structure without reusing the wrong instruction

One reusable layout can accommodate different states. It might contain a short heading, supporting text and an optional action. The component needs a content contract explaining when each part appears. A required button slot can otherwise encourage teams to invent an action when none is useful.

Consider a read-only finance account. "Create an invoice" is inappropriate even when the list really is empty. That person may need to ask the account owner to add records. For an archived project, no further invoices might be the expected outcome. The page can simply explain that there are none for the selected period.

Give these cases distinct names in the design file. "Empty" is too broad to tell a developer which one to implement. A label such as "No matching results after successful search" communicates both the condition and the boundary of the claim.

The same discipline helps with loading. Before the first response arrives, an empty array in application memory is not evidence of an empty account. Specify what appears during that interval. If previously loaded records remain visible while a refresh fails, explain that they may be out of date rather than silently presenting them as current.

## Review the transition, not only the blank screen

A static mockup cannot show whether a person notices the result of applying a filter. Walk through the transition with the input and result together. The selected date range should still be understandable when it produces no matches, and changing that range should not require starting the task again.

For updates that happen without moving focus or refreshing the page, a brief result message can need programmatic exposure to assistive technology. [W3C's explanation of status messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) specifically includes messages reporting that a search returned no results. It distinguishes that message from the results themselves. The implementation should announce the relevant change without treating every part of the page as an urgent alert.

Review the behavior with a keyboard and screen reader as well as visually. Check where focus remains after retrying and whether the result is announced once. Repeated announcements can make a quiet recovery action unnecessarily disruptive.

A useful handoff includes a deliberately failed request alongside the polished success screen. Ask someone to interpret it without explaining the scenario first: do they believe their records are gone, or do they understand that the product could not load them? If the answer is deletion, the empty state is making a claim the system has not earned.
