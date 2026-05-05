import { test, expect } from '@playwright/test';

import HomePage from '../../pages/home.page.js';
import LoginPage from '../../pages/login.page.js';
import SignupPage from '../../pages/signup.page.js';
import AccountCreatedPage from '../../pages/accountcreated.page.js';
import DeleteAccountPage from '../../pages/deleteaccount.page.js';

import { CharGen } from '../../utils/characterGenerator.js';
import { urls } from '../../utils/urls.js';

test('Login User with incorrect password shows error @regression', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const signup = new SignupPage(page);
  const accountcreated = new AccountCreatedPage(page);
  const deleteaccount = new DeleteAccountPage(page);

  const user = "user." + CharGen.getRandomString(4);
  const email = `${user}@test.com`;
  const correctPassword = "Correct123!";
  const wrongPassword = "Wrong123!";

  const details = {
    user,
    email,
    firstName: 'Test',
    lastName: 'User',
    company: 'Test Company',
    address1: '123 Test Street',
    address2: 'Apartment 456',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobileNumber: '123-456-7890',
    password: correctPassword,
    titleIndex: 0,
    day: '10',
    month: '5',
    year: '1995'
  };

  // 🔹 PRECONDICIÓN
  await test.step('Precondition: Register new user', async () => {
    await home.goto();
    await home.clickSignupLogin();

    await login.sendKeysSignupNameEmail(user, email);
    await login.signupButton.click();

    await signup.fillDetailsTitleNameEmailPasswordDateOfBirth(details);
    await signup.fillAddressInformation(details);

    await signup.createAccountButton.click();
    await accountcreated.continueButton.click();
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

  // 🔹 3. Verify home page is visible
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

  // 🔹 6. Enter incorrect credentials
  await test.step('6. Enter incorrect email address and password', async () => {
    await login.sendKeysLoginEmail(email, wrongPassword);
  });

  // 🔹 7. Click login
  await test.step("7. Click 'login' button", async () => {
    await login.loginButton.click();
  });

  // 🔹 8. Verify error message
  await test.step("8. Verify error 'Your email or password is incorrect!' is visible", async () => {
    await expect(login.redLabelLoginErrorText).toBeVisible();
    await expect(login.redLabelLoginErrorText)
      .toContainText('Your email or password is incorrect!');
  });

  // 🔹 CLEANUP
  await test.step('Cleanup: delete account', async () => {
    await login.sendKeysLoginEmail(email, correctPassword);
    await login.loginButton.click();

    await expect(home.loggedInAsText).toContainText(user);

    await home.clickDeleteAccount();
    await expect(deleteaccount.accountDeletedText).toBeVisible();
    await deleteaccount.continueButton.click();
  });

});