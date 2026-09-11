// spec: specs/orangehrm-test-plan.md
// seed: tests/seed.spec.ts

import { invalidLoginData } from '../../test-data/login.data';
import { test, expect } from '../fixtures/test';

test.describe('Authentication and Recovery', () => {
  for (const loginData of invalidLoginData) {
    test(`Reject login with ${loginData.caseName}`, async ({ page, loginPage }) => {
      await loginPage.open();
      await loginPage.login(loginData.username, loginData.password);

      await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login/, { timeout: 30000 });
      if (loginData.username && loginData.password) {
        await expect(page.getByRole('alert')).toBeVisible({ timeout: 30000 });
      } else {
        await expect(page.getByText('Required')).toHaveCount(2);
      }
      await expect(page.getByRole('heading', { name: 'Dashboard' })).not.toBeVisible();
    });
  }
});
