import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { SidebarPage } from '../page-objects/sidebar-page';

test.describe('Sidebar Search Functionality', () => {
  test('search with partial text', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAsAdmin();
    const sidebarPage = new SidebarPage(page);
    await sidebarPage.waitForSidebarReady();
    await sidebarPage.searchMenu('adm');
    await expect(sidebarPage.searchBox).toHaveValue('adm');
    await expect(sidebarPage.adminLink).toBeVisible();
    await sidebarPage.clearSearch();
    await expect(sidebarPage.menuLinks.filter({ hasText: 'Admin' })).toHaveCount(1);
  });
});
