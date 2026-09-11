import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class SidebarPage extends BasePage {
  readonly searchBox: Locator;
  readonly adminLink: Locator;
  readonly pimLink: Locator;
  readonly menuLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.searchBox = page.getByPlaceholder('Search');
    this.adminLink = page.getByRole('link', { name: 'Admin' });
    this.pimLink = page.getByRole('link', { name: 'PIM' });
    this.menuLinks = page.locator('aside a');
  }

  async searchMenu(value: string): Promise<void> {
    await this.searchBox.fill(value);
  }

  async clearSearch(): Promise<void> {
    await this.searchBox.clear();
  }

  async clickMenuByName(name: string): Promise<void> {
    await this.page.getByRole('link', { name }).click();
  }

  async waitForSidebarReady(): Promise<void> {
    await this.searchBox.waitFor({ state: 'visible' });
  }
}
