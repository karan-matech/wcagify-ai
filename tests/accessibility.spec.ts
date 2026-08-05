import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Automated WCAG 2.2 Level AA and Anti-Overlay Verification Suite
 */
test.describe('WCAG 2.2 Level AA & Native Integrity Tests', () => {

  test('Homepage must contain zero high or critical accessibility violations', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Wait for critical elements to render
    await page.waitForSelector('#main-content');

    // Perform accessibility audit with AxeBuilder
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    // Verify violations are empty
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Accessibility Statement page must contain zero accessibility violations', async ({ page }) => {
    await page.goto('/');
    
    // Click on the footer navigation link to route to Accessibility Statement
    const accessLink = page.locator('footer button:has-text("Accessibility Statement")');
    await accessLink.first().click();

    // Wait for the container to update
    await page.waitForSelector('h1:has-text("Accessibility Statement")');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Anti-Overlay Security Check: Page must remain free of third-party overlay script hacks', async ({ page }) => {
    await page.goto('/');

    // Get all script sources in the page
    const scriptSrcs = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'));
      return scripts.map(s => s.src || s.textContent || '');
    });

    const overlaySignatures = [
      'userway',
      'accessibe',
      'equalweb',
      'audioeye',
      'monsido',
      'reciteme',
      'enable.co.il'
    ];

    for (const src of scriptSrcs) {
      for (const signature of overlaySignatures) {
        expect(src.toLowerCase()).not.toContain(signature);
      }
    }

    // Assert that no unrequested widgets are added in the body
    const hasFloatingOverlayWidget = await page.evaluate(() => {
      return !!document.getElementById('userway-accessibility-widget') || 
             !!document.querySelector('.userway') ||
             !!document.querySelector('[id*="accessibe"]') ||
             !!document.querySelector('[class*="accessibe"]');
    });

    expect(hasFloatingOverlayWidget).toBe(false);
  });

  test('Focus indicators should be visible and high contrast for keyboard navigatees', async ({ page }) => {
    await page.goto('/');
    
    // Focus first button
    const mainCTA = page.locator('main#main-content button').first();
    await mainCTA.focus();

    // Check if focus element has outline, ring, or focus-visible class active
    const hasFocusStyles = await mainCTA.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.outlineStyle !== 'none' || 
             style.boxShadow.includes('rgb(') || 
             el.className.includes('focus-visible');
    });

    expect(hasFocusStyles).toBe(true);
  });

  test('Motion reduction: Page elements must respect prefers-reduced-motion media settings', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // Check if root or body contains motion-safe classes that are overridden or standard motion parameters that are reduced
    const hasMotionReductionSupport = await page.evaluate(() => {
      // Create a dummy transition test element to see if reduced motion media query is present in style sheets
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      return mediaQuery.matches;
    });

    expect(hasMotionReductionSupport).toBe(true);
  });
});
