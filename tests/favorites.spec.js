import { test, expect } from "@playwright/test";

const book = "Agile Is a Feeling";

test.describe("Favorites", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://ha-fed25-testning.github.io/exam_e2e/");
	});

	test("can click on heart/star and see the book in favorites page - add to favorites", async ({
		page,
	}) => {
		await expect(page.locator(".catalog")).toBeVisible();

		await page.getByTestId(`star-${book}`).click();

		await page.getByTestId("favorites").click();

		await expect(page.getByTestId(`fav-${book}`)).toBeVisible();

		await expect(page.getByText("När du valt")).not.toBeVisible();
	});

	test("can click on heart/star and see the book has dissapeared from favorites page - remove from favorites", async ({
		page,
	}) => {
		await page.getByTestId(`star-${book}`).click();

		await page.getByTestId("favorites").click();

		await expect(page.getByTestId(`fav-${book}`)).toBeVisible();

		await page.getByTestId("catalog").click();

		await page.getByTestId(`star-${book}`).click();

		await page.getByTestId("favorites").click();

		await expect(page.getByTestId(`fav-${book}`)).not.toBeVisible();

		await expect(page.getByText("När du valt")).toBeVisible();
	});
});
