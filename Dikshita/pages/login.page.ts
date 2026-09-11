import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page, private readonly baseUrl: string) {}

  async open() {
    await this.page.goto(`${this.baseUrl}/auth/login`);
    await expect(this.page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  }

  async login(username: string, password: string) {
    const usernameField = this.page.getByRole('textbox', { name: 'Username' });
    const passwordField = this.page.getByRole('textbox', { name: 'Password' });
    const loginButton = this.page.getByRole('button', { name: 'Login' });

    for (let attempt = 0; attempt < 2; attempt += 1) {
      await usernameField.fill(username);
      await passwordField.fill(password);
      await loginButton.click();

      try {
        await expect(this.page).toHaveURL(/dashboard\/index/, { timeout: 15000 });
        return;
      } catch (error) {
        if (attempt === 1) {
          throw error;
        }

        await this.page.goto(`${this.baseUrl}/auth/login`);
        await expect(usernameField).toBeVisible();
      }
    }
  }
}
