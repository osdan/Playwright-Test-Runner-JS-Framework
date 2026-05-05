import { test, expect } from '@playwright/test';

import HomePage from '../../pages/home.page.js';
import LoginPage from '../../pages/login.page.js';
import SignupPage from '../../pages/signup.page.js';
import AccountCreatedPage from '../../pages/accountcreated.page.js';
import DeleteAccountPage from '../../pages/deleteaccount.page.js';

import { CharGen } from '../../utils/characterGenerator.js';
import { users } from '../../fixtures/users.js';
import { urls } from '../../utils/urls.js';


test('Login User with correct email and password @smoke', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const signup = new SignupPage(page);
    const accountcreated = new AccountCreatedPage(page);
    const deleteaccount = new DeleteAccountPage(page);

    const user = "chinchin." + CharGen.getRandomString(3);
    const email = user + '@chin.com';
    const password = CharGen.getRandomString(10);
    const details = { ...users[0], user, email, password };

  // 🔹 PRECONDICIÓN: crear usuario (no es parte del test case)
  await test.step('Precondition: Register new user', async () => {
    await home.goto();
    await home.signupLoginButton.click();
    await login.sendKeysSignupNameEmail(user, email);
    await login.signupButton.click();

    await signup.fillDetailsTitleNameEmailPasswordDateOfBirth(details);
    await signup.checkNewsletterSubscription();
    await signup.checkReceiveSpecialOffersSubscription();
    await signup.fillAddressInformation(details);

    await signup.createAccountButton.click();
    await accountcreated.ContinueButton();
  });

  await test.step('1. Launch browser', async () => {
    // automático en Playwright
  });

  await test.step("2. Navigate to url 'http://automationexercise.com'", async () => {
    await home.goto();
  });

  await test.step('3. Verify that home page is visible successfully', async () => {
    await expect(page).toHaveURL(urls.home);
  });

  await test.step("4. Click on 'Signup / Login' button", async () => {
    await home.clickSignupLogin();
  });

  await test.step("5. Verify 'Login to your account' is visible", async () => {
    await expect(login.loginAccountText).toBeVisible();
  });

  await test.step('6. Enter correct email address and password', async () => {
    await login.sendKeysLoginEmail(email, password);
  });

  await test.step("7. Click 'login' button", async () => {
    await login.loginButton.click();
  });

  await test.step("8. Verify that 'Logged in as username' is visible", async () => {
    await expect(home.loggedInAsText).toContainText(user);
  });

  await test.step("9. Click 'Delete Account' button", async () => {
    await home.clickDeleteAccount();
  });

  await test.step("10. Verify that 'ACCOUNT DELETED!' is visible", async () => {
    await expect(deleteaccount.accountDeletedText).toBeVisible();
    await deleteaccount.ContinueButton.click();
  });
});