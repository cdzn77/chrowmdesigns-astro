# ARIA Labels & Accessibility Guidelines

**Ensures every page has proper ARIA labels, accessible names, and semantic HTML for assistive technology users.**

---

## Quick Reference: What Gets ARIA Labels

| Element | When to Use ARIA | Example |
|---------|-----------------|---------|
| **Navigation** | Always | `<nav aria-label="Primary navigation">` |
| **Buttons** (icon-only) | Always | `<button aria-label="Open menu">` |
| **Links** (ambiguous) | When text is vague | `<a href="/more" aria-label="Read full article">More →</a>` |
| **Form fields** | Always (with `<label>`) | `<label for="email">Email</label><input id="email">` |
| **SVG icons** | Always if decorative | `<svg aria-hidden="true">` |
| **Sections** | Major landmarks | `<section aria-labelledby="section-title">` |
| **Images** | Always (with `alt`) | `<img alt="Descriptive text">` |
| **Live regions** | Dynamic content | `<div aria-live="polite">` |

---

## Pattern 1: Navigation

### ✅ Correct

```astro
<nav aria-label="Primary navigation">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/cases">Cases</a></li>
    <li><a href="/info">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

**What's happening:**
- `aria-label` identifies this as "Primary navigation"
- `aria-current="page"` marks the active page
- `<nav>` is semantic (screen readers know this is navigation)
- Link text is descriptive

### ❌ Incorrect

```astro
<div class="nav">  <!-- Should be <nav> -->
  <a href="/">H</a>  <!-- "H" is not descriptive -->
  <a href="/cases">Cases</a>
  <a href="/info">Info</a>
</div>
```

---

## Pattern 2: Icon Buttons

### ✅ Correct

```astro
<!-- Menu button with icon -->
<button aria-label="Open navigation menu">
  <svg aria-hidden="true" width="24" height="24">
    <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor"/>
  </svg>
</button>

<!-- Close button with icon -->
<button aria-label="Close menu">
  <svg aria-hidden="true">✕</svg>
</button>

<!-- Social link with icon -->
<a href="https://linkedin.com" aria-label="Visit ChrowmDesigns on LinkedIn">
  <svg aria-hidden="true" class="icon-linkedin"/>
</a>
```

**What's happening:**
- `aria-label` provides the accessible name for the button
- `aria-hidden="true"` hides the SVG from screen readers (label is enough)
- Link text is descriptive for screen readers

### ❌ Incorrect

```astro
<!-- No accessible name -->
<button>
  <svg>☰</svg>  <!-- What is this? -->
</button>

<!-- Vague label -->
<a href="/more" aria-label="click here">
  More →
</a>
```

---

## Pattern 3: Form Fields

### ✅ Correct (HTML5 `<label>`)

```astro
<!-- Explicit label -->
<label for="email">Email address</label>
<input type="email" id="email" name="email" required aria-required="true">

<!-- Implicit label -->
<label>
  Email address
  <input type="email" name="email" required aria-required="true">
</label>

<!-- With error messaging -->
<label for="name">Full Name</label>
<input 
  id="name" 
  type="text" 
  aria-required="true"
  aria-invalid="false"
  aria-describedby="name-error"
>
<span id="name-error" role="alert" class="error" hidden>
  Please enter your name
</span>
```

**What's happening:**
- `<label>` is associated with `<input>` via `for` attribute
- `aria-required="true"` reinforces required field
- `aria-invalid="true|false"` marks field validation state
- `aria-describedby` links input to error message
- `role="alert"` announces error to screen readers

### ❌ Incorrect

```astro
<!-- No label -->
<input type="email" placeholder="Email">

<!-- Placeholder is NOT a label -->
<input type="email" placeholder="Email address">

<!-- Label not associated -->
<label>Email address</label>
<input type="email">  <!-- No id/for connection -->

<!-- No error announcement -->
<input type="email" aria-invalid="true">
<!-- Error exists but screen reader doesn't know about it -->
```

---

## Pattern 4: Semantic Structure

### ✅ Correct

```astro
<main id="main-content">
  <!-- Skip link targets this -->
  
  <section aria-labelledby="hero-heading">
    <h1 id="hero-heading">20+ Years of Digital Design</h1>
    <p>Crafting experiences that inspire users...</p>
  </section>

  <section aria-labelledby="cases-heading">
    <h2 id="cases-heading">Featured Case Studies</h2>
    <article>
      <h3>Case Study Title</h3>
      <p>Description...</p>
    </article>
  </section>

  <aside aria-labelledby="sidebar-heading">
    <h3 id="sidebar-heading">Related Articles</h3>
    <ul>
      <li><a href="/article-1">Article 1</a></li>
    </ul>
  </aside>
