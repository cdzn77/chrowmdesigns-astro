# ChrowmDesigns.com → Astro Migration Plan

## Claude Code Build Instructions

---

## Project Overview

Rebuild chrowmdesigns.com as a one-to-one Astro static site. Same visual design, same content, same layout, same interactions. The goal is a pixel-faithful recreation in a modern, performant stack that eliminates WordPress/Elementor dependency.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Astro 5.x |
| Styling | Tailwind CSS 4.x + custom CSS for animations |
| Templating | Astro components (.astro files) |
| Interactivity | Vanilla JS (no framework islands needed) |
| Fonts | Match current site fonts (inspect live site) |
| Images | Copy all assets from current site, convert to WebP where not already |
| Deployment | Static build (can deploy to Netlify, Vercel, or Cloudflare Pages) |
| Contact Form | Formspree, Netlify Forms, or similar static-compatible service |

---

## Site Architecture (4 pages + 8 case studies)

```
src/
├── layouts/
│   └── BaseLayout.astro          # Shared HTML head, nav, footer, scrolling marquee
├── components/
│   ├── Nav.astro                 # Logo + 4 links + mobile hamburger + "Let's Talk" CTA
│   ├── Footer.astro              # Two-column footer with logo, nav, copyright, location
│   ├── FullscreenMenu.astro      # Mobile/overlay nav (matches current slide-in menu)
│   ├── HeroVideo.astro           # Homepage video background hero
│   ├── StatsMarquee.astro        # Scrolling horizontal marquee (metrics ticker)
│   ├── CaseCard.astro            # Thumbnail card for case grid (image + title + tags)
│   ├── CaseHero.astro            # Case study hero block (logo, title, metadata table)
│   ├── SkillCard.astro           # Numbered skill block with image (001, 002, etc.)
│   ├── ClientLogoGrid.astro      # Client logo carousel/grid
│   ├── TimelineEntry.astro       # Work history timeline item
│   ├── ApproachSteps.astro       # 3-column Insight > Concept > Execution layout
│   ├── ContactForm.astro         # Form with fields matching current site
│   ├── HireMarquee.astro         # "Product Designer Available for Hire" scrolling text
│   ├── CTABanner.astro           # "Let's start something bold" full-width CTA
│   └── BackToTop.astro           # Scroll-to-top button
├── pages/
│   ├── index.astro               # Homepage
│   ├── about.astro               # About page
│   ├── cases/
│   │   ├── index.astro           # Cases listing page
│   │   ├── beat-saber.astro
│   │   ├── marriott-vacation-club.astro
│   │   ├── zzzquil.astro
│   │   ├── grounded.astro
│   │   ├── malibu-rum.astro
│   │   ├── carrabbas.astro
│   │   ├── walt-disney-world.astro
│   │   └── taco-bueno.astro
│   └── contact.astro             # Contact page
├── styles/
│   └── global.css                # Brand tokens, animations, custom properties
├── data/
│   ├── cases.json                # Case study metadata (title, slug, tags, thumbnail)
│   └── clients.json              # Client logo list
└── public/
    ├── images/                   # All site images (downloaded from current site)
    ├── video/                    # Showreel video
    └── fonts/                    # Any self-hosted fonts
```

---

## Brand Design Tokens (global.css)

```css
:root {
  --color-primary: #1B1B1B;
  --color-secondary: #555555;
  --color-accent: #60D3B8;
  --color-white: #FFFFFF;
  --color-bg: #1B1B1B;
  --color-text: #FFFFFF;
  --color-muted: #999999;
}
```

**Accent color rule:** #60D3B8 only on dark backgrounds. Never on white (fails WCAG contrast).

---

## Page-by-Page Specifications

### 1. Homepage (index.astro)

**Sections in order:**

1. **Nav** — Fixed top. Logo left, links center, "Let's Talk" CTA right. Hamburger on mobile.
2. **Hero** — Full-viewport video background (cdzn_showreel.mp4). H1: "Designed to Connect. Built to Perform." Subtitle with inline link. CTA button.
3. **Stats Marquee** — Horizontal auto-scrolling ticker: "20 Years of Design That Performs / 44% Decrease in Exit Rate / 300% Increase in Registrations / 60M Impressions Delivered / 147% Engagement Lift / Enterprise UX Strategy / 40% Faster Path to Content" — repeating infinitely.
4. **Featured Image** — Full-width Marriott tablet mockup with intro text: "Crafting digital experiences that connect, engage and inspire." + "Browse all cases" link.
5. **Case Study Grid** — 6 case cards in a 2-column masonry/staggered layout. Each card: thumbnail image, client name, category label.
6. **Hire Marquee** — Scrolling text strip: "Product Designer Available for Hire / UX Strategy & Design Systems / Remote & Worldwide / 20 Years of Experience" — repeating.
7. **The Studio** — Text block with intro copy + "Learn More" and "Browse all cases" links.
8. **Portrait Section** — Large photo of Angelo with overlaid typography.
9. **Skills Section** — "Skills To Pay The Bills" header. 4 numbered skill cards (001-004), each with title, description, and ASCII art thumbnail.
10. **CTA Banner** — "Let's start something bold" full-width link to contact.
11. **Footer** — Logo, nav links, location, copyright, email, LinkedIn.

