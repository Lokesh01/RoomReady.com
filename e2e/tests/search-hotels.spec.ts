import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign In successful !")).toBeVisible();
});

test("should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going ?").fill("Faridabad");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Hotels found in Faridabad")).toBeVisible();
  await expect(page.getByText("Sahara")).toBeVisible();
});

test("should show hotel details", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("where are you going ?").fill("Faridabad");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByRole("link", { name: "View More" }).click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});

test("should book hotel", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("where are you going ?").fill("Faridabad");
  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formattedDate = date.toISOString().split("T")[0];
  await page.getByPlaceholder("Check-Out Date").fill(formattedDate);

  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Sahara").click();
  await page.getByRole("button",{name: "Book Now"}).click();

  await expect(page.getByText("Total Cost: $369369")).toBeVisible(); // actual cost is 123123 but for 3 nights it'll be 3x

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame.locator('[placeholder="Card number"]').fill("4242424242424242");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/50");
  await stripeFrame.locator('[placeholder="CVC"]').fill("242");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("12345");

  await page.getByRole("button", {name: "Confirm Booking"}).click();
  await expect(page.getByText("Booking Confirmed!")).toBeVisible();
});
