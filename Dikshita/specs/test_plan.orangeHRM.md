# OrangeHRM PIM Add and Search Employee Test Plan

## Application Overview

Test plan for the OrangeHRM Open Source demo PIM workflow. Authenticated users add an employee with required personal details, then locate the saved employee from the Employee List using the Employee Name search. The plan also covers required-field validation and search no-match/reset behavior. Each scenario assumes a fresh state and uses a unique employee name where data creation is required.

## Test Scenarios

### 1. PIM Employee Add and Search

**Seed:** `tests/seed.spec.ts`

#### 1.1. Add a new employee and find it by employee name

**File:** `tests/add-and-search-employee.spec.ts`

**Steps:**

1. Start from a fresh authenticated session on the OrangeHRM PIM Employee List page.
   - expect: The Employee Information page is displayed with an Add button, Employee Name search field, Search button, and employee table.
2. Click the Add button.
   - expect: The Add Employee page opens. First Name, Middle Name, Last Name, Employee Id, Create Login Details, Cancel, and Save controls are visible.
3. Enter a unique value in First Name and a unique value in Last Name. Leave Middle Name empty and leave Employee Id at its generated/default value unless the test data requires a controlled ID.
   - expect: The entered first and last names remain in their fields and the form is ready to save.
4. Click Save.
   - expect: The employee is saved successfully and a success notification is displayed.
5. Open Employee List from the PIM top menu.
   - expect: The Employee Information search form and employee table are displayed.
6. Enter the exact new first name in the Employee Name field, then click Search.
   - expect: The results show exactly one matching record with the new first name, last name, and employee ID.
7. Verify that unrelated employee rows are not present in the filtered results.
   - expect: The record count is one and the displayed row matches the employee just created.

#### 1.2. Prevent saving an employee when required names are blank

**File:** `tests/add-employee-required-fields.spec.ts`

**Steps:**

1. Start from a fresh authenticated session on the PIM Employee List page and click Add.
   - expect: The Add Employee page opens.
2. Leave First Name and Last Name blank and click Save.
   - expect: The user remains on the Add Employee page and required-field validation is shown.
3. Enter only a First Name and click Save again.
   - expect: The user remains on the form and Last Name is still reported as required.
4. Enter a Last Name as well.
   - expect: The required-field validation is cleared and the form can be submitted.

#### 1.3. Show no results for an unknown employee and restore the list with Reset

**File:** `tests/search-employee-empty-and-reset.spec.ts`

**Steps:**

1. Start from a fresh authenticated session on the PIM Employee List page.
   - expect: The Employee Information form and employee table are displayed.
2. Enter a value that cannot match an employee in the Employee Name search field and click Search.
   - expect: The result count indicates zero records, the table has no employee rows, and no unrelated employee is shown.
3. Click Reset.
   - expect: All search fields return to their default state and the employee list is restored.
4. Search again using the exact first name of a known employee.
   - expect: The matching employee is returned and the result count reflects the matching record.
