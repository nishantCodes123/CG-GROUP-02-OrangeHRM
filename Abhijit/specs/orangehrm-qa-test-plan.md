# OrangeHRM Demo Application – QA Test Plan

## 1. Objective
This test plan validates the critical functional behaviors of the OrangeHRM Demo Application with emphasis on:
- Sidebar Search functionality
- Admin → User Management search functionality

The objective is to ensure the application behaves correctly for valid, invalid, boundary, and exploratory scenarios, while confirming readiness for automation using Playwright, Page Object Model (POM), and Data-Driven Testing (DDT).

## 2. Scope

### In Scope
- Sidebar search for menu items
- Exact, partial, and invalid search values
- Clear search behavior
- Navigation after selecting search result
- UI stability and error handling
- Admin → User Management search by:
  - Username
  - User Role
  - Status
  - Employee Name
  - Combined criteria
- Search for existing and non-existing users
- Reset functionality
- Result table validation
- Empty result validation
- Positive, negative, boundary, and end-to-end scenarios

### Out of Scope
- Performance/load testing
- Security penetration testing
- Database integrity validation beyond UI behavior
- Accessibility audits beyond functional checklists
- Cross-browser compatibility beyond the defined test environment
- Non-feature modules outside the specified scope

## 3. Assumptions
- The OrangeHRM demo environment is available and stable: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
- The application uses seeded demo data
- Default login credentials remain valid:
  - Username: Admin
  - Password: admin123
- User management module is accessible to Admin role
- Search behavior is based on UI filtering and table results
- Data may vary slightly across demo refreshes; test data must be validated before execution

## 4. Test Strategy
The strategy is risk-based and aligned to high-priority user flows.

### Approach
- Functional validation of core search logic
- Positive and negative testing
- Boundary condition testing
- Exploratory validation for UI behavior and defects
- Automation-first for stable repetitive flows

### Coverage Model
- Smoke: login + module access + basic search
- Positive: valid values and expected results
- Negative: invalid inputs and empty result states
- Boundary: empty strings, long strings, leading/trailing spaces, special characters
- End-to-end: user search workflow from login to filter and result validation

### Test Levels
- Unit: not in scope for this document
- Integration: UI + business rule validation through search filters
- System/E2E: login, navigation, filtering, reset, table validation

## 5. Test Environment
| Item | Details |
|---|---|
| Application | OrangeHRM Demo |
| URL | https://opensource-demo.orangehrmlive.com/web/index.php/auth/login |
| Operating System | Windows 11 |
| Browser | Chrome / Edge (latest stable) |
| Execution Tool | Playwright |
| Test Framework | Playwright Test |
| Design Pattern | POM + DDT |
| Access Role | Admin |
| Test Data Source | Static JSON/CSV or hardcoded fixtures |

## 6. Test Data

### Core Test Data
| Category | Sample Values |
|---|---|
| Login | Username: Admin / Password: admin123 |
| Sidebar Search | Admin, PIM, Leave, performance, time, xyz123, @#$ |
| Existing Usernames | Admin, Alice Du, Linda Anderson |
| User Roles | Admin, ESS |
| Status | Enabled, Disabled |
| Employee Names | Alice Du, Linda Anderson, John Smith |
| Partial Search Terms | adm, pi, and, al, li |
| Invalid Search Terms | zzz123, notfound, ### |

> Note: Use live seeded values from the application as the canonical source for validation when the demo data changes.

## 7. Entry and Exit Criteria

### Entry Criteria
- Application URL is reachable
- Demo credentials are valid
- Browser environment is configured
- Test data is available
- Required test suites are identified
- Automation dependencies are installed

### Exit Criteria
- All planned critical and high-priority test cases are executed
- No open severe defects remain for the target scope
- Results are logged and signed off by QA lead
- Automation scripts for priority scenarios are in place and passing
- Traceability matrix is complete

## 8. Roles and Responsibilities
| Role | Responsibility |
|---|---|
| Senior QA Test Architect | Define strategy, scope, test design, traceability, automation planning |
| QA Engineer | Execute test cases, capture defects, verify fixes |
| SDET | Develop Playwright automation using POM + DDT |
| Developer | Fix defects and support environment readiness |
| Product Owner / BA | Clarify business rules and accept criteria |
| QA Lead | Review execution, sign-off, risk assessment |

## 9. Test Deliverables
- Test plan document
- Functional test scenarios
- Detailed test cases
- Traceability matrix
- Automation candidate matrix
- Defect report template
- Execution summary report
- Regression suite recommendations

