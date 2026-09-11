import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  async loginAsAdmin(): Promise<void> {
    await BasePage.loginAsAdmin(this.page);
  }
}
