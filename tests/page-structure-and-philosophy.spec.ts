import { test, expect } from "@playwright/test";

test.describe("WCAGify.ai Structural and Philosophy Assertions", () => {
  test("Hero section must assert exact branding headline and tagline badge", async ({
    page,
  }) => {
    await page.goto("/");

    const taglineBadge = page.locator(
      'text="One Platform. Universal Accessibility."',
    );
    await expect(taglineBadge).toBeVisible();

    const mainHeading = page.locator("h1").first();
    const headingText = await mainHeading.innerText();
    expect(headingText.replace(/\s+/g, " ").trim()).toContain(
      "Building the AI Infrastructure for Digital Accessibility",
    );
  });

  test("HeroTransformationPreview interactive persona simulator must render successfully", async ({
    page,
  }) => {
    await page.goto("/");

    const pipelineSection = page.locator("section#pipeline");
    await expect(pipelineSection).toBeVisible();

    const screenReaderTab = page.locator('button:has-text("Screen Reader")');
    const keyboardTab = page.locator('button:has-text("Keyboard Only")');
    const contrastTab = page.locator('button:has-text("Low Vision")');

    await expect(screenReaderTab).toBeVisible();
    await expect(keyboardTab).toBeVisible();
    await expect(contrastTab).toBeVisible();

    await keyboardTab.waitFor({ state: "visible" });
    await keyboardTab.click();

    const activeText = await pipelineSection.innerText();
    expect(activeText).toContain("Keyboard Navigation Experience");
  });

  test("Universal Asset Engine (FeatureTabs) tabpanel switching validation", async ({
    page,
  }) => {
    await page.goto("/");

    const assetSection = page.locator("section#assets");
    await expect(assetSection).toBeVisible();

    const webAppTab = page.locator('button[role="tab"]:has-text("Websites")');
    const docTab = page.locator('button[role="tab"]:has-text("Documents")');
    const epubTab = page.locator('button[role="tab"]:has-text("E-Books")');
    const portalTab = page.locator('button[role="tab"]:has-text("Portals")');

    await expect(webAppTab).toBeVisible();
    await expect(docTab).toBeVisible();
    await expect(epubTab).toBeVisible();
    await expect(portalTab).toBeVisible();

    await webAppTab.waitFor({ state: "visible" });

    await webAppTab.click();
    await expect(webAppTab).toHaveAttribute("aria-selected", "true");

    await docTab.click();
    await expect(docTab).toHaveAttribute("aria-selected", "true");

    await epubTab.click();
    await expect(epubTab).toHaveAttribute("aria-selected", "true");

    await portalTab.click();
    await expect(portalTab).toHaveAttribute("aria-selected", "true");
  });

  test("Tri-Pillar Architecture breakdown page layout structure verification", async ({
    page,
  }) => {
    await page.goto("/");

    const archSection = page.locator("section#architecture");
    await expect(archSection).toBeVisible();

    const aiPillar = page.locator(
      'button:has-text("AI Intelligence"), div:has-text("AI Intelligence")',
    );
    const detPillar = page.locator(
      'button:has-text("Deterministic Systems"), div:has-text("Deterministic Systems")',
    );
    const humanPillar = page.locator(
      'button:has-text("Human Expert Workspace"), div:has-text("Human Expert Workspace")',
    );

    await expect(aiPillar.first()).toBeVisible();
    await expect(detPillar.first()).toBeVisible();
    await expect(humanPillar.first()).toBeVisible();
  });

  test("Accessibility Statement routing and standard legal compliance metrics targets", async ({
    page,
  }) => {
    await page.goto("/");

    const footerLink = page
      .locator(
        'footer a:has-text("Accessibility Statement"), footer button:has-text("Accessibility Statement")',
      )
      .first();

    await expect(footerLink).toBeVisible();
    await footerLink.click();

    await expect(page).toHaveURL(/\/accessibility/);
    const heading = page.locator("h1").first();
    await expect(heading).toContainText("Accessibility Statement");

    const contactText = page.locator('text="accessibility@wcagify.ai"').first();
    await expect(contactText).toBeVisible();
  });
});
