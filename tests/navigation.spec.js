import { test, expect } from '@playwright/test';

// shared setup
test.beforeEach(async ({ page }) => {
	await page.goto('https://ha-fed25-testning.github.io/exam_e2e/');

  });


// Already on Katalog page - a state test
test('catalog page is visible on load', async ({ page }) => {
	await expect(page.locator('.catalog')).toBeVisible();
});

// Katalog / Catalog

test('navigate back to catalog page', async ({ page }) => {
	await page.getByTestId('favorites').click();
	await page.getByTestId('catalog').click();

	await expect(page.locator('.catalog')).toBeVisible();
  });

// Lägg till bok / Add Book
test('navigate to add book page', async ({ page }) => {

	await page.getByTestId('add-book').click();

	await expect(
		page.getByTestId('add-input-title')
	).toBeVisible();
});

// Mina Böcker / Favorites
test('navigate to favorites page', async ({ page }) => {

	await page.getByTestId('favorites').click();

	await expect(
		page.locator('.favorites')
	).toBeVisible();
});

// Statistik / Statistics
test('navigate statistics page', async ({ page }) => {

	await page.getByTestId('statistics').click();

	await expect(
	  page.locator('.stats')
	).toBeVisible();
  });


