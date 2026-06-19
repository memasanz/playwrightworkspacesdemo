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

for (let clickCount = 1; clickCount <= 24; clickCount += 1) {
  test(`counter reaches ${clickCount} clicks`, async ({ page }) => {
    await page.goto('/')

    const counter = page.getByRole('button', { name: /Clicked/ })

    for (let click = 0; click < clickCount; click += 1) {
      await counter.click()
    }

    await expect(
      page.getByRole('button', {
        name: `Clicked ${clickCount} ${clickCount === 1 ? 'time' : 'times'}`,
      }),
    ).toBeVisible()
  })
}

const destinationSearchCases = [
  { search: 'Lisbon', visible: 'Lisbon', hidden: 'Tokyo', count: 1 },
  { search: 'Portugal', visible: 'Lisbon', hidden: 'Tokyo', count: 1 },
  { search: 'Tokyo', visible: 'Tokyo', hidden: 'Vancouver', count: 1 },
  { search: 'Japan', visible: 'Tokyo', hidden: 'Lisbon', count: 1 },
  { search: 'Vancouver', visible: 'Vancouver', hidden: 'Tokyo', count: 1 },
  { search: 'Canada', visible: 'Vancouver', hidden: 'Lisbon', count: 1 },
  { search: 'Wishlist', visible: 'Lisbon', hidden: 'Tokyo', count: 2 },
  { search: 'Booked', visible: 'Tokyo', hidden: 'Lisbon', count: 1 },
  { search: 'lis', visible: 'Lisbon', hidden: 'Tokyo', count: 2 },
  { search: 'por', visible: 'Lisbon', hidden: 'Tokyo', count: 1 },
  { search: 'tok', visible: 'Tokyo', hidden: 'Vancouver', count: 1 },
  { search: 'jap', visible: 'Tokyo', hidden: 'Lisbon', count: 1 },
  { search: 'van', visible: 'Vancouver', hidden: 'Tokyo', count: 1 },
  { search: 'can', visible: 'Vancouver', hidden: 'Lisbon', count: 1 },
  { search: 'wish', visible: 'Vancouver', hidden: 'Tokyo', count: 2 },
  { search: 'book', visible: 'Tokyo', hidden: 'Lisbon', count: 1 },
  { search: 'LISBON', visible: 'Lisbon', hidden: 'Tokyo', count: 1 },
  { search: 'PORTUGAL', visible: 'Lisbon', hidden: 'Tokyo', count: 1 },
  { search: 'TOKYO', visible: 'Tokyo', hidden: 'Vancouver', count: 1 },
  { search: 'JAPAN', visible: 'Tokyo', hidden: 'Lisbon', count: 1 },
  { search: 'VANCOUVER', visible: 'Vancouver', hidden: 'Tokyo', count: 1 },
  { search: 'CANADA', visible: 'Vancouver', hidden: 'Lisbon', count: 1 },
  { search: 'WISHLIST', visible: 'Lisbon', hidden: 'Tokyo', count: 2 },
  { search: 'BOOKED', visible: 'Tokyo', hidden: 'Lisbon', count: 1 },
]

destinationSearchCases.forEach(({ search, visible, hidden, count }, index) => {
  test(`filters destinations case ${index + 1}: ${search}`, async ({ page }) => {
    await page.goto('/')

    await page.getByLabel('Search trips').fill(search)

    await expect(page.getByText(visible)).toBeVisible()
    await expect(page.getByText(hidden)).toBeHidden()
    await expect(page.getByText(`${count} trips visible`)).toBeVisible()
  })
})

const newDestinations = [
  'Amsterdam',
  'Athens',
  'Auckland',
  'Bangkok',
  'Berlin',
  'Bogota',
  'Boston',
  'Cairo',
  'Chicago',
  'Copenhagen',
  'Dublin',
  'Edinburgh',
  'Helsinki',
  'Istanbul',
  'Lima',
  'Madrid',
  'Melbourne',
  'Mexico City',
  'Nairobi',
  'Oslo',
  'Paris',
  'Prague',
  'Seoul',
  'Sydney',
]

newDestinations.forEach((city) => {
  test(`adds ${city} to the wishlist`, async ({ page }) => {
    await page.goto('/')

    await page.getByLabel('City').fill(city)
    await page.getByRole('button', { name: 'Add trip' }).click()

    await expect(page.getByRole('status')).toHaveText(
      `${city} was added to your wishlist.`,
    )
    await expect(
      page.getByRole('listitem').filter({ hasText: city }),
    ).toBeVisible()
  })
})

for (let toggleCase = 1; toggleCase <= 24; toggleCase += 1) {
  test(`dark mode toggle case ${toggleCase}`, async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Use dark mode' }).click()

    await expect(
      page.getByRole('button', { name: 'Use light mode' }),
    ).toHaveAttribute('aria-pressed', 'true')
    await expect(page.locator('main')).toHaveClass(/app--dark/)

    if (toggleCase % 2 === 0) {
      await page.getByRole('button', { name: 'Use light mode' }).click()

      await expect(
        page.getByRole('button', { name: 'Use dark mode' }),
      ).toHaveAttribute('aria-pressed', 'false')
      await expect(page.locator('main')).not.toHaveClass(/app--dark/)
    }
  })
}
