import { test, expect } from '@playwright/test';
import testData from '../testdata/testdata.json';
import { LoginPage, PimPage } from '../pages';

test.describe('OrangeHRM PIM', () => {
  test('TC-PIM-003 Search for no match and reset the employee list', async ({ page }) => {
    const loginPage = new LoginPage(page, testData.application.baseUrl);
    const pimPage = new PimPage(page, testData.application.baseUrl);
    const unknownEmployee = `${testData.search.unknownEmployeePrefix}_${Date.now()}`;

    await loginPage.open();
    await loginPage.login(testData.application.username, testData.application.password);
    await pimPage.open();
    await pimPage.searchEmployee(unknownEmployee);
    await expect(pimPage.resultCount(/\(0\) Records Found|No Records Found/)).toBeVisible();
    await expect(pimPage.tableRows()).toHaveCount(0);
    await pimPage.resetSearch();
    await expect(pimPage.employeeNameSearch).toHaveValue('');
    await expect(pimPage.resultCount(/Records Found/)).toBeVisible();
    await pimPage.searchEmployee(testData.search.knownEmployeeFirstName);
    await expect(pimPage.employeeRow(testData.search.knownEmployeeFirstName).first()).toBeVisible();
    await expect(pimPage.resultCount(/\([1-9]\d*\) Record(s)? Found/)).toBeVisible();
  });
});
