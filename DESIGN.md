# ChrowmDesigns Design System

## Color Palette

### Primary Colors
- **--color-ember**: #C83C28 (primary accent, warm orange-red)
- **--color-ember-light**: #E04830 (hover state, lighter variant)
- **--color-ember-dark**: #7A1E10 (active/pressed state, darker variant)

### Backgrounds
- **--color-parchment**: #EDE8E3 (warm page background)
- **--color-linen**: #F5F1ED (light card backgrounds)
- **--color-white**: #FFFFFF (pure white, sections)

### Text & UI
- **--color-volcanic**: #1C1614 (dark text, headings)
- **--color-charcoal**: #4A4340 (body text)
- **--color-slag**: #7A726C (metadata, secondary text)
- **--color-stone**: #D8D2CC (borders, dividers)
- **--color-black**: #000000 (utility black)

## Typography

### Font Families
- **Headings**: Manrope (500, 700, 900 weights) — modern, clean sans-serif
- **Body & Labels**: JetBrains Mono (400 weight) — monospace, technical aesthetic

### Type Scale

#### Display / Headlines
- **H1 (Hero)**: Manrope, 56px, weight 700, line-height 1.15, letter-spacing -2px
- **H2 (Section)**: Manrope, 48px, weight 700, line-height 1.15, letter-spacing -1.5px
- **H3 (Subsection)**: Manrope, 32px, weight 700, line-height 1.15, letter-spacing -1px

#### Feature Headlines
- **Large Heading**: Manrope, 64px, weight 700, line-height 1.1, letter-spacing -1.5px
- **XL Heading**: Manrope, 56px, weight 700, line-height 1.15, letter-spacing -1.5px

#### Body Text
- **Body Regular**: JetBrains Mono, 16px, weight 400, line-height 1.8
- **Body Small**: JetBrains Mono, 14px, weight 400, line-height 1.6
- **Label**: JetBrains Mono, 14px, weight 400, line-height 1.4

#### Metadata
- **Subtitle/Muted**: JetBrains Mono, 18px, weight 400, line-height 1.6
- **Small Caption**: JetBrains Mono, 14px, weight 400, line-height 1.4

### Text Colors by Usage
- **Headings (H1-H3)**: --color-volcanic
- **Body Text**: --color-charcoal
- **Metadata/Labels**: --color-slag
- **White BG Text**: --color-white (rgba variants for opacity)

## Spacing System

- **--spacing-xs**: 12px (minimal gaps)
- **--spacing-sm**: 20px (small spacing)
- **--spacing-md**: 40px (medium gaps, content separation)
- **--spacing-lg**: 60px (large sections, main padding)
- **--spacing-xl**: 80px (section padding, top-level spacing)
- **--spacing-2xl**: 120px (reserved for large layout gaps)

## Layout Grid

### Responsive Breakpoints
- **Mobile**: max-width 768px (single column, stacked)
- **Tablet**: 768px - 1024px (2-column, tighter spacing)
- **Desktop**: 1024px+ (full 2-3 column layouts)
- **Max Width**: 1400px (container max-width)

### Grid Patterns
- **2-Column**: 1fr 1fr (equal), 1fr 1.5fr (asymmetric), 1.2fr 1fr
- **3-Column**: repeat(3, 1fr) icon grids
- **Gap**: --spacing-lg (60px desktop, 40px tablet, 20px mobile)

## Component Library

### Hero Section
- Height: 600px (viewport), 400px mobile
- Grid: 2-column layout (1fr 1.5fr)
- Background: --color-ember
- Text: white, headlines with letter-spacing -2px

### Case Section
- Background: --color-parchment
- Grid: 2-column (1fr 1fr)
- Image aspect-ratio: 9/16 with 24px border-radius
- Box-shadow: 0 20px 40px rgba(0,0,0,0.15)

### Icon Grid
- Background: --color-linen
- Icons: 200px squares with 20px border-radius
- Grid: 3-column (200px each) → 2-column tablet → 1-column mobile

### Image + Caption
- Background: --color-white
- Center content alignment
- Caption: --color-slag, italic 14px

### Multi-Block
- Header: 2-column grid with text + image
- Icons: 2-column grid with --color-linen and --color-ember backgrounds
- Heights: icon boxes 200px

### Image Showcase
- Background: --color-ember
- Min-height: 600px
- Overlay heading: absolute top-left, 56px, white, max-width 400px
- Image: 800px width, max-width 90vw, box-shadow 0 30px 60px rgba(0,0,0,0.3)

### Text + Image 2-Column
- Background: --color-white
- Grid: 1.2fr 1fr (left wider for text)
- Left: text + image (300px height)
- Right: heading + icon box (200px height)
- Icon box: --color-ember background

### Fullscreen Quote
- Background: url-based with 35% dark overlay
- Height: 500px
- Content box: 500px width, --color-ember background, absolute z-index 2
- Quote: 20px, white, italic
- Attribution: 14px, white, weight 600

### Testimonial
- Background: --color-parchment
- Centered layout
- Profile image: 80px circular
- Quote: 24px, --color-volcanic, italic
- Attribution: 14px, --color-slag

## Responsive Adjustments

### Tablet (768px - 1024px)
- All 2-column → 1-column stack
- Headlines: -15% font-size
- Spacing: --spacing-xl → 50px, --spacing-lg → 40px
- Padding: 50px instead of 60px

### Mobile (max-width 768px)
- Headlines: -25% font-size
- Body text: -10% font-size
- Spacing: halved
- All padding: --spacing-sm (20px) instead of --spacing-lg
- Images: 100% width with adaptive heights

## Accessibility

### Color Contrast
- Body text (--color-charcoal on --color-white): 4.5:1 (WCAG AA)
- Headings (--color-volcanic on --color-white): 5:1 (WCAG AAA)
- White text on --color-ember: 4.7:1 (WCAG AA)

### Focus States
- All interactive elements: visible focus ring (2px solid --color-ember)
- Buttons: outline-offset 2px

### Semantic HTML
- Proper heading hierarchy (H1 > H2 > H3)
- Descriptive image alt text
- Landmark regions (main, section, article)
- Button and link semantics

## Brand Voice

**Visual Language**: Warm, approachable, professional
**Aesthetic**: Monospace typography + clean sans-serif, warm earth tones
**Interaction**: Smooth transitions (0.3s cubic-bezier), subtle hover states
**Mood**: Confident without being corporate, creative but grounded
