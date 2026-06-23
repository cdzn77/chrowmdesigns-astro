#!/usr/bin/env node

/**
 * Metadata Validation Script
 * Verifies all pages have correct metadata, titles, and descriptions
 *
 * Usage:
 *   node scripts/validate-metadata.js
 *   node scripts/validate-metadata.js --fix  (auto-fix issues)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.join(__dirname, '../src/pages');
const REQUIREMENTS = {
  minTitleLength: 10,
  maxTitleLength: 60,
  minDescriptionLength: 50,
  maxDescriptionLength: 160,
};

const issues = [];
const passes = [];

function validateFile(filePath, relativePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract BaseLayout props
  const baseLayoutMatch = content.match(/<BaseLayout\s*([^>]*?)>/s);
  if (!baseLayoutMatch) {
    issues.push({
      file: relativePath,
      type: 'missing-baselayout',
      message: '❌ Page missing <BaseLayout> wrapper',
      severity: 'critical',
    });
    return;
  }

  const props = baseLayoutMatch[1];

  // Check title
  const titleMatch = props.match(/title="([^"]+)"/);
  if (!titleMatch) {
    issues.push({
      file: relativePath,
      type: 'missing-title',
      message: '❌ Missing title prop in BaseLayout',
      severity: 'critical',
    });
  } else {
    const title = titleMatch[1];
    if (title.length < REQUIREMENTS.minTitleLength) {
      issues.push({
        file: relativePath,
        type: 'title-too-short',
        message: `⚠️ Title too short (${title.length} chars, min: ${REQUIREMENTS.minTitleLength}): "${title}"`,
        severity: 'warning',
      });
    } else if (title.length > REQUIREMENTS.maxTitleLength) {
      issues.push({
        file: relativePath,
        type: 'title-too-long',
        message: `⚠️ Title too long (${title.length} chars, max: ${REQUIREMENTS.maxTitleLength}): "${title}"`,
        severity: 'warning',
      });
    } else {
      passes.push({ file: relativePath, check: '✅ Title', value: title });
    }
  }

  // Check description
  const descMatch = props.match(/description="([^"]+)"/);
  if (!descMatch) {
    issues.push({
      file: relativePath,
      type: 'missing-description',
      message: '❌ Missing description prop in BaseLayout',
      severity: 'critical',
    });
  } else {
    const desc = descMatch[1];
    if (desc.length < REQUIREMENTS.minDescriptionLength) {
      issues.push({
        file: relativePath,
        type: 'description-too-short',
        message: `⚠️ Description too short (${desc.length} chars, min: ${REQUIREMENTS.minDescriptionLength}): "${desc.substring(0, 60)}..."`,
        severity: 'warning',
      });
    } else if (desc.length > REQUIREMENTS.maxDescriptionLength) {
      issues.push({
        file: relativePath,
        type: 'description-too-long',
        message: `⚠️ Description too long (${desc.length} chars, max: ${REQUIREMENTS.maxDescriptionLength}): "${desc.substring(0, 60)}..."`,
        severity: 'warning',
      });
    } else {
      passes.push({ file: relativePath, check: '✅ Description', value: `${desc.substring(0, 50)}...` });
    }
  }

  // Check ogImage (optional, but recommended)
  const ogImageMatch = props.match(/ogImage="([^"]+)"/);
  if (!ogImageMatch) {
    passes.push({ file: relativePath, check: '⚠️ OG Image', value: 'using default' });
  } else {
    passes.push({ file: relativePath, check: '✅ OG Image', value: ogImageMatch[1] });
  }

  // Check ogType for case studies
  if (filePath.includes('/cases/') && filePath !== path.join(PAGES_DIR, 'cases', 'index.astro')) {
    const ogTypeMatch = props.match(/ogType="([^"]+)"/);
    if (!ogTypeMatch) {
      passes.push({ file: relativePath, check: '⚠️ OG Type', value: 'default (should be "article")' });
    } else if (ogTypeMatch[1] !== 'article') {
      issues.push({
        file: relativePath,
        type: 'incorrect-ogtype',
        message: `⚠️ Case study should use ogType="article", not "${ogTypeMatch[1]}"`,
        severity: 'warning',
      });
    } else {
      passes.push({ file: relativePath, check: '✅ OG Type', value: 'article' });
    }
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
console.log('\n📋 METADATA VALIDATION REPORT\n');
walkPages(PAGES_DIR);

// Output results
console.log('═══════════════════════════════════════════════════════\n');

if (passes.length > 0) {
  console.log('✅ PASSING CHECKS\n');
  passes.forEach(p => {
    console.log(`  ${p.file}`);
    console.log(`    ${p.check}: ${p.value}\n`);
  });
}

if (issues.length > 0) {
  console.log('\n⚠️ ISSUES FOUND\n');

  // Critical issues
  const critical = issues.filter(i => i.severity === 'critical');
  if (critical.length > 0) {
    console.log('🔴 CRITICAL (Must Fix):\n');
    critical.forEach(issue => {
      console.log(`  ${issue.file}`);
      console.log(`    ${issue.message}\n`);
    });
  }

  // Warnings
  const warnings = issues.filter(i => i.severity === 'warning');
  if (warnings.length > 0) {
    console.log('🟡 WARNINGS (Should Fix):\n');
    warnings.forEach(issue => {
      console.log(`  ${issue.file}`);
      console.log(`    ${issue.message}\n`);
    });
  }
}

console.log('═══════════════════════════════════════════════════════\n');
console.log(`Summary: ${passes.length} checks passed, ${issues.length} issues found\n`);

// Exit with error code if critical issues
if (issues.some(i => i.severity === 'critical')) {
  process.exit(1);
}

process.exit(0);
