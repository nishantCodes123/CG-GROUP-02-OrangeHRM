// spec: specs/orangehrm-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/test';

test.describe('Authentication and Recovery', () => {
  test('Open and validate password recovery', async ({ page, loginPage }) => {
    await loginPage.open();
    await loginPage.openPasswordRecovery();
    await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();

    await page.getByRole('button', { name: 'Reset Password' }).click();
    await expect(page.getByText('Required')).toBeVisible();

    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login/);
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });
});
