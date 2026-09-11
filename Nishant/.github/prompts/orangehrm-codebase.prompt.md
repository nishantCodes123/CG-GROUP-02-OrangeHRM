---
description: "Create and maintain the OrangeHRM Playwright TypeScript test codebase using POM, DDT, Allure, and the workspace Playwright agents."
agent: agent
---

# OrangeHRM Codebase Creation Prompt

Use this prompt as the required operating contract whenever creating, extending, refactoring, or healing this codebase. Do not create test code directly from assumptions when the application can be inspected with Playwright.

## Project Context

- Project: OrangeHRM end-to-end automation
- Application URL: `https://opensource-demo.orangehrmlive.com`
- Login URL: `/web/index.php/auth/login`
- Framework: Playwright Test with TypeScript
- Test directory: `tests/`
- Page Objects: `pages/`
- Test data: `test-data/`
- Shared fixtures: `tests/fixtures/`
- Test plans: `specs/`
- Browser projects: Chromium, Firefox, and WebKit
- Reporting: Playwright HTML and Allure

## Required Architecture

1. Use the Page Object Model for application interactions.
2. Use data-driven testing for repeated scenarios.
3. Use shared fixtures.
4. Use the configured base URL.
5. Keep test files focused.

## Test Creation Workflow

1. Read the applicable test plan in `specs/`.
2. Use the Playwright planner agent to inspect the live application and update or create a plan when the flow is not documented.
3. Use the Playwright generator agent to record each requested scenario and create the test file.
4. Refactor generated tests to use the existing Page Objects, fixtures, and test data.
5. Run the focused test file in Chromium.
6. Run the complete Chromium suite.
7. If a test fails, use the Playwright healer agent before changing selectors or expectations.
8. Run the affected test again after every fix, then rerun the full suite.
9. Do not mark tests as passed based only on static review.

## Test Quality Requirements

- Cover happy paths, validation, negative paths, and session boundaries where relevant.
- Start scenarios from a fresh state unless the test explicitly establishes a prerequisite.
- Assert URL changes, visible headings, meaningful alerts, and relevant content.
- Never assert implementation details that are not visible behavior unless testing accessibility or a specific contract.
- Keep credentials in test data or environment configuration when they are not public demo credentials.
- Avoid exposing secrets in reports, logs, screenshots, or error messages.
- Use stable test names that describe the behavior and dataset.
- Preserve traceability with comments linking generated tests to their plan and seed file when applicable.

## Validation Commands

```powershell
npm run test:chromium
npm test
npx playwright test tests/authentication --project=chromium
npx playwright show-report
```

## Change Safety Rules

- Inspect current files before editing them.
- Preserve unrelated user changes.
- Keep edits minimal and consistent with the existing TypeScript style.
- Do not commit changes or create branches unless explicitly requested.
- Do not add dependencies unless they are required and documented.
- After editing, run an executable validation command whenever available.
- Report any unavailable validation, external-service instability, or environment prerequisite clearly.
