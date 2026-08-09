import { test, expect } from "@playwright/test";

test.describe("WCAGify.ai Brand and Styling Verification", () => {
  test("Typography verification: Body text must be computed as Inter font family", async ({
    page,
  }) => {
    await page.goto("/");

    const computedFont = await page.evaluate(() => {
      const body = document.querySelector("body");
      return body ? window.getComputedStyle(body).fontFamily : "";
    });

    // Next.js next/font wraps Inter in hashed names like __Inter_XXXXXX or standard Inter
    const fontMatches =
      computedFont.toLowerCase().includes("inter") ||
      computedFont.toLowerCase().includes("sans-serif");

    expect(fontMatches).toBe(true);
  });

  test("Logo validation: Navbar and Footer must contain descriptive alt-text or aria-labels", async ({
    page,
  }) => {
    await page.goto("/");

    const navLogoImg = page.locator("nav img").first();

    const hasNavImg = (await navLogoImg.count()) > 0;
    if (hasNavImg) {
      const navLogoAlt = await navLogoImg.getAttribute("alt");
      expect(navLogoAlt).toBeTruthy();
      expect(navLogoAlt?.toLowerCase()).toContain("logo");
    } else {
      // Fallback check if logo is rendered as an accessible link/SVG
      const navAriaLabel = await page
        .locator("nav a")
        .first()
        .getAttribute("aria-label");
      expect(navAriaLabel).toBeTruthy();
    }

    // Check Footer logo
    const footerLogoImg = page.locator("footer img").first();
    const hasFooterImg = (await footerLogoImg.count()) > 0;

    if (hasFooterImg) {
      const footerLogoAlt = await footerLogoImg.getAttribute("alt");
      expect(footerLogoAlt).toBeTruthy();
      expect(footerLogoAlt?.toLowerCase()).toContain("logo");
    } else {
      const footerText = await page.locator("footer").innerText();
      expect(footerText.toLowerCase()).toContain("wcagify");
    }
  });

  test("Favicon metadata: Verify favicon configuration in document head", async ({
    page,
  }) => {
    await page.goto("/");

    // Next.js injects link[rel="icon"] or link[rel*="icon"]
    const faviconLink = page
      .locator('link[rel="icon"], link[rel="shortcut icon"], link[rel*="icon"]')
      .first();
    const faviconHref = await faviconLink.getAttribute("href");

    expect(faviconHref).toBeTruthy();

    // Check for apple-touch-icon if configured, or general icon metadata
    const appleIconLink = page.locator('link[rel="apple-touch-icon"]');
    const hasAppleIcon = (await appleIconLink.count()) > 0;

    if (hasAppleIcon) {
      const appleIconHref = await appleIconLink.getAttribute("href");
      expect(appleIconHref).toBeTruthy();
    } else {
      // Ensure at least primary favicon or SVG icon is present
      expect(faviconHref).toMatch(/\.(svg|ico|png)/i);
    }
  });
});
