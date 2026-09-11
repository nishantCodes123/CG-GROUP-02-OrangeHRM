import { expect, Page } from '@playwright/test';

export class PimPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.getByRole('link', { name: 'PIM' }).click();
    await expect(this.page.getByRole('heading', { name: 'Employee Information' })).toBeVisible({ timeout: 15000 });
  }

  async openAddEmployee(): Promise<void> {
    await this.page.getByRole('link', { name: 'Add Employee' }).click();
    await expect(this.page.getByRole('heading', { name: 'Add Employee' })).toBeVisible({ timeout: 15000 });
  }

  async searchEmployee(name: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Type for hints...' }).first().fill(name);
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async expectEmployeeVisible(expectedName: string): Promise<void> {
    const employeeRow = this.page.getByRole('row', { name: new RegExp(expectedName) }).first();
    await expect(employeeRow).toBeVisible({ timeout: 15000 });
  }
}