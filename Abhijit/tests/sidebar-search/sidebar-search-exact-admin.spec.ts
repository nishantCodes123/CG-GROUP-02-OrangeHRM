import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { SidebarPage } from '../page-objects/sidebar-page';

test.describe('Sidebar Search Functionality', () => {
  test('search with exact menu name Admin', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAsAdmin();
    const sidebarPage = new SidebarPage(page);
    await sidebarPage.waitForSidebarReady();
    await sidebarPage.searchMenu('Admin');
    await expect(sidebarPage.adminLink).toBeVisible();
    await expect(sidebarPage.searchBox).toHaveValue('Admin');
    await sidebarPage.clickMenuByName('Admin');
    await page.waitForURL('**/admin/viewSystemUsers');
    await expect(page).toHaveURL(/\/admin\/viewSystemUsers/);
  });
});
