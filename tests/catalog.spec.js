import { test, expect } from "@playwright/test";

const book = "Agile Is a Feeling";

// User Story 5, 6

test.describe("Catalog", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://ha-fed25-testning.github.io/exam_e2e/");
	});

	test("can favorite a book by clicking star", async ({ page }) => {
		await expect(page.locator(".catalog")).toBeVisible();

		await page.getByTestId(`star-${book}`).click();

		// visual feedback in catalog (selected state)
		await expect(page.getByTestId(`star-${book}`)).toHaveClass(/selected/);
	});

	test("can unfavorite a book by clicking star again", async ({ page }) => {
		await page.getByTestId(`star-${book}`).click();
		await page.getByTestId(`star-${book}`).click();

		await expect(page.getByTestId(`star-${book}`)).not.toHaveClass(
			/selected/,
		);
	});
});
