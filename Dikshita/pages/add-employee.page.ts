import { expect, Page } from '@playwright/test';

export class AddEmployeePage {
  constructor(private readonly page: Page) {}

  readonly firstName = this.page.locator('input[name="firstName"]');
  readonly lastName = this.page.locator('input[name="lastName"]');
  readonly saveButton = this.page.getByRole('button', { name: 'Save' });

  async expectLoaded() {
    await expect(this.page.getByRole('heading', { name: 'Add Employee' })).toBeVisible();
  }

  async fillNames(firstName: string, lastName?: string) {
    await this.firstName.fill(firstName);
    if (lastName !== undefined) {
      await this.lastName.fill(lastName);
    }
  }

  async save() {
    await this.saveButton.click();
  }

  async expectSaved() {
    const successMessage = this.page.getByText('Successfully Saved');

    await Promise.race([
      this.page.waitForURL(/pim\/viewPersonalDetails\/empNumber\//, { timeout: 15000 }),
      expect(successMessage).toBeVisible({ timeout: 15000 }),
    ]);
  }

  async expectRequiredValidation() {
    await expect(this.page).toHaveURL(/pim\/addEmployee/);
    await expect(this.page.locator('.oxd-input-field-error-message').filter({ hasText: 'Required' }).first()).toBeVisible();
  }

  async expectNoRequiredValidation() {
    await expect(this.page.locator('.oxd-input-field-error-message').filter({ hasText: 'Required' })).toHaveCount(0);
  }
}
