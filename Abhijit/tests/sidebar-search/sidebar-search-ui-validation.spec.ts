import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { SidebarPage } from '../page-objects/sidebar-page';

test.describe('Sidebar Search Functionality', () => {
  test('ui validation and error handling for sidebar search', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAsAdmin();
    const sidebarPage = new SidebarPage(page);
    await sidebarPage.waitForSidebarReady();
    await sidebarPage.searchMenu('@@@');
    await expect(sidebarPage.searchBox).toHaveValue('@@@');
    await sidebarPage.clearSearch();
    await sidebarPage.searchMenu('Performance');
    await expect(sidebarPage.page.getByRole('link', { name: 'Performance' })).toBeVisible();
    await expect(sidebarPage.searchBox).toBeVisible();
    await expect(sidebarPage.page.locator('aside')).toBeVisible();
  });
});
