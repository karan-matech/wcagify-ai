import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for WCAGify.ai
 * Designed for multi-browser rendering and accessibility verification.
 */
/* Port 3000 is a common default and a sibling project claims it. Combined with
 * reuseExistingServer that silently pointed this suite at a different app, so
 * it passed while testing something else entirely. Use a port of our own, and
 * only reuse a server that is actually this project's. */
const PREVIEW_PORT = Number(process.env.PREVIEW_PORT ?? 3100);
const PREVIEW_URL = `http://127.0.0.1:${PREVIEW_PORT}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'list' : 'html',
  use: {
    baseURL: PREVIEW_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    /* Test against mobile viewports. */
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* Run local dev server before starting the tests. The timeout is generous
   * because a cold Vite start under parallel workers exceeded 30s and surfaced
   * as a wave of page.goto timeouts rather than a server-start failure. */
  webServer: {
    command: `npx vite --port=${PREVIEW_PORT} --host=127.0.0.1`,
    url: PREVIEW_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