## 10. Automation Approach (POM + DDT)

### Framework Structure
- POM for reusable page classes:
  - LoginPage
  - DashboardPage
  - SidebarPage
  - AdminUserManagementPage
- Data-driven testing for:
  - username variants
  - employee names
  - roles and statuses
  - invalid search values
- Reusable helper methods for:
  - login
  - open module
  - apply filter
  - reset filter
  - validate result rows
  - verify empty state

### Automation Principles
- Stable selectors using role- and label-based locators
- Assertions against visible UI and page state
- Separate test data from scripts
- Reuse page methods across scenarios
- Maintain independent tests for execution stability

## 11. Functional Test Scenarios

### A. Sidebar Search Functionality
#### SID-01: Exact menu search
- Search with exact menu name: Admin
- Search with exact menu name: PIM

#### SID-02: Partial text search
- Search with partial text: adm, pi, perf

#### SID-03: Invalid value search
- Search with non-existing item: xyz123, qwerty

#### SID-04: Clear search
- Enter value, validate filter, then clear and verify full menu restored

#### SID-05: Navigation after selecting result
- Choose a matching menu item and verify correct module loads

#### SID-06: UI validation and error handling
- Validate stable rendering, no layout break, no script errors

### B. Admin → User Management Search Functionality
#### ADM-01: Search by username
#### ADM-02: Search by user role
#### ADM-03: Search by status
#### ADM-04: Search by employee name
#### ADM-05: Combined search criteria
#### ADM-06: Search existing user
#### ADM-07: Search non-existing user
#### ADM-08: Reset functionality
#### ADM-09: Result table validation
#### ADM-10: Empty result validation
#### ADM-11: Boundary and negative validation
#### ADM-12: End-to-end search flow

## 12. Detailed Test Cases

| ID | Scenario | Type | Preconditions | Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| SID-01 | Search exact menu name Admin | Positive | User logged in | 1. Click sidebar search 2. Enter Admin 3. Select result | Admin | Admin page loads; result is accurate | P1 |
| SID-02 | Search exact menu name PIM | Positive | User logged in | 1. Search PIM 2. Click result | PIM | PIM module opens | P1 |
| SID-03 | Search partial text | Positive | User logged in | 1. Enter adm 2. Observe results | adm | Matching results shown | P2 |
| SID-04 | Search invalid value | Negative | User logged in | 1. Enter xyz123 2. Observe list | xyz123 | No matching result; stable UI | P1 |
| SID-05 | Clear search functionality | Positive | Search entered | 1. Search Admin 2. Clear field | Admin | Full sidebar restored | P2 |
| SID-06 | Navigation verification | E2E | User logged in | 1. Search PIM 2. Select result | PIM | Correct screen and route | P1 |
| SID-07 | UI validation with special characters | Boundary | User logged in | 1. Enter @#$, long strings, whitespace | @#$, long input | UI remains stable | P2 |
| ADM-01 | Search by Username | Positive | Admin on User Management | 1. Enter existing username 2. Search | Admin | Matching user row shown | P1 |
| ADM-02 | Search by User Role | Positive | User Management loaded | 1. Select Admin role 2. Search | Admin | Only matching role records remain | P1 |
| ADM-03 | Search by Status | Positive | User Management loaded | 1. Select Enabled 2. Search | Enabled | Enabled users displayed | P1 |
| ADM-04 | Search by Employee Name | Positive | User Management loaded | 1. Enter valid employee name | Alice Du | Matching employee row visible | P1 |
| ADM-05 | Combined search criteria | Positive | User Management loaded | 1. Fill username + role + status + employee name | Admin, Admin, Enabled, Alice Du | Only exact matching row(s) | P1 |
| ADM-06 | Search existing user | Positive | User exists | 1. Search valid user | Alice Du | Result appears in table | P1 |
| ADM-07 | Search non-existing user | Negative | User does not exist | 1. Enter absent username | notfounduser | Empty result state shown | P1 |
| ADM-08 | Reset functionality | Positive | Filters applied | 1. Apply 2-3 filters 2. Click Reset | Mixed filters | All filters clear | P1 |
| ADM-09 | Result table validation | Positive | Valid search performed | 1. Validate columns and row data | Existing records | Table values correct | P1 |
| ADM-10 | Empty result validation | Negative | No result expected | 1. Search invalid combination | invalid criteria | No rows, no crash | P1 |
| ADM-11 | Boundary values | Boundary | User Management loaded | 1. Try empty, whitespace, long text, special chars | empty, spaces, very long input | Consistent behavior, no page error | P2 |
| ADM-12 | End-to-end search flow | E2E | Login available | 1. Login 2. Navigate to Admin > User Management 3. Search 4. Reset 5. Validate | Existing/invalid criteria | Complete workflow successful | P1 |

