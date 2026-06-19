import { expect, test } from '@playwright/test'

test('increments the demo counter', async ({ page }) => {
  await page.goto('/')

  const counter = page.getByRole('button', { name: /Clicked/ })
  await counter.click()
  await counter.click()

  await expect(
    page.getByRole('button', { name: 'Clicked 2 times' }),
  ).toBeVisible()
})

test('adds a destination from the form', async ({ page }) => {
  await page.goto('/')

  await page.getByLabel('City').fill('Barcelona')
  await page.getByRole('button', { name: 'Add trip' }).click()

  await expect(page.getByRole('status')).toHaveText(
    'Barcelona was added to your wishlist.',
  )
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Barcelona' }),
  ).toBeVisible()
})

test('filters destinations by status or country', async ({ page }) => {
  await page.goto('/')

  await page.getByLabel('Search trips').fill('Japan')

  await expect(page.getByText('Tokyo')).toBeVisible()
  await expect(page.getByText('Lisbon')).toBeHidden()
  await expect(page.getByText('1 trips visible')).toBeVisible()
})

test('toggles dark mode', async ({ page }) => {
  await page.goto('/')

  const themeButton = page.getByRole('button', { name: 'Use dark mode' })
  await themeButton.click()

  await expect(
    page.getByRole('button', { name: 'Use light mode' }),
  ).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('main')).toHaveClass(/app--dark/)
})
