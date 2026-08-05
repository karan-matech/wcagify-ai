import { test, expect } from '@playwright/test';

/**
 * Structural, Layout, and Core Philosophy Assertion Suite
 */
test.describe('WCAGify.ai Structural and Philosophy Assertions', () => {

  test('Hero section must assert exact branding headline and tagline badge', async ({ page }) => {
    await page.goto('/');

    // Assert tagline badge text is present
    const taglineBadge = page.locator('text="One Platform. Universal Accessibility."');
    await expect(taglineBadge).toBeVisible();

    // Assert main H1 headline text is correct
    const mainHeading = page.locator('h1');
    const headingText = await mainHeading.innerText();
    expect(headingText.replace(/\s+/g, ' ').trim()).toContain('Building the AI Infrastructure for Digital Accessibility');
  });

  test('HeroTransformationPreview interactive persona simulator must render successfully', async ({ page }) => {
    await page.goto('/');

    // Check if the simulator container exists
    const pipelineSection = page.locator('section#pipeline');
    await expect(pipelineSection).toBeVisible();

    // Verify presence of interactive persona triggers
    const screenReaderTab = page.locator('button:has-text("Screen Reader")');
    const keyboardTab = page.locator('button:has-text("Keyboard Only")');
    const contrastTab = page.locator('button:has-text("Low Vision")');

    await expect(screenReaderTab).toBeVisible();
    await expect(keyboardTab).toBeVisible();
    await expect(contrastTab).toBeVisible();

    // Click on Keyboard tab and assert status switches
    await keyboardTab.click();
    const activeText = await page.locator('section#pipeline').innerText();
    expect(activeText).toContain('Keyboard Navigation Experience');
  });

  test('Universal Asset Engine (FeatureTabs) tabpanel switching validation', async ({ page }) => {
    await page.goto('/');

    const assetSection = page.locator('section#assets');
    await expect(assetSection).toBeVisible();

    // Tabs inside FeatureTabs
    const webAppTab = page.locator('button[role="tab"]:has-text("Websites")');
    const docTab = page.locator('button[role="tab"]:has-text("Documents")');
    const epubTab = page.locator('button[role="tab"]:has-text("E-Books")');
    const portalTab = page.locator('button[role="tab"]:has-text("Portals")');

    await expect(webAppTab).toBeVisible();
    await expect(docTab).toBeVisible();
    await expect(epubTab).toBeVisible();
    await expect(portalTab).toBeVisible();

    // Test clicking through all 4 tabs and assert aria-selected matches
    await webAppTab.click();
    expect(await webAppTab.getAttribute('aria-selected')).toBe('true');

    await docTab.click();
    expect(await docTab.getAttribute('aria-selected')).toBe('true');

    await epubTab.click();
    expect(await epubTab.getAttribute('aria-selected')).toBe('true');

    await portalTab.click();
    expect(await portalTab.getAttribute('aria-selected')).toBe('true');
  });

  test('Tri-Pillar Architecture breakdown page layout structure verification', async ({ page }) => {
    await page.goto('/');

    const archSection = page.locator('section#architecture');
    await expect(archSection).toBeVisible();

    // Assert existence of the 3 pillars
    const aiPillar = page.locator('button:has-text("AI Intelligence")');
    const detPillar = page.locator('button:has-text("Deterministic Systems")');
    const humanPillar = page.locator('button:has-text("Human Expert Workspace")');

    await expect(aiPillar).toBeVisible();
    await expect(detPillar).toBeVisible();
    await expect(humanPillar).toBeVisible();
  });

  test('Accessibility Statement routing and standard legal compliance metrics targets', async ({ page }) => {
    await page.goto('/');

    // Navigate to Accessibility Statement using the footer button
    const footerLink = page.locator('footer button:has-text("Accessibility Statement")');
    await footerLink.first().click();

    // Verify heading is loaded
    const heading = page.locator('h1');
    await expect(heading).toContainText('Accessibility Statement');

    // Verify contact mechanism is clearly detailed
    // The address appears on the statement page and again in the footer.
    const contactText = page.locator('text="accessibility@wcagify.ai"').first();
    await expect(contactText).toBeVisible();
  });
});
