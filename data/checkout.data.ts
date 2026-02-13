/**
 * Data-driven test data for checkout scenarios.
 */

export interface CheckoutCustomer {
  firstName: string;
  lastName: string;
  postalCode: string;
  description: string;
}

/** Customer info variants for checkout. */
export const checkoutCustomers: CheckoutCustomer[] = [
  { firstName: 'rav', lastName: 'banaag', postalCode: '10019', description: 'default customer' },
  { firstName: 'Jane', lastName: 'Doe', postalCode: '90210', description: 'Jane Doe' },
  { firstName: 'John', lastName: 'Smith', postalCode: '12345', description: 'John Smith' },
];

/** Product test IDs (add-to-cart button suffix on Saucedemo). */
export const checkoutProducts = [
  { productId: 'sauce-labs-backpack', description: 'Sauce Labs Backpack' },
  { productId: 'sauce-labs-bike-light', description: 'Sauce Labs Bike Light' },
  { productId: 'sauce-labs-bolt-t-shirt', description: 'Sauce Labs Bolt T-Shirt' },
] as const;
