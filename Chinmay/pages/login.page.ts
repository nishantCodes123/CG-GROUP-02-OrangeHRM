import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 45000,
    });
    await expect(this.page.locator('input[name="username"]')).toBeVisible({ timeout: 15000 });
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.locator('input[name="username"]').fill(username);
    await this.page.locator('input[name="password"]').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
    await expect(this.page.getByRole('link', { name: 'PIM' })).toBeVisible({ timeout: 15000 });
  }
}