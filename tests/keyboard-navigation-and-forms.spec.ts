import { test, expect } from "@playwright/test";

test.describe("WCAGify.ai Keyboard Navigation & Form Validation Tests", () => {
  test("Skip Link should become visible and shift focus to main content on first tab", async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName === "webkit",
      "WebKit excludes links from Tab order by default",
    );
    await page.goto("/");

    const skipLink = page.locator('a[href="#main-content"]').first();
    await expect(skipLink).toBeAttached();

    await page.keyboard.press("Tab");

    await expect(skipLink).toBeFocused();

    await page.keyboard.press("Enter");

    const mainContent = page.locator("main#main-content");
    await expect(mainContent).toBeFocused();
  });

  test("Keyboard Tab switching using ArrowRight and ArrowLeft in Universal Asset Tabs", async ({
    page,
  }) => {
    await page.goto("/");

    const firstTab = page.locator('button[role="tab"]').first();
    await firstTab.waitFor({ state: "visible" });

    await firstTab.focus();
    await expect(firstTab).toBeFocused();

    await page.keyboard.press("ArrowRight");

    const secondTab = page.locator('button[role="tab"]').nth(1);
    await expect(secondTab).toBeFocused();
    await expect(secondTab).toHaveAttribute("aria-selected", "true");

    await page.keyboard.press("ArrowLeft");
    await expect(firstTab).toBeFocused();
    await expect(firstTab).toHaveAttribute("aria-selected", "true");
  });

  test('Demo request form empty submit should inject aria-invalid attributes and dynamic role="alert" alerts', async ({
    page,
  }) => {
    await page.goto("/");

    const formSection = page.locator("form").first();
    await formSection.scrollIntoViewIfNeeded();

    const nameInput = page.locator("input#fullName");
    const emailInput = page.locator("input#email");

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();

    const initialNameInvalid = await nameInput.getAttribute("aria-invalid");
    expect(initialNameInvalid === "false" || initialNameInvalid === null).toBe(
      true,
    );

    const submitBtn = page.locator('button[type="submit"]').first();
    await submitBtn.click();

    await expect(nameInput).toHaveAttribute("aria-invalid", "true");
    await expect(emailInput).toHaveAttribute("aria-invalid", "true");

    const nameAlert = page.locator(
      'span#fullName-error[role="alert"], [id*="fullName"][role="alert"]',
    );
    const emailAlert = page.locator(
      'span#email-error[role="alert"], [id*="email"][role="alert"]',
    );

    await expect(nameAlert.first()).toBeVisible();
    await expect(emailAlert.first()).toBeVisible();

    expect(await nameAlert.first().innerText()).toContain("Name is required");
    expect(await emailAlert.first().innerText()).toMatch(/email .*required/i);
  });
});
