# Web UI Test Automation – Playwright

This project contains automated end-to-end (E2E) tests for the Web UI using Playwright.
It validates critical user flows, UI behavior, and regression scenarios across supported browsers.

---

## 📌 Tech Stack

- Language: TypeScript / JavaScript  
- Framework: Playwright  
- Test Runner: Playwright Test Runner  
- Package Manager: npm / yarn  
- CI Integration: GitHub Actions / GitLab CI / Jenkins (if applicable)


---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/ayaashraf170/UI-Automation-Playwright
cd WEB-UI-PLAYWRIGHT-FRAMEWORK
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

---

## 🚀 Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in headless mode
```bash
npx playwright test --headless
```

### Run tests in specific browser
```bash
npx playwright test --project=chromium
```

### Run a specific test file
```bash
npx playwright test tests/login.spec.ts
```

---

## 📊 View Test Report

After execution:

```bash
npx playwright show-report
```

Playwright generates an HTML report with screenshots, videos (if enabled), and trace files.

---

## 🧪 Test Design Pattern

This project follows:

- Page Object Model (POM)
- Reusable test utilities
- Test data separation
- Config-driven environment setup

---

## 🌍 Environment Configuration

Environment variables can be configured in:

- `.env` file  
- `playwright.config.ts`  

Example:

```
BASE_URL=https://test.example.com
```

---

## 📸 Debugging

Run in debug mode:

```bash
npx playwright test --debug
```

Enable trace:

```bash
npx playwright test --trace on
```

---

## 🔁 Continuous Integration (Example - GitHub Actions)

```yaml
- name: Install dependencies
  run: npm ci

- name: Install browsers
  run: npx playwright install --with-deps

- name: Run tests
  run: npx playwright test
```

---

## ✅ Best Practices

- Keep tests independent
- Avoid hard waits
- Use proper locators (getByRole, getByTestId)
- Store reusable selectors in Page Objects
- Maintain clean test data

---

## 📌 Supported Browsers

- Chromium
- Firefox
- WebKit

(Defined in `playwright.config.ts`)

---

## 📄 License

Specify your license here (e.g., MIT).
