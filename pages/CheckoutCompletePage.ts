import { expect, type Page } from '@playwright/test';
import { Urls } from '../constants/urls';

export class CheckoutCompletePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get completeHeader() {
    return this.page.getByTestId('complete-header');
  }

  get completeText() {
    return this.page.getByTestId('complete-text');
  }

  get backToProductsButton() {
    return this.page.getByTestId('back-to-products');
  }

  /** Asserts we are on checkout complete with thank-you content (uses Playwright auto-waiting). */
  async expectLoaded() {
    await expect(this.page).toHaveURL(Urls.CHECKOUT_COMPLETE);
    // "THANK YOU FOR YOUR ORDER" is the visible text (uppercase via CSS); element text is "Thank you for your order!"
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toBeVisible();
    await expect(this.completeText).toContainText('Your order has been dispatched');
    await expect(this.backToProductsButton).toBeVisible();
    await expect(this.backToProductsButton).toHaveText('Back Home');
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }
}
