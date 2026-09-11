import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { SidebarPage } from '../page-objects/sidebar-page';

test.describe('Sidebar Search Functionality', () => {
  test('navigation verification after selecting search result', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAsAdmin();
    const sidebarPage = new SidebarPage(page);
    await sidebarPage.waitForSidebarReady();
    await sidebarPage.searchMenu('PIM');
    await sidebarPage.clickMenuByName('PIM');
    await page.waitForURL('**/pim/viewEmployeeList');
    await expect(page).toHaveURL(/\/pim\/viewEmployeeList/);
    await expect(page.getByText('Employee Information')).toBeVisible();
  });
});
