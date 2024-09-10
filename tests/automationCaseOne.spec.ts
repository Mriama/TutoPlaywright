import { test, expect } from '@playwright/test';

test('locator', async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    await page.getByRole('button', { name: 'Consent' }).click();
    await expect(page.locator('.fa-home')).toBeVisible();
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    await page.getByPlaceholder('Name').fill('Mouhamed');
    //await page.getByPlaceholder('Email Address').fill('diallojina@gmail.com');
    await page.getByTestId('signup-email').fill('diallojina@gmail.com');
    //await page.getByRole('textbox', { name: 'email' }).fill('diallojina@gmail.com');
    await page.getByRole('button', { name: 'Signup' }).click();
    await expect(page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible();

    await page.getByLabel('Mrs').check();
    //await page.getByTestId('name').fill('Mouhamed');
    //await page.getByTestId('email').fill('diallojina@gmail.com');
    await page.getByTestId('password').fill('jina');

    await page.getByTestId('days').selectOption({ index: 22 });
    await page.getByRole('combobox',{ name: 'months' }).selectOption({ value: 'Septembre' });
    await page.getByRole('combobox',{ name: 'years' }).selectOption({ value: '1989' });

    
})