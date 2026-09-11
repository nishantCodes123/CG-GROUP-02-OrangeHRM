import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class AdminUserManagementPage extends BasePage {
  readonly usernameInput: Locator;
  readonly userRoleDropdown: Locator;
  readonly employeeNameInput: Locator;
  readonly statusDropdown: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly resultsTable: Locator;
  readonly resultRows: Locator;
  readonly noRecordsText: Locator;

  constructor(page: Page) {
    super(page);
    const filterArea = page.locator('.oxd-table-filter-area');
    this.usernameInput = filterArea.locator('input').first();
    this.userRoleDropdown = filterArea.locator('.oxd-select-wrapper').nth(0).locator('.oxd-select-text-input');
    this.employeeNameInput = filterArea.locator('input[placeholder="Type for hints..."]').first();
    this.statusDropdown = filterArea.locator('.oxd-select-wrapper').nth(1).locator('.oxd-select-text-input');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.resultsTable = page.locator('.oxd-table');
    this.resultRows = page.locator('.oxd-table-row');
    this.noRecordsText = page.locator('.oxd-table-body').getByText('No Records Found').first();
  }

  async openUserManagement(): Promise<void> {
    const adminLink = this.page.getByRole('link', { name: 'Admin', exact: true });
    await adminLink.waitFor({ state: 'visible', timeout: 15000 });
    await adminLink.click();
    await this.page.waitForURL('**/admin/viewSystemUsers', { timeout: 15000 });
    await this.usernameInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  async searchByUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.searchButton.click();
  }

  async searchByUserRole(role: string): Promise<void> {
    await this.userRoleDropdown.click();
    await this.page.locator('.oxd-select-dropdown').getByText(role, { exact: true }).click();
    await this.searchButton.click();
  }

  async searchByStatus(status: string): Promise<void> {
    await this.statusDropdown.click();
    await this.page.locator('.oxd-select-dropdown').getByText(status, { exact: true }).click();
    await this.searchButton.click();
  }

  async searchByEmployeeName(name: string): Promise<void> {
    await this.employeeNameInput.fill(name);
    await this.searchButton.click();
  }

  async applyCombinedFilters(username: string, role: string, status: string, employeeName: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.userRoleDropdown.click();
    await this.page.locator('.oxd-select-dropdown').getByText(role, { exact: true }).click();
    await this.statusDropdown.click();
    await this.page.locator('.oxd-select-dropdown').getByText(status, { exact: true }).click();
    await this.employeeNameInput.fill(employeeName);
    await this.searchButton.click();
  }

  async resetFilters(): Promise<void> {
    await this.resetButton.click();
  }

  async clearUsername(): Promise<void> {
    await this.usernameInput.clear();
  }

  async clearEmployeeName(): Promise<void> {
    await this.employeeNameInput.clear();
  }
}
