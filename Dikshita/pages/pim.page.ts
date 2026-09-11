import { expect, Page } from '@playwright/test';

export class PimPage {
  readonly employeeNameSearch = this.page.getByRole('textbox', { name: 'Type for hints...' }).first();

  constructor(private readonly page: Page, private readonly baseUrl: string) {}

  async open() {
    await this.page.goto(`${this.baseUrl}/pim/viewEmployeeList`);
    await expect(this.page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();
  }

  async expectAddButtonVisible() {
    await expect(this.page.getByRole('button', { name: /Add/ })).toBeVisible();
  }

  async openEmployeeList() {
    await this.page.getByRole('link', { name: 'Employee List' }).click();
    await expect(this.page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();
  }

  async openAddEmployee() {
    await this.page.getByRole('button', { name: /Add/ }).click();
  }

  async searchEmployee(name: string) {
    await this.employeeNameSearch.fill(name);
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async resetSearch() {
    await this.page.getByRole('button', { name: 'Reset' }).click();
  }

  employeeRow(firstName: string, lastName?: string) {
    const text = lastName ? `${firstName} ${lastName}` : firstName;
    return this.page.getByRole('row').filter({ hasText: text });
  }

  resultCount(text: RegExp) {
    return this.page.getByText(text).first();
  }

  tableRows() {
    return this.page.locator('tbody tr');
  }
}
