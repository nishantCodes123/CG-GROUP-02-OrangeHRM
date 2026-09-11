import { expect, Page } from '@playwright/test';

export class AddEmployeePage {
  constructor(private readonly page: Page) {}

  async createEmployee(firstName: string, middleName: string, lastName: string): Promise<void> {
    await this.page.locator('.oxd-form-loader').waitFor({ state: 'hidden', timeout: 30000 });
    const firstNameInput = this.page.locator('input[placeholder="First Name"]');
    await expect(firstNameInput).toBeVisible({ timeout: 15000 });
    await firstNameInput.fill(firstName);
    await this.page.locator('input[placeholder="Middle Name"]').fill(middleName);
    await this.page.locator('input[placeholder="Last Name"]').fill(lastName);
    await this.page.getByRole('button', { name: 'Save' }).click();
    await expect(this.page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\//, { timeout: 30000 });
    await expect(this.page.getByRole('heading', { name: 'Personal Details' })).toBeVisible({ timeout: 15000 });
  }
}