</main>

<footer>
  <!-- Footer content -->
</footer>
```

**What's happening:**
- `<main>` wraps primary content
- `<section>` groups related content
- `aria-labelledby` connects section to heading
- `<h2>`, `<h3>` establish hierarchy
- `<aside>` marks supplementary content
- `<footer>` marks page footer

### ❌ Incorrect

```astro
<div id="main-content">
  <!-- Should be <main> -->
  
  <div class="section">
    <!-- Should be <section> -->
    <div class="heading">20+ Years</div>
    <!-- Should be <h1> -->
  </div>
</div>
```

---

## Pattern 5: Images & Alt Text

### ✅ Correct

```astro
<!-- Content image -->
<figure>
  <img 
    src="/case-study-hero.webp" 
    alt="Marriott Vacation Club booking platform redesign on mobile and desktop"
    width="1200"
    height="600"
    loading="lazy"
    decoding="async"
  />
  <figcaption>
    Redesigned booking flow reducing friction by 47%
  </figcaption>
</figure>

<!-- Decorative image -->
<img src="/background-pattern.webp" alt="" aria-hidden="true">

<!-- Icon -->
<svg aria-hidden="true" class="icon-arrow">
  <path d="M..." />
</svg>

<!-- Logo with visible text -->
<img src="/logo.webp" alt="ChrowmDesigns" class="logo">
```

**What's happening:**
- Content images have descriptive alt text
- Decorative images have empty `alt=""` and `aria-hidden="true"`
- Icons are hidden with `aria-hidden="true"` (text/button label is sufficient)
- `<figcaption>` provides additional context
- `width`/`height` prevent layout shift

### ❌ Incorrect

```astro
<!-- No alt text -->
<img src="/case-study.webp">

<!-- Alt text too vague -->
<img src="/marriott-redesign.webp" alt="Screenshot">

<!-- Decorative image NOT hidden -->
<img src="/background.webp" alt="Background pattern">
<!-- Screen reader announces it pointlessly -->

<!-- Logo with generic alt -->
<img src="/logo.webp" alt="Logo">  <!-- What logo? -->
```

---

## Pattern 6: Links

### ✅ Correct

```astro
<!-- Descriptive link text -->
<a href="/cases/marriott">Read Marriott Vacation Club case study</a>

<!-- Icon link with label -->
<a href="https://linkedin.com/in/angelomanzano" aria-label="Visit Angelo on LinkedIn">
  <svg aria-hidden="true" class="icon-linkedin"></svg>
</a>

<!-- "More" link with context -->
<h3>Latest Article</h3>
<p>Summary of the article...</p>
<a href="/article/slug" aria-label="Read full article: Latest Article Title">
  Read more →
</a>

<!-- External link indicator -->
<a href="https://external-site.com">
  External Resource
  <svg aria-hidden="true" class="icon-external"></svg>
</a>
```

**What's happening:**
- Link text describes where it goes
- Icon links have `aria-label` for screen readers
- Ambiguous links have `aria-label` for context
- External links are marked visually + can use `rel="external"`

### ❌ Incorrect

```astro
<!-- Vague "Click here" -->
<a href="/cases/marriott">Click here</a>

<!-- "More" without context -->
<a href="/article">More →</a>  <!-- More what? -->

<!-- Icon with no label -->
<a href="/contact">
  <svg class="icon-envelope"></svg>
</a>  <!-- Screen reader says "link" with no context -->
```

---

## Pattern 7: Skip Links

### ✅ Correct

```astro
<!-- In BaseLayout.astro -->
<body>
  <a href="#main-content" class="skip-link">
    Skip to main content
  </a>

  <nav aria-label="Primary navigation">
    <!-- Navigation content -->
  </nav>

  <main id="main-content" tabindex="-1">
    <!-- Main content -->
  </main>
</body>
```

**CSS:**
```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px 16px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;  /* Visible when focused */
}
```

**What's happening:**
- Skip link is first focusable element
- Hidden off-screen until focused
- Links to `#main-content`
- Keyboard users can bypass nav

### ❌ Incorrect

```astro
<!-- Skip link not first element -->
<nav>...</nav>
<a href="#main-content" class="skip-link">...</a>
<!-- Now it's not the first focusable element -->

<!-- No skip link at all -->
<!-- Keyboard users must tab through entire nav -->
```

---

## Validation Checklist

Run through each page with this checklist:

