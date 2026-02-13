import { expect, type Page } from '@playwright/test';
import { Urls } from '../constants/urls';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get pageTitle() {
    return this.page.getByTestId('title');
  }

  get checkoutButton() {
    return this.page.getByTestId('checkout');
  }

  get continueShoppingButton() {
    return this.page.getByTestId('continue-shopping');
  }

  /** Asserts we are on the cart page (uses Playwright auto-waiting). */
  async expectLoaded() {
    await expect(this.page).toHaveURL(Urls.CART);
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText('Your Cart');
    await expect(this.checkoutButton).toBeVisible();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
