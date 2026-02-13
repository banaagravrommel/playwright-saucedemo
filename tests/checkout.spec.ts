import { test, expect } from '@playwright/test';
import {
  LoginPage,
  InventoryPage,
  CartPage,
  CheckoutInfoPage,
  CheckoutOverviewPage,
  CheckoutCompletePage,
} from '../pages';
import { checkoutCustomers, checkoutProducts } from '../data/checkout.data';
import { VALID_PASSWORD } from '../data/login.data';
import { Urls } from '../constants/urls';

test.describe('Checkout (data-driven)', () => {
  for (const customer of checkoutCustomers) {
    test(`full checkout with ${customer.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);
      const cartPage = new CartPage(page);
      const checkoutInfoPage = new CheckoutInfoPage(page);
      const checkoutOverviewPage = new CheckoutOverviewPage(page);
      const checkoutCompletePage = new CheckoutCompletePage(page);

      await loginPage.goto();
      await loginPage.expectLoginPage();
      await loginPage.login('standard_user', VALID_PASSWORD);
      await inventoryPage.expectLoaded();
      await expect(page).toHaveURL(Urls.INVENTORY);

      await inventoryPage.addToCart('sauce-labs-backpack');
      await inventoryPage.goToCart();
      await cartPage.expectLoaded();
      await expect(page).toHaveURL(Urls.CART);

      await cartPage.proceedToCheckout();
      await checkoutInfoPage.expectLoaded();
      await expect(page).toHaveURL(Urls.CHECKOUT_STEP_ONE);

      await checkoutInfoPage.fillInfo(customer.firstName, customer.lastName, customer.postalCode);
      await checkoutInfoPage.continue();
      await checkoutOverviewPage.expectLoaded();
      await expect(page).toHaveURL(Urls.CHECKOUT_STEP_TWO);

      await checkoutOverviewPage.finish();
      await checkoutCompletePage.expectLoaded();
      await expect(page).toHaveURL(Urls.CHECKOUT_COMPLETE);
      await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
      await expect(checkoutCompletePage.backToProductsButton).toBeVisible();
    });
  }

  for (const product of checkoutProducts) {
    test(`checkout with product: ${product.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);
      const cartPage = new CartPage(page);
      const checkoutInfoPage = new CheckoutInfoPage(page);
      const checkoutOverviewPage = new CheckoutOverviewPage(page);
      const checkoutCompletePage = new CheckoutCompletePage(page);

      await loginPage.goto();
      await loginPage.login('standard_user', VALID_PASSWORD);
      await inventoryPage.expectLoaded();
      await expect(page).toHaveURL(Urls.INVENTORY);

      await inventoryPage.addToCart(product.productId);
      await inventoryPage.goToCart();
      await cartPage.expectLoaded();
      await expect(page).toHaveURL(Urls.CART);

      await cartPage.proceedToCheckout();
      await checkoutInfoPage.expectLoaded();
      await expect(page).toHaveURL(Urls.CHECKOUT_STEP_ONE);

      await checkoutInfoPage.fillInfo('Test', 'User', '12345');
      await checkoutInfoPage.continue();
      await checkoutOverviewPage.expectLoaded();
      await expect(page).toHaveURL(Urls.CHECKOUT_STEP_TWO);

      await checkoutOverviewPage.finish();
      await checkoutCompletePage.expectLoaded();
      await expect(page).toHaveURL(Urls.CHECKOUT_COMPLETE);
      await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
      await expect(checkoutCompletePage.completeText).toBeVisible();
      await expect(checkoutCompletePage.backToProductsButton).toBeVisible();
    });
  }
});
