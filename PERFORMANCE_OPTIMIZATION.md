# Performance Optimization Report

**Date:** 2026-06-23  
**Baseline Lighthouse Score:** Performance 63/100  
**Target:** 80+/100  

---

## Optimizations Implemented

### ✅ P1: Hero Video Optimization
**File:** `src/components/HeroVideo.astro`  
**Change:** Video preload strategy
- Changed `preload="auto"` → `preload="metadata"`
- **Impact:** Prevents browser from downloading entire video file before it's needed
- **Expected Improvement:** -1.5 to 2s LCP

**Why this matters:**
- `preload="auto"` forces the browser to download the entire video during initial load
- `preload="metadata"` only downloads video metadata (duration, dimensions), deferring content until playback
- Hero video is autoplay, so it starts immediately, but metadata-only loading is faster for initial LCP measurement

---

### ✅ P2: Font Loading Optimization (Already in Place)
**File:** `src/styles/global.css`  
**Status:** ✅ Already optimized
- Font import uses `display=swap` parameter
- Self-hosted font uses `font-display: swap`
- Ensures text is visible immediately, fonts swap in when ready

**Already implemented from P2 session:**
- Consolidated all font imports to single @import (line 5)
- Removed duplicate @import from HeroVideo, StatsMarquee, Nav components
- Saved ~50-100KB per page load

---

### ✅ P3: Critical Path Optimization
**File:** `src/layouts/BaseLayout.astro`  
**Changes:**
1. Added DNS prefetch for Google Fonts
2. Added preconnect to fonts.googleapis.com and fonts.gstatic.com
3. Optimized head element ordering

**Code added:**
```html
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

**Impact:**
- Reduces DNS lookup time for fonts.googleapis.com
- Establishes TLS connection early
- **Expected Improvement:** -400 to 800ms FCP

---

## Performance Chain of Changes

### Current Metrics (Before)
| Metric | Value | Status |
|--------|-------|--------|
| LCP | 6.8s | ⚠️ Poor |
| FCP | 5.1s | ⚠️ Poor |
| Performance Score | 63/100 | ⚠️ |

### Expected Metrics (After Optimizations)
| Metric | Value | Status | Improvement |
|--------|-------|--------|-------------|
| LCP | ~4.5-5.0s | ⚠️ Improved | -1.5-2.0s |
| FCP | ~4.0-4.5s | ⚠️ Improved | -0.4-1.0s |
| TBT | 0ms | ✅ Maintained | No change |
| CLS | 0 | ✅ Maintained | No change |
| Performance Score | ~75-80/100 | ✅ Good | +12-17pts |

---

## What We Did NOT Change (& Why)

### 1. Image Optimization
✅ **Already Optimized:**
- `CaseCard.astro`: Uses `loading="lazy"` + `decoding="async"` + dimensions
- `index.astro`: Featured image uses `loading="lazy"` + `decoding="async"` + dimensions
- `info.astro`: Biography image uses `loading="lazy"` + `decoding="async"` + dimensions
- `cases/index.astro`: First 2 cards load eagerly, rest lazy

**Why no changes:** Images are already properly optimized with lazy loading strategy.

### 2. Script Optimization
✅ **No Third-Party Scripts Found**
- No Google Analytics, tracking pixels, or heavy third-party libraries
- Only Astro's built-in View Transitions (client-side router)
- No render-blocking scripts

**Why no changes:** The site is already lean on scripts.

### 3. CSS Minification
✅ **Already Handled by Astro**
- Astro automatically minifies CSS in production builds
- No manual changes needed

---

## Testing & Validation

### How to Verify Improvements

Run Lighthouse again:
```bash
npx lighthouse http://localhost:4321 --output json --output-path report-after.json
```

Compare scores:
```bash
# View both reports side-by-side
jq '.categories' report-before.json report-after.json
```

### Expected Test Results
- **LCP should drop 1.5-2.0 seconds** (video preload)
- **FCP should drop 0.4-1.0 seconds** (font preconnect)
- **TBT and CLS should remain perfect** (no changes)

---

## Architecture Decisions

### Why Preload=Metadata for Autoplay Video?
The hero video is autoplay, which means it starts immediately. However:
1. Browser still needs to load video chunks as playback progresses
2. Metadata-only preload avoids loading the entire file during page load
3. Video chunks stream in as needed during playback
4. User perceives faster page load, not slower video playback

### Why Preconnect > Prefetch for Fonts?
- `dns-prefetch`: Resolves DNS only (~5-50ms savings)
- `preconnect`: Establishes full TLS connection (~100-300ms savings)
- Fonts are critical for rendering, so preconnect is worth the overhead

---

## Remaining Optimization Opportunities (Future)

### P4: Image Compression
- Convert high-res images to multiple sizes with srcset
- Implement AVIF format for newer browsers
- Use picture element for art direction
- **Impact:** Could save additional 0.5-1s LCP

### P5: Code Splitting
- Lazy-load below-fold sections with Astro's `client:lazy`
- Code-split skill cards and case cards
- **Impact:** Could improve TTI by 0.5-1s

### P6: CDN & Caching
- Ensure Netlify gzip compression is enabled
- Add Cache-Control headers (handled by Netlify)
- **Impact:** Already likely handled by Netlify deployment

### P7: Video Format Optimization
- Provide smaller .webm file size
- Consider HLS stream or mp4 alternative formats
- **Impact:** Could save 0.5s LCP on slower connections

---

## Commit Message

```
feat: Optimize performance — video preload + font preconnect

- Change hero video preload from 'auto' to 'metadata' to defer
  non-critical video content loading (~1.5-2s LCP improvement)
- Add DNS prefetch and preconnect hints for fonts.googleapis.com
  to establish connections early (~400-800ms FCP improvement)
- Expected Lighthouse performance score improvement: 63 → 75-80

Addresses Lighthouse audit findings for LCP (6.8s) and FCP (5.1s).
Already optimized: image lazy loading, font consolidation, no
render-blocking scripts.
```

---

## Rollback Instructions

If performance regresses:
```bash
# Revert video preload change
git show HEAD:src/components/HeroVideo.astro | grep -A 5 "preload="

# Revert preconnect hints
git show HEAD:src/layouts/BaseLayout.astro | grep -A 2 "preconnect"
```

Both changes are additive (no breaking changes), so safe to test live.

---

**Status:** ✅ Ready for testing  
**Next Step:** Re-run Lighthouse and compare metrics
