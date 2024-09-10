import { test, expect } from '@playwright/test';

test('locator', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByRole('combobox').selectOption({ label: 'Price (High - Low)' });
    await page.getByRole('combobox').selectOption({ value: 'price,desc' });
    await page.getByRole('combobox').selectOption({ index: 2 });
    //await page.getByRole('textbox').fill('Mouhamed');
    await page.getByRole('button', { name: 'Search' }).click();
    //await page.getByRole('button').click();
    await page.getByRole('checkbox',{name:"Hand Tools"}).check();

    await page.getByLabel('Search').fill('Mouhamed');
    await page.getByPlaceholder('Search').fill('Mouhamed');
    await expect(page.getByText('Price Range')).toBeVisible();

    await page.getByAltText('Banner').click();

    await page.getByTestId('nav-home').click();

})


