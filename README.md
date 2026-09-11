# CG-GROUP-02-OrangeHRM


A collaborative Playwright + TypeScript QA automation repository for testing the OrangeHRM demo application.

The repository contains separate automation workspaces contributed by Abhijit, Chinmay, Dikshita, and Nishant. The suites collectively cover authentication, dashboard/navigation, sidebar search, Admin → User Management search, and PIM employee management.

Application under test: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

📌 Project Overview

The goal of this project is to build maintainable automated functional and regression coverage for the OrangeHRM web application using:

Playwright Test

TypeScript

Page Object Model (POM)

Data-driven test design

Positive, negative, boundary and end-to-end scenarios

HTML and Allure reporting in the workspaces that have reporting configured

The repository is currently organized as four independent contributor workspaces, rather than one centralized Playwright project.

🧰 Technology Stack

Technology

Usage

Playwright Test

Browser automation and test runner

TypeScript

Test and framework implementation

Node.js / npm

Dependency management and execution

Page Object Model

Reusable page-level abstractions

JSON / TypeScript test data

Test-data management currently present in the repo

HTML Report

Playwright execution reporting

Allure

Enhanced reporting in Nishant and Chinmay workspaces

GitHub

Source control and collaboration

The current projects use @playwright/test version ^1.63.0.

🏗️ Repository Structure

CG-GROUP-02-OrangeHRM/
│
├── Abhijit/
│   ├── .github/
│   ├── .vscode/
│   ├── specs/
│   │   └── orangehrm-qa-test-plan.md
│   ├── tests/
│   │   ├── admin-search/
│   │   ├── page-objects/
│   │   ├── sidebar-search/
│   │   ├── example.spec.ts
│   │   └── seed.spec.ts
│   ├── package.json
│   ├── playwright.config.ts
│   └── tsconfig.json
│
├── Chinmay/
│   ├── .github/
│   ├── .vscode/
│   ├── pages/
│   ├── specs/
│   │   └── test-plan documentation
│   ├── tests/
│   │   ├── data/
│   │   ├── example.spec.ts
│   │   ├── orangehrm-employee-management.spec.ts
│   │   └── seed.spec.ts
│   ├── allure-report/
│   ├── allure-results/
│   ├── package.json
│   ├── playwright.config.ts
│   └── tsconfig.json
│
├── Dikshita/
│   ├── .github/
│   ├── .vscode/
│   ├── pages/
│   │   ├── add-employee.page.ts
│   │   ├── index.ts
│   │   ├── login.page.ts
│   │   └── pim.page.ts
│   ├── specs/
│   │   ├── test_cases_orangeHRM.md
│   │   └── test_plan.orangeHRM.md
│   ├── testdata/
│   │   └── testdata.json
│   ├── tests/
│   │   ├── add-and-search-employee.spec.ts
│   │   ├── add-employee-required-fields.spec.ts
│   │   ├── search-employee-empty-and-reset.spec.ts
│   │   ├── example.spec.ts
│   │   └── seed.spec.ts
│   ├── package.json
│   ├── playwright.config.ts
│   └── tsconfig.json
│
├── Nishant/
│   ├── .github/
│   ├── pages/
│   │   ├── DashboardPage.ts
│   │   └── LoginPage.ts
│   ├── specs/
│   │   └── orangehrm-test-plan.md
│   ├── test-data/
│   │   └── login.data.ts
│   ├── tests/
│   │   ├── authentication/
│   │   ├── fixtures/
│   │   └── seed.spec.ts
│   ├── package.json
│   ├── playwright.config.ts
│   └── tsconfig.json
│
└── README.md

👥 Contributor Workstreams

1. Abhijit — Sidebar Search & Admin User Management

The Abhijit workspace focuses on two major functional areas:

Sidebar Search

Coverage includes:

Exact menu search

Partial-text search

Invalid search values

Clear/reset behavior

Navigation after selecting a result

UI stability and boundary inputs

Admin → User Management

Coverage includes:

Search by username

Search by user role

Search by status

Search by employee name

Combined filter search