### 2. About Page (about.astro)

**Sections in order:**

1. Nav
2. **Page Header** — H1: "From dial-up to design" + subtitle
3. **Bio Section** — Two-column: left has name, title, bio paragraphs, LinkedIn link, resume download. Right has portrait photo with glitch effect.
4. **Approach Section** — 3-column horizontal flow: Insight Discovery → Concept Development → Design Execution. Each with bullet list. Arrow connectors between columns.
5. **Stats Block** — 4 animated counters: Years of Skill (20+), Design Impact Increase (147%), Industries Served (7), Design Systems Built (15+)
6. **Client Logo Grid** — 14 client logos in a grid or carousel.
7. **Collaboration CTA** — Image + text + "Let's Collaborate" button.
8. **Work History Timeline** — Vertical timeline: ChrowmDesigns (Present-1999), Penn Entertainment (2023-2021), Pocket Made (2021-2015), Voce Communications (2015-2011).
9. CTA Banner
10. Footer

### 3. Cases Page (cases/index.astro)

**Sections in order:**

1. Nav
2. **Page Header** — H1: "CASE STORIES" + subtitle + filter tags (design, UX/UI, Strategy, Consulting)
3. **Case Grid** — 8 case cards, 2-column layout. Each: thumbnail, client name, tags.
4. CTA Banner
5. Footer

### 4. Contact Page (contact.astro)

**Sections in order:**

1. Nav
2. **Page Header** — H1: "Found your way here, huh?" + subtitle
3. **Two-column layout:** Left has intro text + email + social links. Right has contact form (Full Name, Email, Phone, Company, Budget, Subject, Message, Submit).
4. Footer (no CTA banner above footer)

### 5. Case Study Template (individual case pages)

**Sections in order:**

1. Nav
2. **Case Hero** — Client logo, H1 title, metadata table (Client, Role, Agency, Duration)
3. **Hero Image** — Full-width project image
4. **Content Sections** — H2 headers, prose paragraphs, H6 for sub-labels, bullet lists for strategy points
5. **Image Gallery** — Full-width and multi-column image grids throughout
6. **Prev/Next Navigation** — Links to adjacent case studies
7. Footer

---

## Key Interactions & Animations to Replicate

1. **Video hero background** — Autoplay, muted, looped MP4 behind hero text
2. **Scrolling marquees** — CSS-only infinite horizontal scroll (stats and hire strips)
3. **Hover effects on case cards** — Scale/opacity transitions on thumbnail hover
4. **Animated counters** — Numbers count up on scroll into viewport (Intersection Observer)
5. **Mobile menu** — Slide-in/overlay fullscreen nav with transitions
6. **Back to top button** — Appears on scroll, smooth scroll to top
7. **Smooth scroll** — Anchor links scroll smoothly
8. **Page transitions** — Fade or slide between pages (Astro View Transitions API)

---

## Asset Collection Strategy

Before building, download all assets from the live site:

```bash
# Images (run from project public/images directory)
# Download all referenced .webp images from chrowmdesigns.com
# Key assets:
# - logo-1.webp (site logo)
# - cdzn_showreel.mp4 (hero video)
# - All case study thumbnails (*-case_thumb.webp)
# - All case study content images (marriott01-11.webp, etc.)
# - Client logos (client-01 through client-14.webp)
# - about_bio.webp, about_collab.webp, foot_top.webp
# - Skill thumbnails (strategic_approach_thumb.webp, etc.)
# - Arrow icons, button icons
```

---

## Claude Code Execution Steps

Run these in order:

### Phase 1: Scaffold
```
1. npm create astro@latest chrowmdesigns-astro -- --template minimal
2. cd chrowmdesigns-astro
3. npx astro add tailwind
4. Create the directory structure listed above
5. Set up global.css with brand tokens
6. Create BaseLayout.astro with HTML head, meta tags, font imports
```

### Phase 2: Shared Components
```
7.  Build Nav.astro (fixed position, responsive, hamburger toggle)
8.  Build FullscreenMenu.astro (mobile overlay)
9.  Build Footer.astro (two sections: nav + info)
10. Build CTABanner.astro ("Let's start something bold")
11. Build BackToTop.astro
12. Build HireMarquee.astro (CSS-only infinite scroll)
13. Build StatsMarquee.astro (CSS-only infinite scroll)
```

