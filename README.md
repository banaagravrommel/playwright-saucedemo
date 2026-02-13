# Playwright Saucedemo

Playwright test suite for [Saucedemo](https://www.saucedemo.com) using TypeScript, Page Object Model, and data-driven tests.

## Setup

```bash
npm install
npx playwright install   # downloads Chromium, Firefox, WebKit (run once)
```

## Run tests

```bash
npm test              # headless, all browsers
npm run test:headed   # headed (see browser)
npm run test:ui       # interactive UI mode
npm run test:debug    # debug mode
npm run report        # open last HTML report
```

If Firefox tests fail locally but Chrome is fine, they may be flaky under parallel runs. Run Firefox with one worker (serial) to check:

```bash
# Windows (PowerShell)
$env:PW_FIREFOX_SERIAL=1; npx playwright test --project=firefox

# Windows (CMD)
set PW_FIREFOX_SERIAL=1 && npx playwright test --project=firefox
```

## Reporting

Three reporters run on every test run:

| Reporter | Purpose |
|----------|---------|
| **HTML** | Interactive report with traces, screenshots, and history. Run `npm run report` after tests to open it. Output: `playwright-report/`. |
| **Line** | Live progress in the terminal (one line per test). |
| **JUnit** | XML output at `test-results/junit.xml` for CI (GitHub Actions, Jenkins, GitLab, etc.) so test results and trends show in the pipeline. |

On **GitHub Actions**, the workflow (`.github/workflows/playwright.yml`) uploads the HTML report as an artifact so you can download and open it from the Actions run.

## Automated test cases

Total: **19 tests** (data-driven where applicable).

### Login (`tests/login.spec.ts`)

All login-related tests live in one file.

| # | Test case |
|---|-----------|
| 1 | **Successful login** – standard user |
| 2 | **Successful login** – problem user |
| 3 | **Successful login** – performance glitch user |
| 4 | **Successful login** – error user |
| 5 | **Invalid login** – locked out user (error, stay on login) |
| 6 | **Invalid login** – wrong password (error, stay on login) |
| 7 | **Invalid login** – empty username (error, stay on login) |
| 8 | **Invalid login** – empty password (error, stay on login) |
| 9 | **Invalid login** – non-existent user (error, stay on login) |
| 10 | **Login and logout** – standard user |
| 11 | **Login and logout** – problem user |
| 12 | **Login and logout** – performance glitch user |
| 13 | **Login and logout** – error user |

### Checkout (`tests/checkout.spec.ts`)

| # | Test case |
|---|-----------|
| 14 | Full checkout with default customer |
| 15 | Full checkout with Jane Doe |
| 16 | Full checkout with John Smith |
| 17 | Checkout with product: Sauce Labs Backpack |
| 18 | Checkout with product: Sauce Labs Bike Light |
| 19 | Checkout with product: Sauce Labs Bolt T-Shirt |

## Project structure

| Path | Description |
|------|-------------|
| `playwright.config.ts` | Playwright config (baseURL, browsers, testIdAttribute) |
| `tests/*.spec.ts` | Test files – `login.spec.ts`, `checkout.spec.ts` |
| `pages/*.ts` | Page Object Model (Login, Inventory, Cart, Checkout steps) |
| `data/*.data.ts` | Data-driven test data (login, checkout) |
| `constants/urls.ts` | URL patterns for assertions |
| `tsconfig.json` | TypeScript configuration |

## Approach

- **Page Object Model** – Selectors and page actions in `pages/`; specs only call page methods.
- **Data-driven tests** – Login users and invalid cases in `data/login.data.ts`; checkout customers and products in `data/checkout.data.ts`.
- **Assertions** – URL checks after navigation, visibility and text of key elements, error messages for negative cases.
- **Waits** – Playwright auto-waiting only (no `waitForTimeout` or hard sleeps).
