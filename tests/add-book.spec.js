import { test, expect } from "@playwright/test";

async function fillBookForm(page, title, author) {
	await page.getByTestId("add-input-title").fill(title);
	await page.getByTestId("add-input-author").fill(author);
}

test.describe("Add Book", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://ha-fed25-testning.github.io/exam_e2e/");
		await page.getByTestId("add-book").click();
	});

	test("submit button is initially disabled", async ({ page }) => {
		await expect(page.getByTestId("add-submit")).toBeDisabled();
	});

	test("submit button becomes enabled when both fields filled", async ({
		page,
	}) => {
		await fillBookForm(page, "Dune", "Frank Herbert");

		await expect(page.getByTestId("add-submit")).toBeEnabled();
	});

	test("can add a new book and see it in catalog", async ({ page }) => {
		await fillBookForm(page, "Dune", "Frank Herbert");

		await page.getByTestId("add-submit").click();

		await page.getByTestId("catalog").click();

		await expect(page.getByText('"Dune", Frank Herbert')).toBeVisible();
	});
});
