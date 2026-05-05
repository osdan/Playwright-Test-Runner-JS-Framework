import { test, expect } from '@playwright/test';

import HomePage from '../../pages/home.page.js';
import LoginPage from '../../pages/login.page.js';
import SignupPage from '../../pages/signup.page.js';
import AccountCreatedPage from '../../pages/accountcreated.page.js';

import { CharGen } from '../../utils/characterGenerator.js';
import { users } from '../../fixtures/users.js';
import { urls } from '../../utils/urls.js';

test('Logout User @smoke', async ({ page }) => {

  const home = new HomePage(page);
  const login = new LoginPage(page);
  const signup = new SignupPage(page);
  const accountcreated = new AccountCreatedPage(page);

  const user = "user." + CharGen.getRandomString(4);
  const email = `${user}@test.com`;
  const password = "Test1234!";

  const details = { ...users[0], user, email, password, title: 'Mr' };

  // 🔹 PRECONDICIÓN: crear usuario
  await test.step('Precondition: Register user', async () => {
    await home.goto();
    await home.clickSignupLogin();

    await login.sendKeysSignupNameEmail(user, email);
    await login.signupButton.click();

    await signup.fillDetailsTitleNameEmailPasswordDateOfBirth(details);
    await signup.fillAddressInformation(details);

    await signup.createAccountButton.click();
    await accountcreated.continueButton.click();

    await expect(home.loggedInAsText).toContainText(user);
  });

    // 🔹 asegurar estado limpio
  await test.step('Ensure user is logged out', async () => {
    if (await home.logoutButton.isVisible()) {
      await home.clickLogout();
    }
  });

  // 🔹 1. Launch browser
  await test.step('1. Launch browser', async () => {
    // Playwright lo maneja
  });

  // 🔹 2. Navigate to url
  await test.step("2. Navigate to url 'http://automationexercise.com'", async () => {
    await home.goto();
  });

  // 🔹 3. Verify home page
  await test.step('3. Verify that home page is visible successfully', async () => {
    await expect(page).toHaveURL(urls.home);
    await expect(home.signupLoginButton).toBeVisible();
  });

  // 🔹 4. Click Signup / Login
  await test.step("4. Click on 'Signup / Login' button", async () => {
    await home.clickSignupLogin();
  });

  // 🔹 5. Verify login text
  await test.step("5. Verify 'Login to your account' is visible", async () => {
    await expect(login.loginAccountText).toBeVisible();
  });

  // 🔹 6. Enter credentials
  await test.step('6. Enter correct email address and password', async () => {
    await login.sendKeysLoginEmail(email, password);
  });

  // 🔹 7. Click login
  await test.step("7. Click 'login' button", async () => {
    await login.loginButton.click();
  });

  // 🔹 8. Verify logged in
  await test.step("8. Verify that 'Logged in as username' is visible", async () => {
    await expect(home.loggedInAsText).toContainText(user);
  });

  // 🔹 9. Click Logout
  await test.step("9. Click 'Logout' button", async () => {
    await home.clickLogout();
  });

  // 🔹 10. Verify redirect to login
  await test.step("10. Verify that user is navigated to login page", async () => {
    await expect(login.loginAccountText).toBeVisible();
  });

});