import { expect, type Page } from '@playwright/test';
import { Urls } from '../constants/urls';

export class CheckoutOverviewPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get pageTitle() {
    return this.page.getByTestId('title');
  }

  get finishButton() {
    return this.page.getByTestId('finish');
  }

  get paymentInfoSection() {
    return this.page.getByTestId('payment-info-value');
  }

  get totalLabel() {
    return this.page.getByTestId('total-label');
  }

  /** Asserts we are on checkout overview (uses Playwright auto-waiting). */
  async expectLoaded() {
    await expect(this.page).toHaveURL(Urls.CHECKOUT_STEP_TWO);
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText('Checkout: Overview');
    await expect(this.paymentInfoSection).toBeVisible();
    await expect(this.totalLabel).toBeVisible();
    await expect(this.finishButton).toBeVisible();
  }

  async finish() {
    await this.finishButton.click();
  }
}