Existing-user search

Non-existing-user search

Reset functionality

Result-table validation

Empty-result validation

Boundary and negative scenarios

End-to-end search flow

Framework Design

The workspace uses reusable page objects:

tests/page-objects/
├── base-page.ts
├── login-page.ts
├── sidebar-page.ts
└── admin-user-management-page.ts

BasePage contains shared navigation/login functionality, while feature-specific actions are encapsulated in dedicated page objects.

The test plan explicitly follows POM + DDT, with stable role/label-based selectors and reusable methods for login, navigation, filtering, reset and result validation.

2. Chinmay — Employee Management / PIM

The Chinmay workspace contains Playwright-based employee-management automation and Allure reporting artifacts.

Current structure includes:

pages/
├── add-employee.page.ts
├── login.page.ts
└── pim.page.ts

tests/
├── data/
│   └── employee.json
├── orangehrm-employee-management.spec.ts
├── example.spec.ts
└── seed.spec.ts

The test configuration is intentionally conservative for the shared demo environment:

Parallel execution disabled

60-second test timeout

CI retries enabled

Single worker

HTML + Allure reporting

Failure screenshots

Failure videos

Trace collection on first retry

This makes the workspace better suited to testing a shared public demo application where aggressive parallel execution can cause state/data interference.

3. Dikshita — PIM Add/Search Employee

The Dikshita workspace focuses on the OrangeHRM PIM Employee Management workflow.

Implemented scenarios

TC-PIM-001 — Add employee and search by employee name

Flow:

Login
  ↓
PIM
  ↓
Employee List
  ↓
Add Employee
  ↓
Enter First Name + Last Name
  ↓
Save
  ↓
Employee List
  ↓
Search employee
  ↓
Validate exactly one matching record

The test creates a unique first name using Date.now() so that repeated execution is less likely to collide with existing demo data.

TC-PIM-002 — Required employee fields

Validates:

First Name required

Last Name required

Validation when both fields are empty

Validation when only First Name is supplied

Validation clearing after both required names are entered

TC-PIM-003 — Empty search and Reset

Validates:

Unknown employee returns zero records

No table rows are displayed

Reset clears the search

Employee list is restored

A known employee can be searched successfully afterwards

Page Objects

pages/
├── login.page.ts
├── pim.page.ts
├── add-employee.page.ts
└── index.ts

The page objects encapsulate login, PIM navigation, employee search, employee creation and validation logic.

Current test data

The current implementation reads:

testdata/testdata.json

with data for:

Application URL

Demo username/password

Employee name prefix

Last name

Unknown employee search prefix

Known employee first name

Important: The current code uses JSON as its data source. If the project requirement is to use Excel for DDT, the test-data layer and imports should be migrated accordingly.

4. Nishant — Authentication, Dashboard & Navigation

The Nishant workspace focuses on the application's authentication lifecycle and authenticated dashboard behavior.

Authentication coverage

The documented test plan covers:

Successful login

Invalid login

Required login fields

Password recovery navigation

Password reset for an unknown user

Password field privacy/masking

Dashboard and navigation coverage

The plan also covers:

Dashboard widgets

Quick Launch actions

Sidebar module navigation

Logout

Direct dashboard access after logout

Login-page external links

The intended navigation coverage includes modules such as:

Admin
PIM
Leave
Time
Recruitment
My Info
Performance
Dashboard
Directory
Maintenance
Claim
Buzz

Fixtures

Nishant also introduces custom Playwright fixtures:

tests/fixtures/test.ts

which exposes reusable:

loginPage

dashboardPage

fixtures to tests.

Reporting

The Nishant configuration supports:

Playwright HTML report

Allure report

Chromium

Firefox

WebKit

Trace on first retry

🔐 Demo Application

URL

https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

Demo credentials

Username: Admin
Password: admin123

These are the standard credentials referenced by the project's test plans and test data.

Do not use real personal credentials in automation code or test-data files.

🚀 Installation

Because the repository currently contains separate Playwright workspaces, dependencies should be installed inside the workspace you want to execute.

