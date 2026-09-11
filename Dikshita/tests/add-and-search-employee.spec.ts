import { test, expect } from '@playwright/test';
import testData from '../testdata/testdata.json';
import { AddEmployeePage, LoginPage, PimPage } from '../pages';

test.describe('OrangeHRM PIM', () => {
  test('TC-PIM-001 Add employee and search by employee name', async ({ page }) => {
    const loginPage = new LoginPage(page, testData.application.baseUrl);
    const pimPage = new PimPage(page, testData.application.baseUrl);
    const addEmployeePage = new AddEmployeePage(page);
    const firstName = `${testData.employee.firstNamePrefix}${Date.now()}`;
    const lastName = testData.employee.lastName;

    await loginPage.open();
    await loginPage.login(testData.application.username, testData.application.password);
    await pimPage.open();
    await pimPage.expectAddButtonVisible();
    await pimPage.openAddEmployee();
    await addEmployeePage.expectLoaded();
    await addEmployeePage.fillNames(firstName, lastName);
    await expect(addEmployeePage.firstName).toHaveValue(firstName);
    await expect(addEmployeePage.lastName).toHaveValue(lastName);
    await addEmployeePage.save();
    await addEmployeePage.expectSaved();
    await pimPage.openEmployeeList();
    await pimPage.searchEmployee(firstName);

    const row = pimPage.employeeRow(firstName, lastName);
    await expect(row).toHaveCount(1);
    await expect(row).toContainText(firstName);
    await expect(row).toContainText(lastName);
    await expect(pimPage.resultCount(/\(1\) Record Found/)).toBeVisible();
  });
});
