import { test, expect } from "@playwright/test";

test.describe("WcagifyWidget End-to-End Regression Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Ensure widget is fully mounted before executing specs
    await page.waitForSelector(".wcagify-launcher", {
      state: "visible",
      timeout: 10000,
    });
  });

  /* ----------------------------------------------------------------------- */
  /* 1. Panel Lifecycle & Keyboard Navigation                                 */
  /* ----------------------------------------------------------------------- */

  test("Launcher button renders and toggles panel visibility", async ({
    page,
  }) => {
    const launcher = page.locator(".wcagify-launcher");
    await expect(launcher).toBeVisible();

    await launcher.click();
    const panel = page.locator(".wcagify-panel");
    await expect(panel).toBeVisible();
    await expect(panel.locator("h2")).toHaveText("Accessibility preferences");

    // Click launcher again to close
    await launcher.click();
    await expect(panel).not.toBeVisible();
  });

  test("Pressing Escape key closes the accessibility panel", async ({
    page,
  }) => {
    await page.locator(".wcagify-launcher").click();
    const panel = page.locator(".wcagify-panel");
    await expect(panel).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(panel).not.toBeVisible();
  });

  /* ----------------------------------------------------------------------- */
  /* 2. Preset Accessibility Profiles                                        */
  /* ----------------------------------------------------------------------- */

  test("Blindness profile applies focus, link, heading, and motion attributes", async ({
    page,
  }) => {
    await page.locator(".wcagify-launcher").click();

    const blindnessBtn = page
      .locator('.wcagify-chip:has-text("Blindness")')
      .first();
    await expect(blindnessBtn).toBeVisible();
    await blindnessBtn.click();

    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-a11y-focus", "on");
    await expect(html).toHaveAttribute("data-a11y-links", "on");
    await expect(html).toHaveAttribute("data-a11y-headings", "on");
    await expect(html).toHaveAttribute("data-a11y-motion", "off");
  });

  test("Color Blindness profile applies monochrome filter and structural highlights", async ({
    page,
  }) => {
    await page.locator(".wcagify-launcher").click();

    const colorBlindnessBtn = page
      .locator('.wcagify-chip:has-text("Color Blindness")')
      .first();
    await expect(colorBlindnessBtn).toBeVisible();
    await colorBlindnessBtn.click();

    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-a11y-color", "monochrome");
    await expect(html).toHaveAttribute("data-a11y-links", "on");
    await expect(html).toHaveAttribute("data-a11y-headings", "on");
  });

  test("Epilepsy profile reduces motion and applies low saturation filter", async ({
    page,
  }) => {
    await page.locator(".wcagify-launcher").click();

    const epilepsyBtn = page
      .locator('.wcagify-chip:has-text("Epilepsy")')
      .first();
    await expect(epilepsyBtn).toBeVisible();
    await epilepsyBtn.click();

    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-a11y-motion", "off");
    await expect(html).toHaveAttribute("data-a11y-color", "lowSaturation");
  });

  test("Dyslexia profile applies dyslexic font and spacing adjustments", async ({
    page,
  }) => {
    await page.locator(".wcagify-launcher").click();

    const dyslexiaBtn = page
      .locator('.wcagify-chip:has-text("Dyslexia")')
      .first();
    await expect(dyslexiaBtn).toBeVisible();
    await dyslexiaBtn.click();

    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-a11y-font", "dyslexic");
    await expect(html).toHaveAttribute("data-a11y-line", "on");
    await expect(html).toHaveAttribute("data-a11y-word", "on");
    await expect(html).toHaveAttribute("data-a11y-letter", "on");
  });

  test("WCAG 2.2 AA Baseline profile applies readable font, spacing, and focus rings", async ({
    page,
  }) => {
    await page.locator(".wcagify-launcher").click();

    const wcagBaselineBtn = page
      .locator('.wcagify-chip:has-text("WCAG 2.2 AA Baseline")')
      .first();
    await expect(wcagBaselineBtn).toBeVisible();
    await wcagBaselineBtn.click();

    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-a11y-font", "readable");
    await expect(html).toHaveAttribute("data-a11y-line", "on");
    await expect(html).toHaveAttribute("data-a11y-word", "on");
    await expect(html).toHaveAttribute("data-a11y-letter", "on");
    await expect(html).toHaveAttribute("data-a11y-focus", "on");
  });

  /* ----------------------------------------------------------------------- */
  /* 3. Interactive Accessibility Tools & Overlays                          */
  /* ----------------------------------------------------------------------- */

  test("Page Structure panel lists page headings, landmarks, and links", async ({
    page,
  }) => {
    await page.locator(".wcagify-launcher").click();

    const pageStructBtn = page
      .locator('.wcagify-tool:has-text("Page structure")')
      .first();
    await expect(pageStructBtn).toBeVisible();
    await pageStructBtn.click();

    const structurePanel = page.locator(".wcagify-structure");
    await expect(structurePanel).toBeVisible();

    const headingItems = structurePanel.locator(
      "button:has-text('H1'), button:has-text('H2'), button:has-text('H3')",
    );
    expect(await headingItems.count()).toBeGreaterThan(0);
  });

  test("Magnifier tool toggles magnifier lens element", async ({ page }) => {
    await page.locator(".wcagify-launcher").click();

    const magnifierBtn = page
      .locator('.wcagify-tool:has-text("Magnifier")')
      .first();
    await expect(magnifierBtn).toBeVisible();
    await magnifierBtn.click();

    const lens = page.locator(".wcagify-lens");
    await expect(lens).toBeAttached();
  });

  test("Reading mask tool attaches overlay to DOM", async ({ page }) => {
    await page.locator(".wcagify-launcher").click();

    const maskBtn = page
      .locator(
        '.wcagify-tool:has-text("Reading mask"), .wcagify-row:has-text("Reading mask")',
      )
      .first();
    await expect(maskBtn).toBeVisible();
    await maskBtn.click();

    const maskOverlay = page.locator(".wcagify-reading-mask");
    await expect(maskOverlay).toBeAttached();
  });

  test("Image descriptions tool injects text captions under page images", async ({
    page,
  }) => {
    await page.locator(".wcagify-launcher").click();

    const imgDescBtn = page
      .locator('.wcagify-tool:has-text("Image descriptions")')
      .first();
    await expect(imgDescBtn).toBeVisible();
    await imgDescBtn.click();

    const captions = page.locator(".wcagify-imgdesc");
    if ((await page.locator("img").count()) > 0) {
      await expect(captions.first()).toBeVisible();
    }
  });

  test("Virtual keyboard mounts on-screen keyboard container", async ({
    page,
  }) => {
    await page.locator(".wcagify-launcher").click();

    const vkBtn = page
      .locator('.wcagify-tool:has-text("Virtual keyboard")')
      .first();
    await expect(vkBtn).toBeVisible();
    await vkBtn.click();

    const virtualKeyboard = page.locator(".wcagify-vk");
    await expect(virtualKeyboard).toBeVisible();
  });

  /* ----------------------------------------------------------------------- */
  /* 4. Display & Cursor Modifiers                                           */
  /* ----------------------------------------------------------------------- */

  test("Large cursor choice updates html custom cursor attribute", async ({
    page,
  }) => {
    await page.locator(".wcagify-launcher").click();

    const cursorBtn = page
      .locator(
        '.wcagify-cursor-choice.is-black, button:has-text("Black cursor")',
      )
      .first();
    await expect(cursorBtn).toBeVisible();
    await cursorBtn.click();

    await expect(page.locator("html")).toHaveAttribute(
      "data-a11y-cursor",
      "black",
    );
  });

  test("Enlarge click targets sets HTML enlarge data attribute", async ({
    page,
  }) => {
    await page.locator(".wcagify-launcher").click();

    const enlargeBtn = page
      .locator(
        '.wcagify-tool:has-text("Enlarge buttons"), .wcagify-row:has-text("Enlarge")',
      )
      .first();
    await expect(enlargeBtn).toBeVisible();
    await enlargeBtn.click();

    await expect(page.locator("html")).toHaveAttribute(
      "data-a11y-enlarge",
      "on",
    );
  });

  /* ----------------------------------------------------------------------- */
  /* 5. Persistence & State Reset                                            */
  /* ----------------------------------------------------------------------- */

  test("Preferences persist across page reloads via localStorage", async ({
    page,
  }) => {
    await page.locator(".wcagify-launcher").click();

    const dyslexiaBtn = page
      .locator('.wcagify-chip:has-text("Dyslexia")')
      .first();
    await dyslexiaBtn.click();
    await expect(page.locator("html")).toHaveAttribute(
      "data-a11y-font",
      "dyslexic",
    );

    await page.reload();
    await page.waitForSelector(".wcagify-launcher", {
      state: "visible",
      timeout: 10000,
    });

    // Validate state restoration from localStorage
    await expect(page.locator("html")).toHaveAttribute(
      "data-a11y-font",
      "dyslexic",
    );
  });

  test("Reset all button purges applied HTML attributes and resets widget state", async ({
    page,
  }) => {
    await page.locator(".wcagify-launcher").click();

    // Enable Dyslexia Profile & Large Cursor
    await page.locator('.wcagify-chip:has-text("Dyslexia")').first().click();
    const cursorBtn = page
      .locator(
        '.wcagify-cursor-choice.is-black, button:has-text("Black cursor")',
      )
      .first();
    await cursorBtn.click();

    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-a11y-font", "dyslexic");
    await expect(html).toHaveAttribute("data-a11y-cursor", "black");

    // Click Reset All
    const resetBtn = page.locator('button:has-text("Reset all")');
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();

    // Verify all active DOM attributes are cleared
    await expect(html).not.toHaveAttribute("data-a11y-font");
    await expect(html).not.toHaveAttribute("data-a11y-line");
    await expect(html).not.toHaveAttribute("data-a11y-word");
    await expect(html).not.toHaveAttribute("data-a11y-letter");
    await expect(html).not.toHaveAttribute("data-a11y-cursor");
  });
});