## 13. Positive, Negative, Boundary, and End-to-End Coverage
### Positive
- Exact sidebar search
- Exact username search
- Valid user role
- Valid employee name
- Valid combined filters
- Reset after valid filters

### Negative
- Invalid sidebar values
- Non-existing user
- Invalid employee input
- Invalid filter combinations
- Empty result validation

### Boundary
- Empty inputs
- Whitespace-only strings
- Very long strings
- Special characters
- Rapid typing and clearing

### End-to-End
- Login → Dashboard → Sidebar search → Admin → User Management → Apply filters → Validate result → Reset → Validate return to default view

## 14. Automation Candidates and Priority Matrix
| Test ID | Candidate for Automation | Priority | Reason |
|---|---|---:|---|
| SID-01 | Yes | P1 | Repeated exact search validation |
| SID-02 | Yes | P1 | Stable and deterministic |
| SID-03 | Yes | P2 | Common negative test |
| SID-04 | Yes | P1 | Common user flow |
| SID-05 | Yes | P2 | Clear search validation |
| SID-06 | Yes | P1 | End-to-end navigation flow |
| SID-07 | Yes | P2 | UI stability check |
| ADM-01 | Yes | P1 | Core user search scenario |
| ADM-02 | Yes | P1 | Common role filter |
| ADM-03 | Yes | P1 | Common status filter |
| ADM-04 | Yes | P1 | Required business behavior |
| ADM-05 | Yes | P1 | Complex validation case |
| ADM-06 | Yes | P1 | Search existing records |
| ADM-07 | Yes | P1 | Critical negative scenario |
| ADM-08 | Yes | P1 | Reset requirement |
| ADM-09 | Yes | P1 | Result validation |
| ADM-10 | Yes | P1 | Empty-state validation |
| ADM-11 | Yes | P2 | Boundary coverage |
| ADM-12 | Yes | P1 | E2E regression check |

## 15. Traceability Matrix
| Requirement ID | Requirement Description | Related Test IDs |
|---|---|---|
| SID-01 | Sidebar exact menu search works | SID-01, SID-02 |
| SID-02 | Partial text search works | SID-03 |
| SID-03 | Invalid search shows no results and no crash | SID-04 |
| SID-04 | Clear search restores full list | SID-05 |
| SID-05 | Search selection navigates correctly | SID-06 |
| SID-06 | Sidebar renders and handles input safely | SID-07 |
| ADM-01 | Search by username | ADM-01, ADM-06 |
| ADM-02 | Search by user role | ADM-02 |
| ADM-03 | Search by status | ADM-03 |
| ADM-04 | Search by employee name | ADM-04 |
| ADM-05 | Combined search criteria behavior | ADM-05 |
| ADM-06 | Search returning existing user | ADM-06 |
| ADM-07 | Search returning no results | ADM-07, ADM-10 |
| ADM-08 | Reset works correctly | ADM-08 |
| ADM-09 | Result table content is correct | ADM-09 |
| ADM-10 | Empty-state behavior is correct | ADM-10 |
| ADM-11 | Boundary and negative behavior | ADM-11 |
| ADM-12 | End-to-end flow validation | ADM-12 |

## 16. Defect Severity / Priority Classification
| Severity | Description | Typical Examples |
|---|---|---|
| S1 / Critical | Product unusable or major functional failure | Login not working, search not filtering, navigation broken |
| S2 / Major | Significant functionality issue; workaround exists | Incorrect result table, reset failure |
| S3 / Moderate | Minor functional defect with limited impact | Partial search mismatch, UI formatting issue |
| S4 / Low | Cosmetic or minor usability issue | Minor alignment issue, text typo |

| Priority | Meaning |
|---|---|
| P1 | Fix before release / must pass |
| P2 | Fix in near-term release / important |
| P3 | Lower priority, fix if time permits |

## 17. Summary
This QA test plan provides full functional coverage for the OrangeHRM sidebar search and Admin user management search features, with explicit focus on:
- Search correctness
- Negative and boundary validation
- Reset logic
- User navigation
- Empty-state behavior
- Automation readiness

It is suitable for project review, test execution planning, and implementation using Playwright with POM and DDT.
