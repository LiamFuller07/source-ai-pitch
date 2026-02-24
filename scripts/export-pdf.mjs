import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";

const SLIDE_COUNT = 11;
const WIDTH = 1920;
const HEIGHT = 1080;
const OUTPUT = path.resolve("public/Source-AI-Pitch-Deck.pdf");
const SCREENSHOTS_DIR = path.resolve("scripts/screenshots");

async function main() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  console.log("Launching browser...");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: WIDTH, height: HEIGHT });

  const url = process.argv[2] || "http://localhost:3000";
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

  // Wait for web fonts to fully load
  console.log("Waiting for fonts to load...");
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.waitForTimeout(2000);

  // Hide nav dots, download button, and "click or press arrow" prompt
  await page.evaluate(() => {
    // Hide nav
    const nav = document.querySelector("nav");
    if (nav) nav.style.display = "none";
    // Hide download link
    document.querySelectorAll("a").forEach((a) => {
      if (a.textContent?.includes("Download")) a.style.display = "none";
    });
    // Hide "click or press arrow" text
    document.querySelectorAll("*").forEach((el) => {
      if (el.textContent?.includes("CLICK OR PRESS ARROW") && el.children.length < 3) {
        el.style.display = "none";
      }
    });
  });

  const screenshots = [];

  for (let i = 0; i < SLIDE_COUNT; i++) {
    console.log(`Capturing slide ${i + 1}/${SLIDE_COUNT}...`);

    // Scroll to the slide
    await page.evaluate((index) => {
      const sections = document.querySelectorAll("section");
      if (sections[index]) {
        sections[index].scrollIntoView({ behavior: "instant" });
      }
    }, i);

    await page.waitForTimeout(500);

    // Click rapidly to advance through all PresentationController steps.
    // Some slides (WhyPartner, AiReplacesChain) need multiple clicks to reveal all content.
    // Max steps per slide is about 10, click more than enough times.
    for (let click = 0; click < 15; click++) {
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(80);
    }

    // Wait for all staggered animations to complete (longest chains ~3s)
    await page.waitForTimeout(3000);

    // Force ALL elements to their final animated state
    await page.evaluate((slideIndex) => {
      const sections = document.querySelectorAll("section");
      const section = sections[slideIndex];
      if (!section) return;

      // Force every element within this section to be visible
      section.querySelectorAll("*").forEach((el) => {
        const cs = window.getComputedStyle(el);
        // If computed opacity is 0 or very low, force it visible
        if (parseFloat(cs.opacity) < 0.1 && el.childElementCount === 0) {
          el.style.setProperty("opacity", "1", "important");
          el.style.setProperty("transform", "none", "important");
        }
      });

      // Also force any elements with inline opacity: 0
      section.querySelectorAll("[style]").forEach((el) => {
        if (el.style.opacity === "0") {
          el.style.setProperty("opacity", "1", "important");
          el.style.setProperty("transform", "none", "important");
        }
        // Fix scaleX(0) timeline bars
        if (el.style.transform?.includes("scaleX(0)")) {
          el.style.transform = el.style.transform.replace(/scaleX\([^)]*\)/g, "scaleX(1)");
        }
      });
    }, i);

    // Hide the "click or press arrow" prompt again (it might have reappeared)
    await page.evaluate(() => {
      document.querySelectorAll("*").forEach((el) => {
        const text = el.textContent?.trim();
        if (
          text &&
          (text.includes("CLICK OR PRESS ARROW") || text.includes("click or press arrow")) &&
          el.children.length < 3
        ) {
          el.style.setProperty("display", "none", "important");
        }
      });
      // Also hide the slide counter (e.g. "0 / 7")
      document.querySelectorAll("*").forEach((el) => {
        if (el.textContent?.match(/^\d+\s*\/\s*\d+$/) && el.children.length === 0) {
          el.style.setProperty("display", "none", "important");
        }
      });
    });

    await page.waitForTimeout(300);

    const screenshotPath = path.join(
      SCREENSHOTS_DIR,
      `slide-${String(i + 1).padStart(2, "0")}.png`
    );
    await page.screenshot({ path: screenshotPath, type: "png" });
    screenshots.push(screenshotPath);
  }

  await browser.close();
  console.log("Browser closed. Building PDF...");

  const pdfDoc = await PDFDocument.create();

  for (const screenshotPath of screenshots) {
    const imgBytes = fs.readFileSync(screenshotPath);
    const img = await pdfDoc.embedPng(imgBytes);

    const pageWidth = 960;
    const pageHeight = 540;
    const pdfPage = pdfDoc.addPage([pageWidth, pageHeight]);
    pdfPage.drawImage(img, {
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight,
    });
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(OUTPUT, pdfBytes);
  console.log(
    `PDF saved to ${OUTPUT} (${(pdfBytes.length / 1024 / 1024).toFixed(1)} MB)`
  );
  console.log("Screenshots saved in scripts/screenshots/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
