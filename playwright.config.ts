import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/visual",
  snapshotPathTemplate: "{testDir}/__snapshots__/{projectName}/{arg}{ext}",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:6006",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 7"],
        viewport: { width: 390, height: 844 },
      },
    },
  ],
  webServer: {
    command: "bun run ./scripts/serve-storybook.ts",
    url: "http://localhost:6006",
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
