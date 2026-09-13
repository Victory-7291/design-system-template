import { test, expect } from "@playwright/test";

test.describe("Visual Regression: Primitives", () => {
  test("Button - Default", async ({ page }) => {
    await page.goto("/iframe.html?id=primitives-button--default&viewMode=story");
    const root = page.locator("#storybook-root");
    await expect(root).toBeVisible();
    await expect(root.getByRole("button", { name: "Default Button" })).toBeVisible();
    await expect(root).toHaveScreenshot("button-default.png");
  });

  test("Button - Secondary", async ({ page }) => {
    await page.goto("/iframe.html?id=primitives-button--secondary&viewMode=story");
    const root = page.locator("#storybook-root");
    await expect(root).toBeVisible();
    await expect(root.getByRole("button")).toBeVisible();
    await expect(root).toHaveScreenshot("button-secondary.png");
  });

  test("Text - Hierarchy & Typography", async ({ page }) => {
    await page.goto("/iframe.html?id=primitives-text--display&viewMode=story");
    const root = page.locator("#storybook-root");
    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot("text-display.png");
  });
});

test.describe("Visual Regression: Editorial & Content UI", () => {
  test("ArticleShell & Prose - Editorial Layout", async ({ page }) => {
    await page.goto("/iframe.html?id=content-editorialdemo--sample-article&viewMode=story");
    const root = page.locator("#storybook-root");
    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot("editorial-sample-article.png");
  });
});
