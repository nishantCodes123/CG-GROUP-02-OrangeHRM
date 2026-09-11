import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { AdminUserManagementPage } from '../page-objects/admin-user-management-page';

test.describe('Admin User Management Search Functionality', () => {
  test('combined search criteria', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAsAdmin();
    const userManagementPage = new AdminUserManagementPage(page);
    await userManagementPage.openUserManagement();
    await userManagementPage.applyCombinedFilters('Admin', 'Admin', 'Enabled', 'Alice Du');
    await expect(userManagementPage.resultsTable).toBeVisible();
    await expect(userManagementPage.page.locator('body')).toContainText('Admin');
    await expect(userManagementPage.page.locator('body')).toContainText('Enabled');
  });
});
