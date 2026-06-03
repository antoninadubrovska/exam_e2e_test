import { test, expect } from "@playwright/test";

const book1 = "Agile Is a Feeling";
const book2 = "Dune";

async function fillBookForm(page, title, author) {
	await page.getByTestId("add-input-title").fill(title);
	await page.getByTestId("add-input-author").fill(author);
}

test.describe("Statistics", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://ha-fed25-testning.github.io/exam_e2e/");
	});

	test("statistics reflect multiple books and favorites correctly", async ({
		page,
	}) => {
		// favorite first book
		await page.getByTestId(`star-${book1}`).click();

		// add new book
		await page.getByTestId("add-book").click();
		await fillBookForm(page, "Dune", "Frank Herbert");
		await page.getByTestId("add-submit").click();

		// go back to catalog
		await page.getByTestId("catalog").click();

		// favorite second, newly added book
		await page.getByTestId(`star-${book2}`).click();
		await page.getByTestId("statistics").click();

		await expect(page.getByTestId("book-count")).toContainText("böcker");
		await expect(page.getByTestId("stars-count")).toContainText("2");
	});
});
