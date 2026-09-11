// spec: specs/orangehrm-test-plan.md
// seed: tests/seed.spec.ts

import { validLoginData } from '../../test-data/login.data';
import { test } from '../fixtures/test';

test.describe('Authentication and Recovery', () => {
  test('Successful login with the documented demo credentials', async ({ loginPage, dashboardPage }) => {
    await loginPage.open();
    await loginPage.login(validLoginData.username, validLoginData.password);
    await dashboardPage.expectLoaded();
  });
});
