# OrangeHRM Demo Test Plan

## Application Overview

Functional and negative test coverage for the OrangeHRM open-source demo at https://opensource-demo.orangehrmlive.com/web/index.php/auth/login. The plan covers login validation, password recovery navigation, authenticated dashboard content, module navigation, quick-launch actions, session termination, and key external links. Each scenario is independent and assumes a fresh browser context unless the steps explicitly establish an authenticated session.

## Test Scenarios

### 1. Authentication and Recovery

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with the documented demo credentials

**File:** `tests/authentication/successful-login.spec.ts`

**Steps:**
  1. Open https://opensource-demo.orangehrmlive.com/web/index.php/auth/login in a fresh browser context.
    - expect: The OrangeHRM Login page is displayed.
    - expect: Username and Password fields, Login button, and Forgot your password? control are visible.
    - expect: The page displays the demo credential hint: Username: Admin and Password: admin123.
  2. Enter Admin in the Username field.
    - expect: The Username field contains Admin.
  3. Enter admin123 in the Password field.
    - expect: The Password field contains the entered password without exposing it as plain text.
  4. Click Login.
    - expect: The browser navigates to /web/index.php/dashboard/index.
    - expect: The Dashboard heading is visible.
    - expect: The authenticated user area is visible.

#### 1.2. Reject login with invalid credentials

**File:** `tests/authentication/invalid-login.spec.ts`

**Steps:**
  1. Open the login URL in a fresh browser context.
    - expect: The Login page is displayed with empty Username and Password fields.
  2. Enter wrong-user in Username and wrong-password in Password.
    - expect: Both fields contain the supplied values.
  3. Click Login.
    - expect: The browser remains on /web/index.php/auth/login.
    - expect: An authentication error alert is displayed.
    - expect: The user is not granted access to the Dashboard.

#### 1.3. Validate required fields on an empty login submission

**File:** `tests/authentication/required-login-fields.spec.ts`

**Steps:**
  1. Open the login URL in a fresh browser context.
    - expect: The Login page is displayed.
  2. Click Login without entering a username or password.
    - expect: The page remains on the login form.
    - expect: Required-field validation is shown for the missing input fields.
    - expect: No authenticated dashboard is opened.

#### 1.4. Open and cancel password recovery

**File:** `tests/authentication/password-recovery-navigation.spec.ts`

**Steps:**
  1. Open the login URL in a fresh browser context.
    - expect: The Login page is displayed.
  2. Click Forgot your password?.
    - expect: The browser navigates to /web/index.php/auth/requestPasswordResetCode.
    - expect: The Reset Password heading and username field are visible.
    - expect: Cancel and Reset Password buttons are visible.
  3. Click Reset Password without entering a username.
    - expect: The recovery page remains open.
    - expect: The username field shows Required validation.
  4. Click Cancel.
    - expect: The browser returns to /web/index.php/auth/login.
    - expect: The login form is visible.

#### 1.5. Submit a password reset request for an unknown username

**File:** `tests/authentication/unknown-password-reset.spec.ts`

**Steps:**
  1. Open the login URL and click Forgot your password?.
    - expect: The Reset Password page is displayed.
  2. Enter a non-existent username such as no-such-user-qa in the Username field.
    - expect: The Username field contains the supplied value.
  3. Click Reset Password.
    - expect: The application responds with its configured reset-request result without exposing account existence or sensitive information.
    - expect: The resulting page or message is stable and understandable to the user.

#### 1.6. Preserve password confidentiality on the login form

**File:** `tests/authentication/password-field-privacy.spec.ts`

**Steps:**
  1. Open the login URL in a fresh browser context.
    - expect: The Password field is visible and empty.
  2. Enter any non-empty password.
    - expect: The password input masks the entered characters.
    - expect: The password is not rendered as visible plain text in the form.

### 2. Authenticated Dashboard and Navigation

**Seed:** `tests/seed.spec.ts`

#### 2.1. Render the authenticated dashboard widgets and quick actions

**File:** `tests/dashboard/dashboard-content.spec.ts`

**Steps:**
  1. Open the login URL in a fresh browser context and sign in with Admin and admin123.
    - expect: The browser navigates to /web/index.php/dashboard/index.
    - expect: The Dashboard heading is visible.
  2. Inspect the dashboard content.
    - expect: Time at Work, My Actions, Quick Launch, Buzz Latest Posts, Employees on Leave Today, Employee Distribution by Sub Unit, and Employee Distribution by Location sections are visible.
    - expect: Quick Launch exposes Assign Leave, Leave List, Timesheets, Apply Leave, My Leave, and My Timesheet actions.
    - expect: The OrangeHRM OS version and footer are visible.

### 2.2. Navigate to each primary sidebar module

**File:** `tests/dashboard/sidebar-navigation.spec.ts`

**Steps:**
  1. Sign in with Admin and admin123.
    - expect: The Dashboard is displayed with the Sidepanel navigation.
  2. Open each sidebar item: Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Dashboard, Directory, Maintenance, Claim, and Buzz.
    - expect: Each selected item navigates to its corresponding module route.
    - expect: The destination page loads without an authentication redirect.
    - expect: The selected module is identifiable from its page heading or active navigation state.
  3. Select Dashboard from the sidebar.
    - expect: The browser returns to /web/index.php/dashboard/index.
    - expect: The dashboard widgets are visible again.

### 2.3. Use dashboard quick-launch actions

**File:** `tests/dashboard/quick-launch-navigation.spec.ts`

**Steps:**
  1. Sign in with Admin and admin123 and open the Dashboard.
    - expect: The Quick Launch section is visible.
  2. Select Assign Leave, Leave List, Timesheets, Apply Leave, My Leave, and My Timesheet one at a time, returning to Dashboard between checks.
    - expect: Each action opens the expected leave or time-related page.
    - expect: The destination page is usable and does not show a broken route or login redirect.

### 2.4. End the authenticated session

**File:** `tests/dashboard/logout.spec.ts`

**Steps:**
  1. Sign in with Admin and admin123.
    - expect: The Dashboard is displayed.
  2. Open the profile menu and choose Logout.
    - expect: The browser returns to /web/index.php/auth/login.
    - expect: The login form is displayed.
  3. Navigate directly to /web/index.php/dashboard/index after logout.
    - expect: The application does not expose the authenticated dashboard.
    - expect: The user is redirected to login or shown an equivalent unauthenticated state.

### 2.5. Verify login-page external links

**File:** `tests/dashboard/login-external-links.spec.ts`

**Steps:**
  1. Open the login URL in a fresh browser context.
    - expect: The Login page and footer links are visible.
  2. Activate the LinkedIn, Facebook, X/Twitter, YouTube, and OrangeHRM, Inc. footer links individually.
    - expect: Each link points to the configured OrangeHRM or social destination.
    - expect: External navigation does not corrupt the original application session.
