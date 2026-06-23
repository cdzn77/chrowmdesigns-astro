#!/usr/bin/env node

/**
 * Comprehensive SEO & Accessibility Validation
 * Validates metadata (titles/descriptions) AND ARIA labels on all pages
 *
 * Usage:
 *   node scripts/validate-seo-a11y.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.join(__dirname, '../src/pages');

const METADATA_REQUIREMENTS = {
  minTitleLength: 10,
  maxTitleLength: 60,
  minDescriptionLength: 50,
  maxDescriptionLength: 160,
};

const ARIA_CHECKS = {
  mainContent: { pattern: /<main[^>]*id="main-content"/, message: 'main#main-content' },
  h1Present: { pattern: /<h1/, message: 'h1 element' },
  navLabel: { pattern: /<nav[^>]*aria-label/, message: 'nav aria-label' },
  formLabels: { pattern: /<label[^>]*for=/, message: 'form labels' },
  altText: { pattern: /alt=/, message: 'image alt text' },
  skipLink: { pattern: /skip.{0,30}content|skip-link/i, message: 'skip link' },
};

let issues = [];
let passes = [];
let stats = { total: 0, withAria: 0, withoutAria: 0 };

function validateFile(filePath, relativePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  stats.total++;

  // ========== METADATA VALIDATION ==========

  const baseLayoutMatch = content.match(/<BaseLayout\s*([^>]*?)>/s);
  if (!baseLayoutMatch) {
    issues.push({
      file: relativePath,
      type: 'structure',
      severity: 'critical',
      message: '❌ Missing <BaseLayout> wrapper',
    });
    stats.withoutAria++;
    return;
  }

  const props = baseLayoutMatch[1];

  // Check title
  const titleMatch = props.match(/title="([^"]+)"/);
  if (!titleMatch) {
    issues.push({
      file: relativePath,
      type: 'metadata:title',
      severity: 'critical',
      message: '❌ Missing title prop',
    });
  } else {
    const title = titleMatch[1];
    if (title.length < METADATA_REQUIREMENTS.minTitleLength) {
      issues.push({
        file: relativePath,
        type: 'metadata:title',
        severity: 'warning',
        message: `⚠️ Title too short (${title.length} chars): "${title}"`,
      });
    } else if (title.length > METADATA_REQUIREMENTS.maxTitleLength) {
      issues.push({
        file: relativePath,
        type: 'metadata:title',
        severity: 'warning',
        message: `⚠️ Title too long (${title.length} chars): "${title}"`,
      });
    } else {
      passes.push({ file: relativePath, check: 'Title', value: title });
    }
  }

  // Check description
  const descMatch = props.match(/description="([^"]+)"/);
  if (!descMatch) {
    issues.push({
      file: relativePath,
      type: 'metadata:description',
      severity: 'critical',
      message: '❌ Missing description prop',
    });
  } else {
    const desc = descMatch[1];
    if (desc.length < METADATA_REQUIREMENTS.minDescriptionLength) {
      issues.push({
        file: relativePath,
        type: 'metadata:description',
        severity: 'warning',
        message: `⚠️ Description too short (${desc.length} chars)`,
      });
    } else if (desc.length > METADATA_REQUIREMENTS.maxDescriptionLength) {
      issues.push({
        file: relativePath,
        type: 'metadata:description',
        severity: 'warning',
        message: `⚠️ Description too long (${desc.length} chars)`,
      });
    } else {
      passes.push({ file: relativePath, check: 'Description', value: `${desc.substring(0, 40)}...` });
    }
  }

  // ========== ARIA/ACCESSIBILITY VALIDATION ==========

  let ariaScore = 0;
  let ariaChecks = 0;

  // Check <main id="main-content">
  if (ARIA_CHECKS.mainContent.pattern.test(content)) {
    passes.push({ file: relativePath, check: 'main#main-content', value: '✓' });
    ariaScore++;
  } else {
    issues.push({
      file: relativePath,
      type: 'aria:structure',
      severity: 'high',
      message: '❌ Missing <main id="main-content">',
    });
  }
  ariaChecks++;

  // Check <h1>
  if (ARIA_CHECKS.h1Present.pattern.test(content)) {
    passes.push({ file: relativePath, check: '<h1> present', value: '✓' });
    ariaScore++;
  } else {
    issues.push({
      file: relativePath,
      type: 'aria:heading',
      severity: 'high',
      message: '❌ Missing <h1> heading',
    });
  }
  ariaChecks++;

  // Check <nav aria-label> or semantic nav
  if (content.includes('<nav') || ARIA_CHECKS.navLabel.pattern.test(content)) {
    if (content.includes('<nav') && ARIA_CHECKS.navLabel.pattern.test(content)) {
      passes.push({ file: relativePath, check: 'nav aria-label', value: '✓' });
      ariaScore++;
    } else if (content.includes('<nav') && !ARIA_CHECKS.navLabel.pattern.test(content)) {
      issues.push({
        file: relativePath,
        type: 'aria:navigation',
        severity: 'medium',
        message: '⚠️ <nav> missing aria-label',
      });
    }
  }
  ariaChecks++;

  // Check form labels (if page has form)
  if (content.includes('<input') || content.includes('<textarea') || content.includes('<select')) {
    if (ARIA_CHECKS.formLabels.pattern.test(content)) {
      passes.push({ file: relativePath, check: 'Form labels', value: '✓' });
      ariaScore++;
    } else {
      issues.push({
        file: relativePath,
        type: 'aria:forms',
        severity: 'high',
        message: '⚠️ Form inputs missing associated labels',
      });
    }
  }
  ariaChecks++;

  // Check alt text on images
  if (content.includes('<img')) {
    const imgMatches = content.match(/<img[^>]*>/g) || [];
    const withAlt = imgMatches.filter(img => /alt=/.test(img)).length;
    if (withAlt === imgMatches.length) {
      passes.push({ file: relativePath, check: 'Image alt text', value: `${withAlt}/${imgMatches.length}` });
      ariaScore++;
    } else {
      issues.push({
        file: relativePath,
        type: 'aria:images',
        severity: 'high',
        message: `⚠️ ${imgMatches.length - withAlt} images missing alt text`,
      });
    }
  }
  ariaChecks++;

  // Check skip link
  if (ARIA_CHECKS.skipLink.pattern.test(content)) {
    passes.push({ file: relativePath, check: 'Skip link', value: '✓' });
    ariaScore++;
  }
  ariaChecks++;

  // Track ARIA compliance
  if (ariaScore === ariaChecks) {
    stats.withAria++;
  } else {
    stats.withoutAria++;
  }
}

function walkPages(dir, relative = '') {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const relPath = path.join(relative, file);

    if (fs.statSync(fullPath).isDirectory()) {
      walkPages(fullPath, relPath);
    } else if (file.endsWith('.astro')) {
      validateFile(fullPath, relPath);
    }
  }
}

// Main
console.log('\n📋 SEO & ACCESSIBILITY VALIDATION\n');
walkPages(PAGES_DIR);

// Output results
console.log('═══════════════════════════════════════════════════════\n');

if (passes.length > 0) {
  console.log('✅ PASSING CHECKS\n');
  const groupedByFile = {};
  passes.forEach(p => {
    if (!groupedByFile[p.file]) {
      groupedByFile[p.file] = [];
    }
    groupedByFile[p.file].push(p);
  });

  Object.entries(groupedByFile).forEach(([file, checks]) => {
    console.log(`  ${file}`);
    checks.forEach(c => {
      console.log(`    ✓ ${c.check}: ${c.value}`);
    });
    console.log('');
  });
}

if (issues.length > 0) {
  console.log('\n⚠️ ISSUES FOUND\n');

  // Critical issues
  const critical = issues.filter(i => i.severity === 'critical');
  if (critical.length > 0) {
    console.log('🔴 CRITICAL:\n');
    critical.forEach(issue => {
      console.log(`  ${issue.file}`);
      console.log(`    ${issue.message}\n`);
    });
  }

  // High severity
  const high = issues.filter(i => i.severity === 'high');
  if (high.length > 0) {
    console.log('🟠 HIGH PRIORITY:\n');
    high.forEach(issue => {
      console.log(`  ${issue.file}`);
      console.log(`    ${issue.message}\n`);
    });
  }

  // Medium/warnings
  const medium = issues.filter(i => i.severity === 'medium' || i.severity === 'warning');
  if (medium.length > 0) {
    console.log('🟡 WARNINGS:\n');
    medium.forEach(issue => {
      console.log(`  ${issue.file}`);
      console.log(`    ${issue.message}\n`);
    });
  }
}

console.log('═══════════════════════════════════════════════════════\n');
console.log('Summary:');
console.log(`  Total pages: ${stats.total}`);
console.log(`  With full ARIA: ${stats.withAria}`);
console.log(`  Need ARIA work: ${stats.withoutAria}`);
console.log(`  Total checks passed: ${passes.length}`);
console.log(`  Total issues found: ${issues.length}\n`);

const criticalCount = issues.filter(i => i.severity === 'critical').length;
process.exit(criticalCount > 0 ? 1 : 0);
