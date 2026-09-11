import { test, expect } from '@playwright/test';
import testData from '../testdata/testdata.json';
import { AddEmployeePage, LoginPage, PimPage } from '../pages';

test.describe('OrangeHRM PIM', () => {
  test('TC-PIM-002 Validate required employee name fields', async ({ page }) => {
    const loginPage = new LoginPage(page, testData.application.baseUrl);
    const pimPage = new PimPage(page, testData.application.baseUrl);
    const addEmployeePage = new AddEmployeePage(page);
    const firstName = `${testData.employee.firstNamePrefix}Required${Date.now()}`;

    await loginPage.open();
    await loginPage.login(testData.application.username, testData.application.password);
    await pimPage.open();
    await pimPage.openAddEmployee();
    await addEmployeePage.expectLoaded();
    await addEmployeePage.save();
    await addEmployeePage.expectRequiredValidation();
    await addEmployeePage.fillNames(firstName);
    await addEmployeePage.save();
    await addEmployeePage.expectRequiredValidation();
    await addEmployeePage.fillNames(firstName, testData.employee.lastName);
    await addEmployeePage.expectNoRequiredValidation();
    await expect(addEmployeePage.saveButton).toBeEnabled();
  });
});