### Phase 3: Homepage
```
14. Build HeroVideo.astro (video bg + text overlay + CTA)
15. Build CaseCard.astro (reusable thumbnail card)
16. Build SkillCard.astro (numbered skill block)
17. Assemble index.astro using all homepage components
```

### Phase 4: About Page
```
18. Build ApproachSteps.astro (3-column flow)
19. Build ClientLogoGrid.astro
20. Build TimelineEntry.astro
21. Build animated counter component (Intersection Observer)
22. Assemble about.astro
```

### Phase 5: Cases
```
23. Create cases.json with all 8 case study metadata entries
24. Build cases/index.astro using CaseCard loop
25. Build CaseHero.astro (reusable case study header)
26. Build each case study page with full content from live site
    - Fetch each case study URL and transcribe content
    - Download all associated images
```

### Phase 6: Contact
```
27. Build ContactForm.astro (with Formspree or static handler)
28. Assemble contact.astro
```

### Phase 7: Polish
```
29. Add Astro View Transitions for page-level animations
30. Test all responsive breakpoints (mobile, tablet, desktop)
31. Run Lighthouse audit, target 95+ on all scores
32. Validate WCAG 2.2 AA compliance
33. Test all internal links and navigation flows
34. Optimize images (ensure WebP, add width/height attributes)
35. Add meta descriptions and OG tags for each page
```

---

## Case Study URLs to Fetch Content From

Each needs its content transcribed into an Astro page:

1. https://chrowmdesigns.com/cases/beat-saber-strategic-visual-design
2. https://chrowmdesigns.com/cases/marriott-vacation-club-enterprise-transformation
3. https://chrowmdesigns.com/cases/zzzquil-sleep-app
4. https://chrowmdesigns.com/cases/grounded-climate-solutions-summit
5. https://chrowmdesigns.com/cases/malibu-rum-101-days-of-because-summer
6. https://chrowmdesigns.com/cases/carrabbas-italian-grill-content-platform-design
7. https://chrowmdesigns.com/cases/walt-disney-world-redesigns
8. https://chrowmdesigns.com/cases/taco-bueno

---

## SEO Checklist (Per Page)

- [ ] Unique `<title>` tag
- [ ] Meta description (140-160 chars, benefit-forward)
- [ ] OG title, description, image
- [ ] H1 used once per page
- [ ] Alt text on all images (descriptive, keyword-aware)
- [ ] Internal links between case studies
- [ ] Canonical URL
- [ ] Structured data (Organization schema on homepage)

---

## Accessibility Checklist

