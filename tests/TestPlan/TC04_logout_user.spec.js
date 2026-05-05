import { test, expect } from '@playwright/test';

import HomePage from '../../pages/home.page.js';
import LoginPage from '../../pages/login.page.js';
import SignupPage from '../../pages/signup.page.js';
import AccountCreatedPage from '../../pages/accountcreated.page.js';
import DeleteAccountPage from '../../pages/deleteaccount.page.js';

import { urls } from '../../utils/urls.js';
import { CharGen } from '../../utils/characterGenerator.js';
import { users } from '../../fixtures/users.js';

test('Logout User @smoke', async ({ page }) => {
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