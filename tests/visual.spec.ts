import { expect, test } from '@playwright/test'

// Visual regression snapshots for the key UX states designers care about.
// Baselines live in tests/visual.spec.ts-snapshots/. Update them intentionally
// with:  npx playwright test tests/visual.spec.ts --update-snapshots

test('default light mode', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('main')).toHaveScreenshot('app-light.png')
})

test('dark mode', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Use dark mode' }).click()

  await expect(page.locator('main')).toHaveScreenshot('app-dark.png')
})

test('filtered destination list', async ({ page }) => {
  await page.goto('/')

  await page.getByLabel('Search trips').fill('Japan')

  await expect(page.locator('main')).toHaveScreenshot('app-filtered.png')
})

test('empty search results', async ({ page }) => {
  await page.goto('/')

  await page.getByLabel('Search trips').fill('Antarctica')

  await expect(page.locator('main')).toHaveScreenshot('app-empty-search.png')
})

test('add-trip validation error', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Add trip' }).click()

  await expect(page.getByRole('status')).toBeVisible()
  await expect(page.locator('main')).toHaveScreenshot('app-validation-error.png')
})

test('add-trip success message', async ({ page }) => {
  await page.goto('/')

  await page.getByLabel('City').fill('Barcelona')
  await page.getByRole('button', { name: 'Add trip' }).click()

  await expect(page.getByRole('status')).toHaveText(
    'Barcelona was added to your wishlist.',
  )
  await expect(page.locator('main')).toHaveScreenshot('app-trip-added.png')
})
