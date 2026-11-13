/**
 * Comprehensive HTML & DOM ID validator script for RoadPulse monorepo.
 * Verifies doctype, tag balancing, and JavaScript getElementById references.
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const htmlPath = path.join(rootDir, 'apps/landing/index.html');
const jsDir = path.join(rootDir, 'apps/landing/js');

let hasErrors = false;

if (!fs.existsSync(htmlPath)) {
  console.error(`[FATAL] File not found: ${htmlPath}`);
  process.exit(1);
}

const htmlContent = fs.readFileSync(htmlPath, 'utf8');
console.log(`[VALIDATING] apps/landing/index.html...`);

// 1. Check Doctype (case-insensitive)
if (!/^<!doctype\s+html>/i.test(htmlContent.trim())) {
  console.error(`  [ERROR] Missing standard <!DOCTYPE html> declaration.`);
  hasErrors = true;
}

// 2. Check Tag Balancing
const checkedTags = ['div', 'section', 'header', 'footer', 'ul', 'li', 'button', 'main', 'nav', 'form', 'aside'];
checkedTags.forEach(tag => {
  const openMatches = htmlContent.match(new RegExp(`<${tag}[\\s>]`, 'gi')) || [];
  const closeMatches = htmlContent.match(new RegExp(`</${tag}>`, 'gi')) || [];
  if (openMatches.length !== closeMatches.length) {
    console.error(`  [ERROR] Unbalanced <${tag}> tags: ${openMatches.length} opened, ${closeMatches.length} closed.`);
    hasErrors = true;
  }
});

// 3. Check JavaScript getElementById DOM References
const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
const referencedIds = new Set();

jsFiles.forEach(jsFile => {
  const jsContent = fs.readFileSync(path.join(jsDir, jsFile), 'utf8');
  const regex = /getElementById\(['"]([^'"]+)['"]\)/g;
  let match;
  while ((match = regex.exec(jsContent)) !== null) {
    referencedIds.add(match[1]);
  }
});

console.log(`  [INFO] Checking ${referencedIds.size} DOM IDs referenced in JS files...`);
const missingIds = [];
referencedIds.forEach(id => {
  if (!htmlContent.includes(`id="${id}"`) && !htmlContent.includes(`id='${id}'`)) {
    missingIds.push(id);
  }
});

if (missingIds.length > 0) {
  console.error(`  [ERROR] Missing DOM elements for IDs: ${missingIds.join(', ')}`);
  hasErrors = true;
} else {
  console.log(`  [PASSED] All ${referencedIds.size} referenced DOM IDs found in index.html.`);
}

if (hasErrors) {
  console.error('\n[FAILED] HTML validation failed with errors.');
  process.exit(1);
} else {
  console.log('\n[SUCCESS] HTML & DOM validation passed cleanly.');
}