Example:

cd Nishant
npm install

or:

cd Dikshita
npm install

or:

cd Chinmay
npm install

or:

cd Abhijit
npm install

Install Playwright browsers if required:

npx playwright install

▶️ Running Tests

Nishant

Nishant currently exposes npm scripts:

cd Nishant

npm test
npm run test:chromium
npm run test:headed
npm run report

Equivalent direct commands:

npx playwright test
npx playwright test --project=chromium
npx playwright test --headed
npx playwright show-report

Dikshita

The current package.json does not define custom npm scripts, so use:

cd Dikshita
npx playwright test

Run a specific test:

npx playwright test tests/add-and-search-employee.spec.ts

Run headed:

npx playwright test --headed

Open the HTML report:

npx playwright show-report

Chinmay

Use:

cd Chinmay
npx playwright test

The configuration generates HTML and Allure results.

Abhijit

Use:

cd Abhijit
npx playwright test

The current configuration targets Chromium and uses the Playwright HTML reporter.

📊 Reporting

Playwright HTML Report

After execution:

npx playwright show-report

Allure

Allure is configured in the Nishant and Chinmay workspaces.

Typical workflow:

npx playwright test

Then generate/open the Allure report using the workspace's configured Allure setup.

🧪 Test Design Strategy

The project follows a combination of:

Functional Testing

Validates expected application behavior for normal user workflows.

Positive Testing

Examples:

Valid login

Existing user search

Valid employee creation

Valid sidebar search

Valid filter combinations

Negative Testing

Examples:

Invalid credentials

Unknown employee

Non-existing user

Invalid search values

Empty search results

Missing mandatory fields

Boundary Testing

Examples:

Empty values

Whitespace

Long strings

Special characters

Rapid search/clear behavior

End-to-End Testing

Examples:

Login → Dashboard → Module → Search → Validate → Reset

and:

Login → PIM → Add Employee → Save → Employee List → Search → Validate

🧱 Page Object Model

The project uses POM to separate:

Test intent
   ↓
Page Object methods
   ↓
Locators + UI interaction
   ↓
Application

Instead of writing low-level locators repeatedly inside tests, page classes expose business-oriented actions such as:

login()
open()
searchEmployee()
resetSearch()
openAddEmployee()
save()
searchByUsername()
searchByUserRole()
searchByStatus()
applyCombinedFilters()

This improves:

Maintainability

Reusability

Readability

Locator management

Test stability

📁 Test Documentation

The repository contains detailed test planning documentation.

Abhijit

Abhijit/specs/orangehrm-qa-test-plan.md

Covers:

Scope

Test strategy

Environment

Test data

Entry/exit criteria

Roles

Test scenarios

Detailed test cases

Automation candidates

Traceability

Severity/priority classification

Dikshita

Dikshita/specs/test_plan.orangeHRM.md
Dikshita/specs/test_cases_orangeHRM.md

Focused on PIM employee creation/search and validation scenarios.

Nishant

Nishant/specs/orangehrm-test-plan.md

Focused on authentication, recovery, dashboard, navigation, quick-launch actions, logout and external links.

🔄 Recommended Execution Flow

For a complete regression-style execution, the workstreams can conceptually be executed in this order:

1. Authentication
       ↓
2. Dashboard / Navigation
       ↓
3. Sidebar Search
       ↓
4. Admin User Management
       ↓
5. PIM Employee Management
       ↓
6. Negative / Boundary Validation
       ↓
7. Reports

This provides coverage from basic access to feature-level and end-to-end validation.

⚠️ Current Repository Observations

The repository is functional as a collaborative collection of Playwright workspaces, but there are a few architectural points worth addressing before treating it as a single production-style framework.

1. No root-level Node project

There is currently no central root package.json.

Each contributor folder has its own Playwright project/dependencies.

2. Configuration is duplicated

Each workspace has its own:

package.json
playwright.config.ts
tsconfig.json

A future consolidation could provide one shared configuration.

3. Test-data approaches are inconsistent

Different workspaces currently use:

JSON

TypeScript data

