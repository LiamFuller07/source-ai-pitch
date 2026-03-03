#!/usr/bin/env node
// Capture rendered page screenshots for PPT export using Playwright.
import { chromium } from 'playwright';
import { mkdirSync, rmSync, existsSync } from 'fs';
import { join } from 'path';

const args = process.argv.slice(2);
const modeArg = args.find((arg) => arg.startsWith('--mode='));
const siteArg = args.find((arg) => arg.startsWith('--site='));

const mode = modeArg ? modeArg.split('=')[1] : 'slides';
const siteFromArg = siteArg ? siteArg.split('=')[1] : undefined;
const SITE = siteFromArg || process.env.SITE_URL || 'http://localhost:3000';
const DIR = join(import.meta.dirname, 'screenshots');

// Clean & create output dir
if (existsSync(DIR)) rmSync(DIR, { recursive: true, force: true });
mkdirSync(DIR, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1920, height: 1080 });
await page.goto(SITE, { waitUntil: 'networkidle' });
await page.waitForLoadState('networkidle');
await page.waitForTimeout(1200);

// Hide the nav dots and download button so they don't appear in screenshots
await page.evaluate(() => {
  document.querySelectorAll('nav, a[download]').forEach((el) => {
    el.style.visibility = 'hidden';
  });
});

if (mode === 'main') {
  await page.screenshot({
    path: join(DIR, 'slide-00.png'),
  });
  await browser.close();
  console.log(`Done. Main page screenshot saved to ${DIR}`);
  process.exit(0);
}

if (mode !== 'slides') {
  await browser.close();
  console.error(`Unsupported mode: "${mode}". Use --mode=slides or --mode=main.`);
  process.exit(1);
}

const sections = await page.$$('section');
console.log(`Found ${sections.length} slide sections`);

for (let i = 0; i < sections.length; i++) {
  // Scroll section into view
  await sections[i].scrollIntoViewIfNeeded();
  await page.waitForTimeout(500); // wait for animations/paint

  // Take screenshot of viewport
  const padded = String(i).padStart(2, '0');
  await page.screenshot({
    path: join(DIR, `slide-${padded}.png`),
  });
  console.log(`  Slide ${i + 1} captured`);
}

await browser.close();
console.log(`Done. ${sections.length} screenshots saved to ${DIR}`);
