import { expect, type Page } from '@playwright/test';
import { Urls } from '../constants/urls';

export class CheckoutInfoPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get pageTitle() {
    return this.page.getByTestId('title');
  }

  get firstNameInput() {
    return this.page.getByTestId('firstName');
  }

  get lastNameInput() {
    return this.page.getByTestId('lastName');
  }

  get postalCodeInput() {
    return this.page.getByTestId('postalCode');
  }

  get continueButton() {
    return this.page.getByTestId('continue');
  }

  get cancelButton() {
    return this.page.getByTestId('cancel');
  }

  /** Asserts we are on checkout step one (uses Playwright auto-waiting). */
  async expectLoaded() {
    await expect(this.page).toHaveURL(Urls.CHECKOUT_STEP_ONE);
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText('Checkout: Your Information');
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async fillInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }
}
