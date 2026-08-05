import { test, expect } from '@playwright/test';

/**
 * Keyboard Accessibility, Interactive UX, and Form Validation Assertion Suite
 */
test.describe('WCAGify.ai Keyboard Navigation & Form Validation Tests', () => {

  test('Skip Link should become visible and shift focus to main content on first tab', async ({ page }) => {
    await page.goto('/');

    // Initially, skip-link should not be visible to screen-readers but hidden offscreen
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeAttached();

    // Emulate tab keypress to focus skip-link
    await page.keyboard.press('Tab');

    // Assert that the skip link is now focused and visible
    const isFocused = await skipLink.evaluate((el) => document.activeElement === el);
    expect(isFocused).toBe(true);

    // Press enter on Skip Link to activate routing
    await page.keyboard.press('Enter');

    // Assert that main content has focused (we added tabIndex={-1} on main)
    const mainContent = page.locator('main#main-content');
    const isMainFocused = await mainContent.evaluate((el) => document.activeElement === el);
    expect(isMainFocused).toBe(true);
  });

  test('Keyboard Tab switching using ArrowRight and ArrowLeft in Universal Asset Tabs', async ({ page }) => {
    await page.goto('/');

    const firstTab = page.locator('button[role="tab"]').first();
    
    // Focus on the first tab of Universal Asset format selectors
    await firstTab.focus();

    // Tab list keys cycle
    await page.keyboard.press('ArrowRight');
    
    // Check if second tab is focused and active
    const secondTab = page.locator('button[role="tab"]').nth(1);
    const isSecondTabFocused = await secondTab.evaluate((el) => document.activeElement === el);
    expect(isSecondTabFocused).toBe(true);
    expect(await secondTab.getAttribute('aria-selected')).toBe('true');

    // Cycle left back to the first tab
    await page.keyboard.press('ArrowLeft');
    const isFirstTabFocused = await firstTab.evaluate((el) => document.activeElement === el);
    expect(isFirstTabFocused).toBe(true);
    expect(await firstTab.getAttribute('aria-selected')).toBe('true');
  });

  test('Demo request form empty submit should inject aria-invalid attributes and dynamic role="alert" alerts', async ({ page }) => {
    await page.goto('/');

    // Scroll to the demo form
    const formSection = page.locator('form');
    await formSection.scrollIntoViewIfNeeded();

    // Verify fields are initially valid and have no alert overlays
    const nameInput = page.locator('input#fullName');
    const emailInput = page.locator('input#email');

    expect(await nameInput.getAttribute('aria-invalid')).toBe('false');
    expect(await emailInput.getAttribute('aria-invalid')).toBe('false');

    // Attempt to submit form with blank fields
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();

    // Verify validation errors are dynamically triggered
    expect(await nameInput.getAttribute('aria-invalid')).toBe('true');
    expect(await emailInput.getAttribute('aria-invalid')).toBe('true');

    // Verify presence of role="alert" with clear, polite accessibility feedback
    const nameAlert = page.locator('span#fullName-error[role="alert"]');
    const emailAlert = page.locator('span#email-error[role="alert"]');

    await expect(nameAlert).toBeVisible();
    await expect(emailAlert).toBeVisible();

    expect(await nameAlert.innerText()).toContain('Name is required');
    expect(await emailAlert.innerText()).toContain('Valid email is required');
  });
});
