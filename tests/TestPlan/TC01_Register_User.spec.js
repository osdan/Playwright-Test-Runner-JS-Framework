import { test, expect } from '@playwright/test';

import HomePage from '../../pages/home.page.js';
import LoginPage from '../../pages/login.page.js';
import SignupPage from '../../pages/signup.page.js';
import AccountCreatedPage from '../../pages/accountcreated.page.js';
import DeleteAccountPage from '../../pages/deleteaccount.page.js';

import { urls } from '../../utils/urls.js';
import { CharGen } from '../../utils/characterGenerator.js';
import { users } from '../../fixtures/users.js';

test('Register User @smoke', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const signup = new SignupPage(page);
  const accountcreated = new AccountCreatedPage(page);
  const deleteaccount = new DeleteAccountPage(page);
  const user = "chinchin." + CharGen.getRandomString(3);
  const email = user + '@chin.com';
  const password = CharGen.getRandomString(10);
 const details = { ...users[0], user, email, password };

  await test.step('1. Launch browser', async () => {
    // Playwright ya lanza el browser automáticamente
  });

  await test.step("2. Navigate to url 'http://automationexercise.com'", async () => {
    await home.goto();
  });

  await test.step('3. Verify that home page is visible successfully', async () => {
    await expect(page).toHaveURL(urls.baseURL + urls.paths.home);
    await expect(home.signupLoginButton).toBeVisible();
  });

  await test.step("4. Click on 'Signup / Login' button", async () => {
    await home.signupLoginButton.click();
  });

  await test.step("5. Verify 'New User Signup!' is visible", async () => {
    await expect(login.newUserSignupText).toBeVisible();
  });

  await test.step('6. Enter name and email address', async () => {
    await login.sendKeysSignupNameEmail(user, email);
  });

  await test.step("7. Click 'Signup' button", async () => {
    await login.signupButton.click();
  });

  await test.step("8. Verify that 'ENTER ACCOUNT INFORMATION' is visible", async () => {
    await expect(signup.enterAccountInfoText).toBeVisible();
  });

  await test.step('9. Fill account information', async () => {
    await signup.fillDetailsTitleNameEmailPasswordDateOfBirth(details);
  });

  await test.step("10. Select checkbox 'Sign up for our newsletter!'", async () => {
    await signup.checkNewsletterSubscription();
  });

  await test.step("11. Select checkbox 'Receive special offers from our partners!'", async () => {
    await signup.checkReceiveSpecialOffersSubscription();
  });

  await test.step('12. Fill address information', async () => {
    await signup.fillAddressInformation(details);
  });

  await test.step("13. Click 'Create Account' button", async () => {
    await signup.createAccountButton.click();
  });

  await test.step("14. Verify that 'ACCOUNT CREATED!' is visible", async () => {
    await expect(accountcreated.accountCreatedText).toBeVisible();
  });

  await test.step("15. Click 'Continue' button", async () => {
    await accountcreated.continueButton.click();
  });

  await test.step("16. Verify that 'Logged in as username' is visible", async () => {
    await expect(home.loggedInAsText).toContainText(user);
  });

  await test.step("17. Click 'Delete Account' button", async () => {
    await home.deleteAccountButton.click();
  });

  await test.step("18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue'", async () => {
    await expect(deleteaccount.accountDeletedText).toBeVisible();
    await deleteaccount.continueButton.click();
  });
});