Fixtures

Test-local/generated values

A common test-data layer would make the framework easier to maintain.

4. DDT is not centralized

The documentation promotes POM + DDT, but the implementation is not yet unified around one data source.

5. Example/seed files exist

Some workspaces still contain generated Playwright starter files such as:

example.spec.ts
seed.spec.ts

These should be removed or converted into intentional reusable setup/tests before final submission.

6. Shared demo environment

OrangeHRM's public demo is shared and its data can change.

Tests that create or modify data should therefore:

Generate unique values

Avoid depending on unstable records

Reset state where possible

Avoid unnecessary parallel execution for stateful flows

🎯 Recommended Future Framework Structure

If the individual workspaces are eventually consolidated, a cleaner enterprise-style structure would be:

CG-GROUP-02-OrangeHRM/
│
├── pages/
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   ├── SidebarPage.ts
│   ├── AdminUserManagementPage.ts
│   ├── PimPage.ts
│   └── AddEmployeePage.ts
│
├── tests/
│   ├── authentication/
│   ├── dashboard/
│   ├── sidebar/
│   ├── admin/
│   └── pim/
│
├── test-data/
│   ├── testData.xlsx
│   └── testDataReader.ts
│
├── fixtures/
│   └── test.ts
│
├── utils/
│   ├── excelReader.ts
│   └── testHelpers.ts
│
├── specs/
│   ├── test-plan.md
│   ├── test-cases.md
│   └── traceability-matrix.md
│
├── reports/
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md

This would give the team a single framework with shared POM, fixtures, utilities, test data and reporting.

👨‍💻 Development Guidelines

When adding new tests:

Keep tests independent.

Prefer POM methods over repeated locators.

Use role/label-based selectors where practical.

Keep test data outside test logic.

Generate unique data for creation workflows.

Avoid hard waits such as page.waitForTimeout() unless there is a documented reason.

Use meaningful test IDs/names.

Validate both positive and negative paths.

Keep assertions close to the behavior being validated.

Do not commit real credentials, secrets or personal data.

Remove temporary/generated example tests before final delivery.

Run the relevant workspace tests before pushing changes.

🤝 Contribution Workflow

Recommended Git workflow:

git checkout -b feature/<feature-name>

# Make changes

git add .
git commit -m "Add <feature> automation"

git push origin feature/<feature-name>

Then raise a Pull Request for review.

For team collaboration, avoid directly modifying another contributor's workspace unless the change is coordinated.

📋 Current Coverage Summary

Area

Workspace

Coverage

Authentication

Nishant

Login, invalid login, required fields, recovery, password privacy

Dashboard

Nishant

Widgets, quick launch, navigation, logout

Sidebar Search

Abhijit

Exact, partial, invalid, clear, navigation, boundary

Admin User Management

Abhijit

Username, role, status, employee, combined filters, reset

PIM Add Employee

Dikshita / Chinmay

Employee creation

PIM Search

Dikshita / Chinmay

Employee search and result validation

Required Fields

Dikshita

First/Last Name validation

Empty Search / Reset

Dikshita

No-match and reset behavior

Allure Reporting

Nishant / Chinmay

Configured

POM

All major workstreams

Implemented with varying levels of abstraction

DDT

Partial

Present in documentation/data layers, not yet centralized

📌 Important Notes

The tests target the public OrangeHRM demo environment.

Demo data may change between executions.

A passing test against the public demo should not be treated as proof of production readiness.

Test reports and generated artifacts should normally be reviewed before committing them.

Keep automation code, test documentation and test data synchronized when requirements change.

📚 Useful References

OrangeHRM Demo

OrangeHRM

Playwright Documentation

Playwright Test

👥 Team

Contributor

Primary Area

Abhijit

Sidebar Search + Admin User Management

Chinmay

Employee Management / PIM

Dikshita

PIM Add/Search + Validation

Nishant

Authentication + Dashboard + Navigation

📄 License

This repository is a project-specific QA automation implementation for the OrangeHRM demo application. Refer to the upstream OrangeHRM project for the application's licensing information
