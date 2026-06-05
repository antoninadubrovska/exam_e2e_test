
import { test, expect } from "@playwright/test";

const book1 = "Frontend System Design Essentials";
const book2 = "Learning JavaScript Design Patternse";
const book3 = "Agile Is a Feeling";

async function fillBookForm(page, title, author) {
	await page.getByTestId("add-input-title").fill(title);
	await page.getByTestId("add-input-author").fill(author);
}

async function addBook(page, title, author) {
	await page.getByTestId("add-book").click();
	await fillBookForm(page, title, author);
	await page.getByTestId("add-submit").click();
}

function extractNumber(text) {
	if (!text) return 0;
	const match = text.match(/\d+/);
	return match ? Number(match[0]) : 0;
}

test.describe("Statistics", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://ha-fed25-testning.github.io/exam_e2e/");
	});

	test("statistics reflect multiple books and favorites correctly", async ({
		page,
	}) => {

		// go to stats before adding new book
		await page.getByTestId("statistics").click();
		// get initial book-count from stats to check the book count later
		const beforeText = await page.getByTestId("book-count").textContent();
		const beforeCount = extractNumber(beforeText);

		// add (1) new book
		await addBook(page, book1, "Juntao Qiu");

		// go back to catalog so another new book can be added
		await page.getByTestId("catalog").click();

		// add (2) new book
		await addBook(page, book2, "Addy Osmani");

		// go back to catalog
		await page.getByTestId("catalog").click();

		// favorite (1) a book from existing list in catalog
		await page.getByTestId(`star-${book3}`).click();

		// favorite (2) a newly added book
		await page.getByTestId(`star-${book1}`).click();

		// go back to stats page after adding new book
		await page.getByTestId("statistics").click();

		// book-count updated after adding new book
		const afterText = await page.getByTestId("book-count").textContent();
		const afterCount = extractNumber(afterText);

		// assertion after adding new book
		expect(afterCount).toBe(beforeCount + 2);

		await expect(page.getByTestId("stars-count")).toContainText("2");

		await expect(page.getByTestId("book-count")).toContainText("böcker");
	});
});
