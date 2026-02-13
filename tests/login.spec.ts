import { test, expect } from '@playwright/test';
import { LoginPage, InventoryPage } from '../pages';
import {
  validLoginUsers,
  invalidLoginCases,
  VALID_PASSWORD,
} from '../data/login.data';
import { Urls } from '../constants/urls';

test.describe('Login', () => {
  test.describe('Successful login (data-driven)', () => {
    for (const user of validLoginUsers) {
      test(`${user.description} (${user.username})`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.goto();
        await loginPage.expectLoginPage();
        await loginPage.login(user.username, VALID_PASSWORD);

        await inventoryPage.expectLoaded();
        await expect(page).toHaveURL(Urls.INVENTORY);
      });
    }
  });

  test.describe('Invalid login – error and stay on login (data-driven)', () => {
    for (const case_ of invalidLoginCases) {
      test(`${case_.description}`, async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.expectLoginPage();
        await loginPage.login(case_.username, case_.password);

        await expect(page).toHaveURL(Urls.LOGIN);
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(case_.expectedError);
        await loginPage.expectLoginPage();
      });
    }
  });

  test.describe('Login and logout (data-driven)', () => {
    for (const user of validLoginUsers) {
      test(`${user.description} (${user.username})`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.goto();
        await loginPage.login(user.username, VALID_PASSWORD);
        await inventoryPage.expectLoaded();
        await expect(page).toHaveURL(Urls.INVENTORY);

        await inventoryPage.logout();
        await expect(page).toHaveURL(Urls.LOGIN);
        await loginPage.expectLoginPage();
      });
    }
  });
});
