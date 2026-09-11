import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { AdminUserManagementPage } from '../page-objects/admin-user-management-page';

test.describe('Admin User Management Search Functionality', () => {
  test('result table validation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAsAdmin();
    const userManagementPage = new AdminUserManagementPage(page);
    await userManagementPage.openUserManagement();
    await userManagementPage.searchByUsername('Admin');
    await expect(userManagementPage.resultsTable).toBeVisible();
    await expect(userManagementPage.resultsTable.getByText('Username', { exact: true })).toBeVisible();
    await expect(userManagementPage.resultsTable.getByText('User Role', { exact: true })).toBeVisible();
    await expect(userManagementPage.resultsTable.getByText('Employee Name', { exact: true })).toBeVisible();
    await expect(userManagementPage.resultsTable.getByText('Status', { exact: true })).toBeVisible();
  });
});
