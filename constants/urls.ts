/**
 * Saucedemo URL path patterns for assertions.
 * Used with baseURL, so paths are relative (e.g. / or /inventory.html).
 */
export const Urls = {
  /** Login page (root). */
  LOGIN: /\/(?:index\.html)?$/,
  /** Inventory / products list. */
  INVENTORY: /\/inventory\.html/,
  /** Cart page. */
  CART: /\/cart\.html/,
  /** Checkout step 1: your information. */
  CHECKOUT_STEP_ONE: /\/checkout-step-one\.html/,
  /** Checkout step 2: overview. */
  CHECKOUT_STEP_TWO: /\/checkout-step-two\.html/,
  /** Checkout complete: thank you. */
  CHECKOUT_COMPLETE: /\/checkout-complete\.html/,
} as const;
