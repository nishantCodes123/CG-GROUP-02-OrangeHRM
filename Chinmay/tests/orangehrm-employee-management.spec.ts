import { test } from '@playwright/test';
import { AddEmployeePage } from '../pages/add-employee.page';
import { LoginPage } from '../pages/login.page';
import { PimPage } from '../pages/pim.page';

import employeeData from './data/employee.json';
const { credentials, employee } = employeeData;

test.describe('OrangeHRM employee management', () => {
  test('Add a new employee', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PimPage(page);
    const addEmployeePage = new AddEmployeePage(page);

    await loginPage.open();
    await loginPage.login(credentials.username, credentials.password);
    await pimPage.open();
    await pimPage.openAddEmployee();
    await addEmployeePage.createEmployee(employee.firstName, employee.middleName, employee.lastName);
  });

  test('Search for an employee', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PimPage(page);

    await loginPage.open();
    await loginPage.login(credentials.username, credentials.password);
    await pimPage.open();
    await pimPage.searchEmployee(employee.searchName);
    await pimPage.expectEmployeeVisible(employee.expectedSearchName);
  });
});