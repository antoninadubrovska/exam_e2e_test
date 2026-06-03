import { test, expect } from '@playwright/test';


// shared setup
test.beforeEach(async ({ page }) => {
	await page.goto('https://ha-fed25-testning.github.io/exam_e2e/');


});

// can add a book to favorites and see it in favorites page
test('can click on heart/star and see the book in favorites page - add to favorites', async ({ page }) => {
	await expect(page.locator('.catalog')).toBeVisible();

	// data-testid="star-Agile Is a Feeling"
	await page.getByTestId('star-Agile Is a Feeling').click();

	await page.getByTestId('favorites').click();

	await expect(
		//   <li>
		// 	{book.title}
		//   </li>

		// 1 - too general - find some element on the page containing this text:


		// 	page.getByText('Agile Is a Feeling')
		//   ).toBeVisible();


		// 2 -more precise - Inside the favorites list specifically, does this title exist?:

		// 	page.getByTestId('book-list')
		// ).toContainText('Agile Is a Feeling');

		// 3 - even better - The favorite-book element for Agile Is a Feeling exists - data-testid={'fav-'+book.title}

			page.getByTestId('fav-Agile Is a Feeling')
		  ).toBeVisible();

});


test('can click on heart/star and see the book has dissapeared fromfavorites page - remove from favorites', async ({ page }) => {
	// Favorite the book
	await page.getByTestId('star-Agile Is a Feeling').click();

	// verify it appears in favorites page
	await page.getByTestId('favorites').click();

	await expect(
	  page.getByTestId('fav-Agile Is a Feeling')
	).toBeVisible();

	// go back to catalog
	await page.getByTestId('catalog').click();

	// unfavorite
	await page.getByTestId('star-Agile Is a Feeling').click();

	// return to favorites
	await page.getByTestId('favorites').click();

	// 1 - verify the book is gone - basic way:
	// await expect(
	//   page.getByTestId('fav-Agile Is a Feeling')
	// ).not.toBeVisible();


	// 2 - more solid:
	// the favorite disappeared (removed from the DOM)
	// the UI returned to the empty state
	await expect(
		page.getByTestId('fav-Agile Is a Feeling')
	).toHaveCount(0);

	await expect(
		page.getByText('När du valt')
	  ).toBeVisible();
  });