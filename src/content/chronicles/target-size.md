---
title: "Small controls make big demands"
description: "Separate icon size from target size and give small controls enough room for a forgiving interaction."
publishedAt: "2026-10-05T18:39:30.303485+00:00"
coverageWeek: "2026-08-26T14:00:00+00:00"
draft: false
category: "Product design"
image: "/images/chronicles/target-size.webp"
imageAlt: "An enlarged grayscale thumb beside a large and a small blue disc on amber."
imageConcept: "Photographic pop collage of an enlarged grayscale thumb hovering beside two cobalt discs on a bright amber flat field, one disc large and one very small, no button lettering. Oblique cutout crop, humorous strong scale contrast, graphic editorial clarity. No sculpture or floor."
sources: [{"title": "Understanding Target Size (Minimum)", "url": "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html"}]
---

A tiny icon asks the hand to be more precise than the task deserves.

Imagine a hypothetical list of saved projects with a small remove icon at the end of every row. The icons are visually tidy. On a touch screen, two adjacent rows place the actions close enough that an imprecise tap can target the wrong project.

The icon size and the interactive area are not necessarily the same thing. The design should make that distinction intentional.

[WCAG 2.2's Target Size (Minimum) criterion](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) generally specifies a minimum of 24 by 24 CSS pixels, with defined exceptions including spacing and certain inline or equivalent controls. It is not a universal instruction to make every visible symbol exactly that size.

For the hypothetical project list, a larger clickable area around the icon may help, provided areas do not overlap or create unexpected activation zones. More spacing between actions can also change the interaction. The appropriate correction depends on the row's content and the consequences of an accidental tap.

ChrowmDesigns can show the actual target boundary in component documentation. A developer should not have to guess whether the empty area beside a symbol is part of the control. The user should also receive clear feedback about what has been activated.

A destructive action deserves particular attention. Adequate target size does not replace a sensible recovery path. If accidental removal is possible, the product should consider an appropriate undo or confirmation behavior based on the action's consequences.

Review with real hands on a real device. A desktop pointer can make crowded controls feel manageable. That does not establish that the layout works when someone holds a phone in one hand or uses an alternative input device.

Look beyond the primary button. Close icons, pagination controls and small links often inherit less attention because they occupy less visual area. Their importance is determined by what the person needs to do, not by how much space the design allocates to them.

The densest view is usually the most revealing. Use long titles and enough rows to create the conditions under which the controls will actually be used. A spacious demonstration with three short labels can hide the problem.

There is no requirement to make every interface visually bulky. A small mark can sit inside a generous, well-defined control. The design can remain quiet while the interaction becomes more forgiving.

Before reducing a target to make the page look cleaner, identify who is being asked to supply the missing precision.
