import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "docs", "changelog", "2026-09-19");
const baseUrl = "http://localhost:3000";

const shots = [
  { name: "01-hero-and-stats", selector: "body", clipHeight: 900 },
  { name: "02-transformation-demo", scrollTo: "#pipeline", clipHeight: 900 },
  { name: "03-comparison-section", scrollTo: "#comparison", clipHeight: 900 },
  { name: "04-asset-tabs", scrollTo: "#assets", clipHeight: 900 },
  { name: "05-gatekeeper-demo", scrollTo: "#gatekeeper", clipHeight: 900 },
  { name: "06-demo-form", scrollTo: "#demo-request", clipHeight: 900 },
  { name: "07-footer", scrollTo: "footer", clipHeight: 700 },
];

const run = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(baseUrl, { waitUntil: "networkidle" });

  for (const shot of shots) {
    if (shot.scrollTo) {
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (el) el.scrollIntoView({ block: "start" });
      }, shot.scrollTo);
      await page.waitForTimeout(700);
    } else {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(700);
    }

    const filePath = path.join(outDir, `${shot.name}.png`);
    await page.screenshot({ path: filePath });
    console.log(`Saved ${filePath}`);
  }

  // Mobile hero shot
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(outDir, "08-mobile-hero.png"),
  });
  console.log("Saved mobile hero shot");

  await browser.close();
};

run();
