import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
"/",
"/projects",
"/projects/smartafcfta",
"/projects/azure-ai-verification",
"/projects/accessible-component-library",
"/about",
"/experience",
"/writing",
"/contact",
"/accessibility",
"/accessibility/lab",
"/accessibility/lab/forms",
"/accessibility/lab/navigation",
"/accessibility/lab/dialogs",
"/accessibility/lab/semantics",
"/accessibility/audits",
"/accessibility/audits/booking-app",
"/accessibility/remediation",
"/performance",
"/performance/lab",
"/accessibility-statement",
"/privacy"];


test.describe("routes", () => {
  for (const path of routes) {
    test(`${path} loads directly and survives refresh`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
      await page.reload();
      await expect(page.locator("h1")).toHaveCount(1);
      expect(errors).toEqual([]);
    });
  }

  test("unknown routes show the not-found page", async ({ page }) => {
    await page.goto("/does-not-exist");
    await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
  });
});

test("main navigation reaches each section", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" }).first();
  await nav.getByRole("link", { name: "Accessibility Lab" }).click();
  await expect(page).toHaveURL(/\/accessibility$/);
  await expect(nav.getByRole("link", { name: "Accessibility Lab" })).toHaveAttribute("aria-current", "page");
});

test("mobile menu exposes its state", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  const button = page.getByRole("button", { name: "Menu" });
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(button).toBeFocused();
});

test("lab filters narrow findings", async ({ page }) => {
  await page.goto("/accessibility/lab");
  await page.getByLabel("Severity").selectOption("critical");
  await expect(page.getByText(/Showing 1 of \d+ findings/)).toBeVisible();
});

test("corrected dialog is keyboard operable and returns focus", async ({ page }) => {
  await page.goto("/accessibility/lab/dialogs");
  await page.getByRole("radio", { name: "Corrected build" }).check({ force: true });
  const cancel = page.getByRole("button", { name: /^Cancel Career advising/ });
  await cancel.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Cancel this appointment?" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Keep appointment" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(cancel).toBeFocused();
});

test("corrected booking form validates", async ({ page }) => {
  await page.goto("/accessibility/lab/forms");
  await page.getByRole("radio", { name: "Corrected build" }).check({ force: true });
  await page.getByRole("button", { name: "Continue to confirm" }).click();
  await expect(page.getByRole("heading", { name: /There are 6 problems/ })).toBeVisible();
});

test.describe("automated accessibility checks (one layer of evidence, not proof)", () => {
  for (const path of ["/", "/projects", "/accessibility", "/accessibility/remediation", "/accessibility/audits/booking-app", "/performance/lab"]) {
    test(`${path} has no serious or critical axe violations`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      const blocking = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(blocking).toEqual([]);
    });
  }
});