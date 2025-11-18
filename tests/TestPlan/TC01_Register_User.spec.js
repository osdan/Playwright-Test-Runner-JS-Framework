import { test, expect } from '@playwright/test';

import HomePage from '../../pages/home.page.js';
import LoginPage from '../../pages/login.page.js';
import SignupPage from '../../pages/signup.page.js';
import AccountCreatedPage from '../../pages/accountcreated.page.js';
import DeleteAccountPage from '../../pages/deleteaccount.page.js';

import { urls } from '../../utils/urls.js';
import { CharGen } from '../../utils/characterGenerator.js';
import { users } from '../../fixtures/users.js';

test('Register User', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const signup = new SignupPage(page);
  const accountcreated = new AccountCreatedPage(page);
  const deleteaccount = new DeleteAccountPage(page);
  const user = "chinchin." + CharGen.getRandomString(3);
  const email = user + '@chin.com';
  const password = CharGen.getRandomString(10);
  const details = users[0];
  details.user = user;
  details.password = password;
  details.email = email;


  await home.goto();
  await expect(page).toHaveURL(urls.home);
  await home.signupLoginButton.click();
  await expect(login.newUserSignupText).toBeVisible();
  await login.sendKeysSignupNameEmail(user, email);
  await login.signupButton.click();
  await expect(signup.enterAccountInfoText).toBeVisible();
  await signup.fillDetailsTitleNameEmailPasswordDateOfBirth(details);

  await signup.checkNewsletterSubscription();
  await signup.checkReceiveSpecialOffersSubscription();
  await signup.fillAddressInformation(details);

  await signup.createAccountButton.click();
  await expect(accountcreated.accountCreatedText).toBeVisible();
  await accountcreated.continueButton.click();
  await expect(home.loggedInAsText).toContainText(user);
  await home.deleteAccountButton.click();
  await expect(deleteaccount.accountDeletedText).toBeVisible();
  await deleteaccount.continueButton.click();

});
  
test('Login User with correct email and password', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const signup = new SignupPage(page);
    const accountcreated = new AccountCreatedPage(page);
    const deleteaccount = new DeleteAccountPage(page);

    const user = "chinchin." + CharGen.getRandomString(3);
    const email = user + '@chin.com';
    const password = CharGen.getRandomString(10);
    const details = { ...users[0], user, email, password };

    // Register new user (reuse signup flow)
    await home.goto();
    await home.signupLoginButton.click();
    await expect(login.newUserSignupText).toBeVisible();
    await login.sendKeysSignupNameEmail(user, email);
    await login.signupButton.click();
    await expect(signup.enterAccountInfoText).toBeVisible();
    await signup.fillDetailsTitleNameEmailPasswordDateOfBirth(details);
    await signup.checkNewsletterSubscription();
    await signup.checkReceiveSpecialOffersSubscription();
    await signup.fillAddressInformation(details);
    await signup.createAccountButton.click();
    await expect(accountcreated.accountCreatedText).toBeVisible();
    await accountcreated.continueButton.click();
    await expect(home.loggedInAsText).toContainText(user);

    // Attempt sign out if available, then login using login form
    if (home.logoutButton) await home.logoutButton.click();
    await home.signupLoginButton.click();

    await login.sendKeysLoginEmail(email, password);
    await login.loginButton.click();

    await expect(home.loggedInAsText).toContainText(user);

    // Cleanup
    await home.deleteAccountButton.click();
    await expect(deleteaccount.accountDeletedText).toBeVisible();
    await deleteaccount.continueButton.click();
  });

test('Login User with incorrect password shows error', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const signup = new SignupPage(page);
    const accountcreated = new AccountCreatedPage(page);
    const deleteaccount = new DeleteAccountPage(page);

    const user = "chinchin." + CharGen.getRandomString(3);
    const email = user + '@chin.com';
    const wrongPassword = CharGen.getRandomString(8);

    await home.goto();
    await home.signupLoginButton.click();
    await expect(login.loginAccountText).toBeVisible();

    await login.sendKeysLoginEmail(email, wrongPassword);
    await login.loginButton.click();

    await expect(login.redLabelLoginErrorText).toBeVisible();
  });

test('Register User with existing email shows error', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const signup = new SignupPage(page);
    const accountcreated = new AccountCreatedPage(page);
    const deleteaccount = new DeleteAccountPage(page);

    const user = "chinchin." + CharGen.getRandomString(3);
    const email = user + '@chin.com';
    const password = CharGen.getRandomString(10);
    const details = { ...users[0], user, email, password };

    // Create initial account
    await home.goto();
    await home.signupLoginButton.click();
    await login.sendKeysSignupNameEmail(user, email);
    await login.signupButton.click();
    await signup.fillDetailsTitleNameEmailPasswordDateOfBirth(details);
    await signup.fillAddressInformation(details);
    await signup.createAccountButton.click();
    await accountcreated.continueButton.click();
    await expect(home.loggedInAsText).toContainText(user);

    // Try to register again with same email
    if (home.logoutButton) await home.logoutButton.click();
    await expect(login.newUserSignupText).toBeVisible();
    const anotherUser = "chinchin." + CharGen.getRandomString(3);
    await login.sendKeysSignupNameEmail(anotherUser, email);
    await login.signupButton.click();

    // Expect an error about existing email if present
    await expect(login.emailAlreadyExistText).toBeVisible();

  });


