# Page Metadata Guidelines

**Ensures every page has proper SEO metadata, canonical URLs, and correct permalinks.**

---

## Current State ✅

All pages are currently using BaseLayout to set metadata. Here's what's configured:

| Page | Permalink | Title | Description | OG Image |
|------|-----------|-------|-------------|----------|
| **Homepage** | `/` | ChrowmDesigns | Angelo Manzano Jr. — Senior Product Designer... | (default) |
| **Cases (Index)** | `/cases` | Case Stories | 8 case studies across enterprise UX... | (default) |
| **Case Study: Beat Saber** | `/cases/beat-saber` | Beat Saber — Beat Games | 3 global VR launches... | `/images/beat_saber_hero.webp` |
| **Case Study: Marriott** | `/cases/marriott-vacation-club` | Marriott Vacation Club — Redesign | Enterprise UX redesign... | (custom) |
| **Case Study: Taco Bueno** | `/cases/taco-bueno` | Taco Bueno — Restaurant UX | Point of sale redesign... | (custom) |
| **Case Study: Malibu Rum** | `/cases/malibu-rum` | Malibu Rum — Campaign Design | Social media + web campaign... | (custom) |
| **Case Study: Grounded** | `/cases/grounded` | Grounded Climate Summit | Event site + digital strategy... | (custom) |
| **Case Study: ZzzQuil** | `/cases/zzzquil` | ZzzQuil — Sleep Product | Enterprise marketing site... | (custom) |
| **Case Study: Walt Disney World** | `/cases/walt-disney-world` | Walt Disney World — Enterprise | Digital transformation strategy... | (custom) |
| **Case Study: Carrabbas** | `/cases/carrabbas` | Carrabbas Italian Grill — QSR | Restaurant marketing redesign... | (custom) |
| **Info (About)** | `/info` | Info — ChrowmDesigns | Learn about Angelo Manzano Jr., biography... | (default) |
| **Contact** | `/contact` | Contact — ChrowmDesigns | Get in touch with Angelo Manzano... | `/images/og-contact.webp` |

---

## How It Works

### 1. BaseLayout Component (Metadata Renderer)
**File:** `src/layouts/BaseLayout.astro`

Every page wraps content in `<BaseLayout>` with metadata props:

```astro
<BaseLayout
  title="Page Title — ChrowmDesigns"
  description="150-160 character SEO description with keywords."
  ogImage="/images/og-custom.webp"
  ogType="website|article"
  canonicalURL="https://cdzn.netlify.app/page"
>
  <!-- Page content -->
</BaseLayout>
```

### 2. Props BaseLayout Accepts

| Prop | Type | Required | Default | Purpose |
|------|------|----------|---------|---------|
| `title` | string | ✅ Yes | "ChrowmDesigns" | Page title tag (50-60 chars) |
| `description` | string | ✅ Yes | Site default | Meta description (150-160 chars) |
| `ogImage` | string | ❌ No | `/images/og-default.webp` | Open Graph image for social sharing |
| `ogType` | string | ❌ No | "website" | "website" for pages, "article" for case studies |
| `canonicalURL` | string | ❌ No | Current URL | Canonical URL (auto-detected, rarely needed) |

### 3. Rendered Output

BaseLayout automatically generates:

```html
<!-- Primary Meta -->
<title>Page Title — ChrowmDesigns</title>
<meta name="description" content="150-160 char description with keywords">
<link rel="canonical" href="https://cdzn.netlify.app/page">

<!-- Open Graph (Social Sharing) -->
<meta property="og:title" content="Page Title">
<meta property="og:description" content="150-160 char description">
<meta property="og:image" content="https://cdzn.netlify.app/images/og-custom.webp">
<meta property="og:url" content="https://cdzn.netlify.app/page">
<meta property="og:type" content="website|article">
<meta property="og:site_name" content="ChrowmDesigns">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="150-160 char description">
<meta name="twitter:image" content="https://cdzn.netlify.app/images/og-custom.webp">
```

---

## Template: Creating New Pages

Copy this template for new pages:

### Standard Page (Non-Case Study)

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout
  title="Page Title — ChrowmDesigns"
  description="150-160 character SEO description. Include keywords naturally. Encourage click-through."
  ogImage="/images/og-page.webp"
  ogType="website"
>
  <!-- Page content -->
  <Footer />
</BaseLayout>
```

### Case Study Page

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import CaseHero from '../../components/CaseHero.astro';
import Footer from '../../components/Footer.astro';
---

<BaseLayout
  title="Client Name — Project Type"
  description="Compelling description of the project. Include client name, deliverables, and impact."
  ogImage="/images/[project]_hero.webp"
  ogType="article"
>
  <CaseHero ... />
  <!-- Case content -->
  <Footer />
</BaseLayout>
```

---

## Permalink Structure

Astro automatically generates permalinks based on file structure:

### Rules

