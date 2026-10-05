---
title: "The loading screen is part of the design"
description: "Treat loading as part of the composition, with deliberate priorities for imagery, content and early interaction."
publishedAt: "2026-10-05T18:39:30.303485+00:00"
coverageWeek: "2026-06-10T14:00:00+00:00"
draft: false
category: "Product design"
image: "/images/chronicles/performance-is-design.webp"
imageAlt: "Emerald dunes below a pale yellow sky, with a thin distant reflection."
imageConcept: "Ultra-minimal surreal landscape photograph: emerald wind-sculpted dunes in lower two thirds with large pale yellow sky. One extremely thin horizontal silver reflection interrupts a distant ridge. Tonal grain and real sand ripples, horizon low, no objects floating. Visual pause and waiting, no arches, no hands."
sources: [{"title": "Web Vitals", "url": "https://web.dev/articles/vitals"}]
---

The hero image arrives after the visitor has already started reading.

In a hypothetical portfolio, the first paragraph appears quickly, but a large image above it is still loading. A video begins downloading in the background. The navigation looks ready before its interactions respond. The screenshot is beautiful. The arrival is disjointed.

That arrival belongs in the design review.

Google introduced the [Web Vitals initiative in May 2020](https://web.dev/articles/vitals), bringing attention to measurable aspects of loading, responsiveness and visual stability. The metrics have evolved since then. A retrospective should not confuse the original set with the current one, or treat a score as a complete description of experience.

The enduring design question is which material deserves the visitor's time first.

For the hypothetical portfolio, a project cover might be essential to understanding the work. An atmospheric background video might not be. Giving both equal priority is a design decision, even when it is made accidentally through the way assets are exported or embedded.

Ask what a visitor can do before the heaviest element arrives. Can they read the offer? Can they navigate to a project? Is a meaningful still image available if motion takes longer? Those questions make performance part of composition rather than a late technical cleanup.

ChrowmDesigns should be judged through the actual browser experience, including imperfect connections.

A practical review can begin with the same page on two devices. Use controlled conditions to investigate causes, then compare with available field data from real visits. A fast result on a developer's computer does not establish the experience of somebody using an older phone.

Keep the observations concrete. “The page feels slow” becomes more useful when it identifies the visible delay: the cover is blank, a click produces no response, or a late element interrupts reading. Each case points toward a different intervention.

There is no need to remove every expressive element. A striking image can justify its cost when it carries the story. The harder question concerns decorative assets that delay the part visitors came to see. A smaller export, a different crop, or a still image may preserve the direction with less waiting.

Put asset decisions into the design file. Record the intended crop and which visual should appear first. Discuss the behavior before the page is assembled.

A portfolio is not delivered as a screenshot. It is delivered one request, one font, and one interaction at a time. The first incomplete version that appears on a visitor's screen is part of what you designed.
