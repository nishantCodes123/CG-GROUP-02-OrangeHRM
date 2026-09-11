# OrangeHRM PIM Executable Test Cases

## Application Overview

Test cases derived from the OrangeHRM PIM add-and-search employee specification. These cases cover adding and locating a new employee, required-field validation, and empty search/reset behavior. Each case is independent and starts from a fresh authenticated session.

## Test Scenarios

### 1. OrangeHRM PIM

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC-PIM-001 Add employee and search by employee name

**File:** `tests/add-and-search-employee.spec.ts`

**Steps:**
  1. Start a fresh authenticated session on the OrangeHRM PIM Employee List page.
    - expect: Employee Information is visible with the Add button, Employee Name field, Search button, and employee table.
  2. Click Add.
    - expect: The Add Employee page is displayed with First Name, Middle Name, Last Name, Employee Id, Create Login Details, Cancel, and Save controls.
  3. Enter a unique First Name and a unique Last Name. Leave Middle Name empty and retain the generated Employee Id.
    - expect: The entered names remain in the form and the form is ready to submit.
  4. Click Save.
    - expect: The employee is saved and a success notification is displayed.
  5. Open Employee List from the PIM top menu.
    - expect: The Employee Information search form and employee table are displayed.
  6. Enter the exact new first name in Employee Name and click Search.
    - expect: Exactly one matching employee record is displayed with the new first name, last name, and assigned employee ID.
  7. Inspect the filtered result count and table rows.
    - expect: The result count is one and unrelated employee records are absent.

#### 1.2. TC-PIM-002 Validate required employee name fields

**File:** `tests/add-employee-required-fields.spec.ts`

**Steps:**
  1. Start a fresh authenticated session on the PIM Employee List page and click Add.
    - expect: The Add Employee page is displayed.
  2. Leave First Name and Last Name blank, then click Save.
    - expect: The user remains on Add Employee and required validation is displayed for the missing name fields.
  3. Enter only a First Name and click Save again.
    - expect: The user remains on the form and Last Name is reported as required.
  4. Enter a Last Name.
    - expect: The employee name validation is cleared and the form is ready for submission.

#### 1.3. TC-PIM-003 Search for no match and reset the employee list

**File:** `tests/search-employee-empty-and-reset.spec.ts`

**Steps:**
  1. Start a fresh authenticated session on the OrangeHRM PIM Employee List page.
    - expect: The Employee Information form and employee table are displayed.
  2. Enter a guaranteed-unknown value in Employee Name and click Search.
    - expect: The result count is zero and no employee rows are displayed.
  3. Click Reset.
    - expect: Search fields return to their default state and the unfiltered employee list is restored.
  4. Search for the exact first name of a known employee.
    - expect: The matching employee is returned and the result count reflects the matching record.
