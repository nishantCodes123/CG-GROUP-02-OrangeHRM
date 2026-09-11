import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { SidebarPage } from '../page-objects/sidebar-page';

test.describe('Sidebar Search Functionality', () => {
  test('clear search functionality restores full sidebar', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAsAdmin();
    const sidebarPage = new SidebarPage(page);
    await sidebarPage.waitForSidebarReady();
    await sidebarPage.searchMenu('Admin');
    await expect(sidebarPage.adminLink).toBeVisible();
    await sidebarPage.clearSearch();
    await expect(sidebarPage.searchBox).toHaveValue('');
    await expect(sidebarPage.page.getByRole('link', { name: 'PIM' })).toBeVisible();
    await expect(sidebarPage.page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  });
});
