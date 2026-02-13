import { expect, type Page } from '@playwright/test';
import { Urls } from '../constants/urls';

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get pageTitle() {
    return this.page.getByTestId('title');
  }

  get cartLink() {
    return this.page.getByTestId('shopping-cart-link');
  }

  get menuButton() {
    return this.page.getByRole('button', { name: 'Open Menu' });
  }

  get logoutLink() {
    return this.page.getByTestId('logout-sidebar-link');
  }

  /** Asserts we are on the inventory page with Products title (uses Playwright auto-waiting). */
  async expectLoaded() {
    await expect(this.page).toHaveURL(Urls.INVENTORY);
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText('Products');
    await expect(this.cartLink).toBeVisible();
  }

  addToCartButton(productTestId: string) {
    return this.page.getByTestId(`add-to-cart-${productTestId}`);
  }

  async addToCart(productTestId: string) {
    await this.addToCartButton(productTestId).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
