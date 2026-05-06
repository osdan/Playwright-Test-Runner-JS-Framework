import { test, expect } from '@playwright/test';

import HomePage from '../../pages/home.page.js';
import LoginPage from '../../pages/login.page.js';
import SignupPage from '../../pages/signup.page.js';
import AccountCreatedPage from '../../pages/accountcreated.page.js';

import { CharGen } from '../../utils/characterGenerator.js';
import { users } from '../../fixtures/users.js';
import { urls } from '../../utils/urls.js';

test('Register User with existing email shows error @regression', async ({ page }) => {

  const home = new HomePage(page);
  const login = new LoginPage(page);
  const signup = new SignupPage(page);
  const accountcreated = new AccountCreatedPage(page);

  const user = "user." + CharGen.getRandomString(4);
  const email = `${user}@test.com`;
  const password = "Test1234!";

  const details = { ...users[0], user, email, password, title: 'Mr' };

  // 🔹 PRECONDICIÓN: crear usuario existente
  await test.step('Precondition: Register existing user', async () => {
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
    await expect(page).toHaveURL(urls.baseURL + urls.paths.home);
    await expect(home.signupLoginButton).toBeVisible();
  });

  // 🔹 4. Click Signup / Login
  await test.step("4. Click on 'Signup / Login' button", async () => {
    await home.clickSignupLogin();
  });

  // 🔹 5. Verify 'New User Signup!'
  await test.step("5. Verify 'New User Signup!' is visible", async () => {
    await expect(login.newUserSignupText).toBeVisible();
  });

  // 🔹 6. Enter name and existing email
  await test.step('6. Enter name and already registered email address', async () => {
    const anotherUser = "user." + CharGen.getRandomString(4);
    await login.sendKeysSignupNameEmail(anotherUser, email);
  });

  // 🔹 7. Click Signup
  await test.step("7. Click 'Signup' button", async () => {
    await login.signupButton.click();
  });

  // 🔹 8. Verify error
  await test.step("8. Verify error 'Email Address already exist!' is visible", async () => {
    await expect(login.emailAlreadyExistText).toBeVisible();
  });

});