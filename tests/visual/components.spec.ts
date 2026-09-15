import { test, expect } from "@playwright/test";

test.describe("Visual Regression: Primitives", () => {
  test("Button - Default", async ({ page }) => {
    await page.goto("/iframe.html?id=ui-button--default&viewMode=story");
    const root = page.locator("#storybook-root");
    await expect(root).toBeVisible();
    await expect(root.getByRole("button", { name: "Button" })).toBeVisible();
    await expect(root).toHaveScreenshot("button-default.png");
  });

  test("Button - Secondary", async ({ page }) => {
    await page.goto("/iframe.html?id=ui-button--secondary&viewMode=story");
    const root = page.locator("#storybook-root");
    await expect(root).toBeVisible();
    await expect(root.getByRole("button")).toBeVisible();
    await expect(root).toHaveScreenshot("button-secondary.png");
  });

  test("Button - Outline", async ({ page }) => {
    await page.goto("/iframe.html?id=ui-button--outline&viewMode=story");
    const root = page.locator("#storybook-root");
    await expect(root).toBeVisible();
    await expect(root.getByRole("button")).toBeVisible();
    await expect(root).toHaveScreenshot("button-outline.png");
  });

  test("Card - Default", async ({ page }) => {
    await page.goto("/iframe.html?id=ui-card--default&viewMode=story");
    const root = page.locator("#storybook-root");
    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot("card-default.png");
  });

  test("Badge - Default", async ({ page }) => {
    await page.goto("/iframe.html?id=ui-badge--default&viewMode=story");
    const root = page.locator("#storybook-root");
    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot("badge-default.png");
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