### Navigation
- [ ] `<nav>` element used (not `<div class="nav">`)
- [ ] `aria-label="Primary navigation"` present
- [ ] Active link has `aria-current="page"`
- [ ] All links have descriptive text

### Main Content
- [ ] `<main id="main-content">` wraps primary content
- [ ] Page has `<h1>` (exactly one per page)
- [ ] Headings are properly nested (h1 → h2 → h3)
- [ ] Sections use `aria-labelledby` or have semantic heading

### Forms
- [ ] All `<input>` elements have `<label>`
- [ ] Labels are associated via `for` attribute
- [ ] Required fields have `aria-required="true"`
- [ ] Error messages have `aria-describedby`
- [ ] Error messages have `role="alert"`

### Images
- [ ] All content images have descriptive `alt` text
- [ ] Decorative images have `alt=""` and `aria-hidden="true"`
- [ ] Icons have `aria-hidden="true"`
- [ ] Images have `width`/`height` attributes

### Links
- [ ] Link text is descriptive (not "click here")
- [ ] Icon-only links have `aria-label`
- [ ] Ambiguous links have `aria-label`
- [ ] External links are marked visually

### Accessibility
- [ ] Skip link visible on focus
- [ ] All interactive elements are keyboard accessible
- [ ] Focus visible on all buttons/links
- [ ] Color contrast ≥ 4.5:1 for text
- [ ] Page language set: `<html lang="en">`

---

## Testing ARIA Labels

### Manual Testing

**Keyboard Navigation:**
```
Tab through page
- All buttons/links receive focus
- Focus indicator visible
- Skip link appears on first Tab
- Tab order makes sense
```

**Screen Reader (VoiceOver on Mac):**
```
Start: ⌘ + F5
Navigate: VO + →/← (next/previous item)
Activate: VO + Space
Headings: VO + U (then arrow keys)
Links: VO + U, then K
Forms: VO + U, then select form
Stop: ⌘ + F5
```

**Screen Reader (NVDA on Windows):**
```
Start: Ctrl + Alt + N
Navigate: ↓/↑ (next/previous)
Activate: Enter/Space
Headings: H/Shift + H
Links: K/Shift + K
Forms: F
Stop: Ctrl + Alt + N
```

### Automated Testing

```bash
# Install axe DevTools
npm install --save-dev @axe-core/cli

# Scan page
axe https://localhost:4321/page
```

---

## Current State on ChrowmDesigns Astro v2

### ✅ Already Implemented

- `<nav aria-label="Primary navigation">` (Nav.astro)
- `aria-current="page"` on active links (Nav.astro:49)
- Skip-to-content link (BaseLayout.astro:89-90)
- `<main id="main-content">` (BaseLayout.astro:95)
- Proper `<footer>` (Footer.astro)
- Image `alt` text on all content images
- Form `<label>` associations (ContactForm.astro)
- Focus indicators (global.css:337)

### ⚠️ Good to Audit

- SVGs: Verify `aria-hidden="true"` on decorative SVGs
- Links: Check for "click here" or vague link text
- Forms: Verify error messages have `aria-describedby`
- Headings: Ensure proper h1→h2→h3 hierarchy on all pages

---

## Templates: Copy & Paste

### New Page Template

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout
  title="Page Title — ChrowmDesigns"
  description="150-160 character description"
>
  <main id="main-content">
    <section aria-labelledby="hero-heading">
      <h1 id="hero-heading">Main Page Heading</h1>
      <p>Content...</p>
    </section>

    <section aria-labelledby="secondary-heading">
      <h2 id="secondary-heading">Secondary Section</h2>
      <p>Content...</p>
    </section>
  </main>

  <Footer />
</BaseLayout>
```

### Form Template

```astro
<form method="POST" novalidate aria-label="Contact form">
  <div class="form-group">
    <label for="name">Full Name *</label>
    <input 
      id="name" 
      type="text" 
      name="name"
      aria-required="true"
      aria-invalid={errors.name ? "true" : "false"}
      aria-describedby={errors.name ? "name-error" : undefined}
    />
    {errors.name && (
      <span id="name-error" role="alert" class="error">
        {errors.name}
      </span>
    )}
  </div>

  <button type="submit">Send Message</button>
</form>
```

---

## Resources

- [W3C ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM: ARIA](https://webaim.org/articles/aria/)
- [MDN: ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [Deque: ARIA Resources](https://www.dequeuniversity.com/resources/aria)
- [A11y Project](https://www.a11yproject.com/)

---

**Last Updated:** 2026-06-23  
**Compliance Level:** WCAG 2.1 Level AA  
**Review Frequency:** Quarterly
