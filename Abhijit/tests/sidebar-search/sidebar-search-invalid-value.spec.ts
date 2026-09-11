import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { SidebarPage } from '../page-objects/sidebar-page';

test.describe('Sidebar Search Functionality', () => {
  test('search with invalid non-existing value', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAsAdmin();
    const sidebarPage = new SidebarPage(page);
    await sidebarPage.waitForSidebarReady();
    await sidebarPage.searchMenu('xyz123');
    await expect(sidebarPage.searchBox).toHaveValue('xyz123');
    await expect(sidebarPage.page.locator('aside a')).toHaveCount(1);
  });
});
