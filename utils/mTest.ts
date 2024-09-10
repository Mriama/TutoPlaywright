import { test as base } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

type mFixture = {
    basePage: BasePage
    homePage: HomePage
    loginPage: LoginPage
    registerPage: RegisterPage
}

export const test = base.extend<mFixture>({
    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page);
        await basePage.goto();
        await use(basePage);
        await basePage.exitPage();
    },
    homePage: async ({ basePage }, use) => {
        const homePage = new HomePage(basePage.page);
        await use(homePage);
    },
    loginPage: async ({ basePage }, use) => {
        const loginPage = new LoginPage(basePage.page);
        await use(loginPage);
    },
    registerPage: async ({ basePage }, use) => {
        const registerPage = new RegisterPage(basePage.page);
        await use(registerPage);
    }
});

export { expect } from '@playwright/test';