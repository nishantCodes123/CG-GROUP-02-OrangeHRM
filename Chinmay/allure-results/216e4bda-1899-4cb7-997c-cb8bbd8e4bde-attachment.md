# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: orangehrm-employee-management.spec.ts >> OrangeHRM employee management >> Add a new employee
- Location: tests\orangehrm-employee-management.spec.ts:10:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "https://opensource-demo.orangehrmlive.com/", waiting until "load"

```

# Test source

```ts
  1  | import { expect, Page } from '@playwright/test';
  2  | 
  3  | export class LoginPage {
  4  |   constructor(private readonly page: Page) {}
  5  | 
  6  |   async open(): Promise<void> {
> 7  |     await this.page.goto('https://opensource-demo.orangehrmlive.com/');
     |                     ^ Error: page.goto: Test timeout of 30000ms exceeded.
  8  |   }
  9  | 
  10 |   async login(username: string, password: string): Promise<void> {
  11 |     await this.page.locator('input[name="username"]').fill(username);
  12 |     await this.page.locator('input[name="password"]').fill(password);
  13 |     await this.page.getByRole('button', { name: 'Login' }).click();
  14 | await this.page.getByText('PIM', { exact: true })  }
  15 | }
```