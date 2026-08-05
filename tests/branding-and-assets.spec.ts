import { test, expect } from '@playwright/test';

/**
 * Brand Identity & Visual Assets Verification Suite
 */
test.describe('WCAGify.ai Brand and Styling Verification', () => {

  test('Typography verification: Body text must be computed as Inter font family', async ({ page }) => {
    await page.goto('/');
    
    // Evaluate the computed font family on the body element
    const computedFont = await page.evaluate(() => {
      const body = document.querySelector('body');
      return body ? window.getComputedStyle(body).fontFamily : '';
    });

    // Font-family value usually contains "Inter" (with fallback fonts)
    expect(computedFont.toLowerCase()).toContain('inter');
  });

  test('Logo validation: Navbar and Footer must contain descriptive alt-text', async ({ page }) => {
    await page.goto('/');

    // Locate the navbar and footer logo elements
    const navLogo = page.locator('nav img');
    const footerLogo = page.locator('footer img');

    // Assert navbar logo exists and has non-empty descriptive alt tag
    const navLogoAlt = await navLogo.first().getAttribute('alt');
    expect(navLogoAlt).toBeTruthy();
    expect(navLogoAlt?.toLowerCase()).toContain('logo');

    // Assert footer logo exists and has non-empty descriptive alt tag
    const footerLogoAlt = await footerLogo.first().getAttribute('alt');
    expect(footerLogoAlt).toBeTruthy();
    expect(footerLogoAlt?.toLowerCase()).toContain('logo');
  });

  test('Favicon metadata: Verify favicon configuration in document head', async ({ page }) => {
    await page.goto('/');

    // Check for standard shortcut/icon links in the DOM head
    const faviconHref = await page.locator('link[rel="icon"]').first().getAttribute('href');
    const appleIconHref = await page.locator('link[rel="apple-touch-icon"]').first().getAttribute('href');

    expect(faviconHref).toBeTruthy();
    expect(appleIconHref).toBeTruthy();
  });
});
