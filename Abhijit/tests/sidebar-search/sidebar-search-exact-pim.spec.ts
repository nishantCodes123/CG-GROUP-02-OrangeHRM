import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { SidebarPage } from '../page-objects/sidebar-page';

test.describe('Sidebar Search Functionality', () => {
  test('search with exact menu name PIM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAsAdmin();
    const sidebarPage = new SidebarPage(page);
    await sidebarPage.waitForSidebarReady();
    await sidebarPage.searchMenu('PIM');
    await expect(sidebarPage.pimLink).toBeVisible();
    await expect(sidebarPage.searchBox).toHaveValue('PIM');
    await sidebarPage.clickMenuByName('PIM');
    await page.waitForURL('**/pim/viewEmployeeList');
    await expect(page).toHaveURL(/\/pim\/viewEmployeeList/);
  });
});
