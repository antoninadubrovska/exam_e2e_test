import { test, expect } from '@playwright/test';


// shared setup
test.beforeEach(async ({ page }) => {
	await page.goto('https://ha-fed25-testning.github.io/exam_e2e/');
	await page.getByTestId('add-book').click();

});

// button disabled initially
test('submit button is initially disabled', async ({ page }) => {

	await expect(
	  page.getByTestId('add-submit')
	).toBeDisabled();
});

// submit button enabled when both fields filled
test('submit button enabled when both fields filled', async ({ page }) => {

await page.getByTestId('add-input-title').fill('Dune');
await page.getByTestId('add-input-author').fill('Frank Herbert');

await expect(
  page.getByTestId('add-submit')
	).toBeEnabled();
});
