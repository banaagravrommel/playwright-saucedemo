import { expect, type Page } from '@playwright/test';
import { Urls } from '../constants/urls';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  get usernameInput() {
    return this.page.getByTestId('username');
  }

  get passwordInput() {
    return this.page.getByTestId('password');
  }

  get loginButton() {
    return this.page.getByTestId('login-button');
  }

  get errorMessage() {
    return this.page.getByTestId('error');
  }

  /** Asserts we are on the login page and form is visible (uses Playwright auto-waiting). */
  async expectLoginPage() {
    await expect(this.page).toHaveURL(Urls.LOGIN);
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.passwordInput.press('Enter');
  }

  async getErrorMessageText() {
    return this.errorMessage.textContent();
  }

  async isErrorVisible() {
    return this.errorMessage.isVisible();
  }
}
