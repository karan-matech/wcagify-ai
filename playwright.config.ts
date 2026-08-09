import { defineConfig, devices } from "@playwright/test";

const PREVIEW_PORT = Number(process.env.PREVIEW_PORT ?? 3100);
const PREVIEW_URL = `http://127.0.0.1:${PREVIEW_PORT}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "list" : "html",
  use: {
    baseURL: PREVIEW_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],
  webServer: {
    command: `npx next dev -p ${PREVIEW_PORT} -H 127.0.0.1`,
    url: PREVIEW_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