| File Path | URL |
|-----------|-----|
| `src/pages/index.astro` | `/` |
| `src/pages/about.astro` | `/about` |
| `src/pages/contact.astro` | `/contact` |
| `src/pages/cases/index.astro` | `/cases` |
| `src/pages/cases/beat-saber.astro` | `/cases/beat-saber` |
| `src/pages/cases/[slug].astro` | `/cases/[dynamic-slug]` |

### Naming Convention

- Use **kebab-case** for multi-word filenames
- Use **descriptive names** that reflect the content
- Use **client or project names** for case studies
- Never use uppercase, spaces, or special characters

Examples:
- ✅ `/cases/walt-disney-world` (correct)
- ❌ `/cases/WaltDisneyWorld` (incorrect)
- ✅ `/cases/marriott-vacation-club` (correct)
- ❌ `/cases/marriott_vc` (vague)

---

## Metadata Checklist

### For All Pages

- [ ] Page has `<BaseLayout>` wrapper
- [ ] `title` is 50-60 characters, includes brand name
- [ ] `description` is 150-160 characters, natural keywords
- [ ] `ogImage` is set (or uses default)
- [ ] Page heading (H1) matches or closely matches title
- [ ] Meta description matches page intent

### For Case Studies Only

- [ ] `ogType="article"` is set
- [ ] Title format: "Client — Project Type"
- [ ] Description includes client, scope, and impact
- [ ] `ogImage` is project hero image
- [ ] Permalink uses kebab-case project name

### For New Pages

- [ ] Permalink matches file path
- [ ] Title is unique across site
- [ ] Description is unique and compelling
- [ ] Page content matches title and description
- [ ] OG image is optimized (1200x630px recommended)

---

## Testing & Verification

### 1. Live Site Test
Visit page on https://cdzn.netlify.app/page and right-click → "View Page Source"
Search for: `<title>`, `<meta name="description"`, `<meta property="og:`

### 2. Social Media Preview
Test on [Twitter Card Validator](https://cards-dev.twitter.com/validator) or [Facebook Debugger](https://developers.facebook.com/tools/debug/)

### 3. Search Console
Add site to [Google Search Console](https://search.google.com/search-console) and monitor:
- Title tag length
- Meta description display
- Mobile usability
- Indexation status

### 4. Lighthouse Audit
Run `npx lighthouse https://cdzn.netlify.app/page`
Verify SEO score is 100/100

---

## Maintenance: Quarterly Audit

Run this to verify all pages have metadata:

```bash
# Check all pages have BaseLayout with title/description
grep -r "title=" src/pages/*.astro | wc -l  # Should equal number of pages

# Check for missing descriptions
grep -L "description=" src/pages/*.astro

# Check case studies have ogType="article"
grep -L 'ogType="article"' src/pages/cases/*.astro
```

---

## Best Practices

### Title Tags
✅ **Good:**
- "Beat Saber — Beat Games | ChrowmDesigns" (client first, descriptive, brand last)
- "Contact — ChrowmDesigns" (page type, brand)

❌ **Bad:**
- "Home" (not descriptive)
- "ChrowmDesigns" (brand only, no value)
- "Beat Saber Case Study - UX Design - Client Work - ChrowmDesigns" (too long)

### Meta Descriptions
✅ **Good:**
- "3 global VR launches. One scalable visual system for Beat Saber, honoring Britney, Metallica, and Monstercat."

❌ **Bad:**
- "This is a case study" (vague)
- "Lorem ipsum..." (not descriptive)
- Single word or number

### OG Images
✅ **Good:**
- Use **hero image** from project
- Size: **1200x630px** minimum (1.91:1 ratio)
- Format: **.webp** for modern browsers
- Include **recognizable content** (not generic)

❌ **Bad:**
- Default logo or placeholder
- Wrong aspect ratio (won't display properly)
- Old or low-quality image

---

## Common Issues & Solutions

### Issue: Title Shows "ChrowmDesigns" on Every Page
**Cause:** BaseLayout not receiving title prop
**Solution:** Check page passes `title="..."` to `<BaseLayout>`

### Issue: OG Image Not Showing on Social
**Cause:** Image path incorrect or image too small
**Solution:** 
1. Verify image exists at path
2. Check image is at least 1200x630px
3. Test with [Facebook Debugger](https://developers.facebook.com/tools/debug/)

### Issue: SEO Score 95/100 (Not 100)
**Cause:** Usually missing canonical URL or `lang` attribute
**Solution:** BaseLayout handles both automatically, verify no overrides

### Issue: Duplicate Content Warning
**Cause:** Multiple pages with same title/description
**Solution:** Ensure each page has unique title and description

---

## Resources

- [Google Search Central: Title & Description](https://developers.google.com/search/docs/appearance/title-link)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Lighthouse Audit](https://developers.google.com/web/tools/lighthouse)

---

**Last Updated:** 2026-06-23  
**Maintained By:** Claude Code  
**Review Frequency:** Quarterly
