import { expect, Page } from '@playwright/test';

export class DashboardPage {
  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/web\/index\.php\/dashboard\/index/, { timeout: 30000 });
    await expect(this.page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  }
}