- [ ] All images have descriptive alt text
- [ ] Color contrast meets WCAG 2.2 AA (accent #60D3B8 only on dark bg)
- [ ] Keyboard navigation works for all interactive elements
- [ ] Skip-to-content link present
- [ ] Focus indicators visible
- [ ] Form labels properly associated
- [ ] ARIA landmarks on major sections
- [ ] Reduced motion media query respects user preferences

---

## Notes for Claude Code

- **Do not invent content.** Fetch each page from the live site and use the exact copy.
- **Do not alter the visual design.** Match layouts, spacing, typography, and color usage.
- **Images**: Download from the live site URLs found in the fetched HTML. Store in `public/images/`.
- **Video**: Download `cdzn_showreel.mp4` and store in `public/video/`.
- **Fonts**: Inspect the live site's CSS to identify font families. Self-host or use CDN.
- **Responsive**: The current site is responsive. Match all breakpoints.
- **Performance target**: Lighthouse 95+ across all categories.

---

## Figma MCP Integration Rules

These rules define how to translate Figma designs (ChrowmDesigns Neo-Brutalist Design System) into production-ready Astro components for this project. Follow for every Figma-driven change.

### Required Workflow (do not skip)

1. Call `get_design_context` with the node's fileKey and nodeId first
2. If the response is truncated or too large, call `get_metadata` for the high-level node map, then re-fetch only the needed node(s)
3. Call `get_screenshot` for a visual reference of the exact variant being implemented
4. Download any assets returned (images, SVGs) before starting implementation
5. Translate the Figma output (React + Tailwind reference) into this project's Astro + custom CSS conventions
6. Validate against the Figma screenshot for 1:1 visual parity before marking complete

### Framework & File Conventions

- **Output format:** `.astro` files only — no React, Vue, or other framework components
- **Component location:** `src/components/` — PascalCase filenames (e.g., `HeroCard.astro`)
- **Page location:** `src/pages/` or `src/pages/cases/`
- **Reuse first:** Always check `src/components/` for an existing component before creating a new one
- **No path aliases** — use relative imports (e.g., `../components/Nav.astro`)

### Component Structure Template

```astro
---
export interface Props {
  title: string;
  // add typed props here
}
const { title } = Astro.props;
---

<article class="component-name">
  <h3>{title}</h3>
</article>

<style>
  /* Scoped BEM CSS — do not use Tailwind utility classes here */
  .component-name { }
  .component-name__element { }
  .component-name__element--modifier { }
</style>

<script>
  /* Vanilla JS only — no framework needed */
</script>
```

### Design Token Rules

- IMPORTANT: Never hardcode hex colors — always use CSS custom properties from `src/styles/global.css`
- IMPORTANT: `--color-accent: #60D3B8` must only appear on dark backgrounds (`--color-bg: #1B1B1B`) — never on white
- Use token variables for all color, spacing, and typography values:

```css
/* Colors */
--color-primary: #1B1B1B
--color-secondary: #555555
--color-accent: #60D3B8
--color-white: #FFFFFF
--color-bg: #1B1B1B
--color-text: #FFFFFF
--color-muted: #999999

/* Typography */
--font-sans: 'sequel-sans-roman', system-ui, sans-serif
--font-size-sm: 13px
--font-size-md: 20px
--font-size-lg: 36px
--font-size-xl: 42px

/* Spacing (fluid) */
--section-padding-x: clamp(1.5rem, 5vw, 5rem)
--section-padding-y: clamp(4rem, 8vw, 8rem)

/* Transitions */
--transition-base: 0.3s ease
--transition-slow: 0.6s ease
```

- New tokens belong in `src/styles/global.css` under `:root` — do not scatter them in components

### Styling Rules

- **Primary approach:** Scoped `<style>` blocks per component using BEM class naming
- **Tailwind:** Imported globally via `@import "tailwindcss"` in `global.css` but used minimally — prefer custom CSS for components
- IMPORTANT: Do not add Tailwind utility classes inside component templates; write scoped CSS in the `<style>` block instead
- **Fluid sizing:** Use `clamp(min, preferred, max)` for responsive font sizes and spacing
- **Responsive breakpoints:**
  - Desktop: default (no media query)
  - Tablet: `max-width: 900px`
  - Mobile: `max-width: 768px`, `max-width: 640px`, `max-width: 480px`
- **Reduced motion:** Always add `@media (prefers-reduced-motion: reduce)` for animations
- **Global utility classes** (defined in `global.css`, use these instead of reinventing):
  - `.accent` — teal accent color
  - `.text-muted` — muted text
  - `.section-padding` — standard section padding
  - `.visually-hidden` — accessible hide
  - `.case-section`, `.case-h2`, `.case-grid-2`, `.case-grid-3` — case study layout helpers

### Asset Rules

- IMPORTANT: If the Figma MCP returns a `localhost` URL for an image or SVG asset, use that source directly — do not substitute a placeholder
- IMPORTANT: Do not install new icon packages — use inline SVGs embedded directly in components (project convention)
- Store downloaded image assets in `public/images/` as `.webp` format
- Image naming convention:
  - Thumbnails: `{case-name}-case_thumb.webp`
  - Case content: `{case-name}_{descriptor}.webp`
  - Client logos: `client-{nn}.webp`
- Always include `width`, `height`, `loading="lazy"` (or `"eager"` for above-fold), and `decoding="async"` on `<img>` tags
- Icons: inline SVG only — no sprite sheets, no icon fonts, no external icon libraries

### Typography Rules

- Font family: Sequel Sans (self-hosted in `public/fonts/`) — reference via `--font-sans`
- Use `--font-size-*` tokens, not arbitrary values
- For marquee/display text, use `--marquee-font-size: 12rem` with `letter-spacing: -0.07em`

### Interactivity Rules

- Vanilla JS only in `<script>` blocks — no React/Vue/Svelte
- Use `Intersection Observer` for scroll-triggered animations and counters
- Use `{ passive: true }` on scroll event listeners
- Animations: CSS `@keyframes` preferred over JS-driven animation libraries

### Data & Content Rules

- Case study metadata lives in `src/data/cases.json`
- Client logo list lives in `src/data/clients.json`
- Do not hardcode lists of cases or clients in components — always import from data files

### What to Map from Figma Output

| Figma/React output | This project's equivalent |
|---|---|
| `className="bg-[#1B1B1B]"` | `var(--color-bg)` in scoped CSS |
| `className="text-[#60D3B8]"` | `var(--color-accent)` (dark bg only) |
| `style={{ fontFamily: '...' }}` | `font-family: var(--font-sans)` |
| `<div className="flex gap-4">` | CSS Grid or Flexbox in `<style>` block |
| React component JSX | Astro component `.astro` file |
| `import { Icon }` | Inline SVG in template |
| Tailwind spacing utilities | `clamp()` values or `--section-padding-*` tokens |
