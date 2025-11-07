import { test, expect } from '@playwright/test';

import HomePage from '../../pages/home.page.js';
import LoginPage from '../../pages/login.page.js';
import SignupPage from '../../pages/signup.page.js';
import AccountCreatedPage from '../../pages/accountcreated.page.js';
import DeleteAccountPage from '../../pages/deleteaccount.page.js';

import { urls } from '../../utils/urls.js';
import { CharGen } from '../../utils/characterGenerator.js';

test('Register User', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const signup = new SignupPage(page);
  const AccountCreated = new AccountCreatedPage(page);
  const DeleteAccount = new DeleteAccountPage(page);
  const user = "chinchin." + CharGen.getRandomString(3);
  const email = user + '@chin.com';
  const password = CharGen.getRandomString(10);

  await home.goto();
  await expect(page).toHaveURL(urls.home);
  await home.signupLoginButton.click();
  await expect(login.newUserSignupText).toBeVisible();
  await login.sendKeysNameEmail(user, email);
  await login.signupButton.click();
  await expect(signup.enterAccountInfoText).toBeVisible();
  await signup.fillDetailsTitleNameEmailPasswordDateOfBirth(
    0,
    user,
    password,
    '10',
    'May',
    '2000'
  );

  await signup.checkNewsletterSubscription();
  await signup.checkReceiveSpecialOffersSubscription();
  await signup.fillAddressInformation(
    'Chin',
    'Chin',
    'Chin Company',
    '123 Chin St',
    'Apt 4',
    'Canada',
    'Chin State',
    'Chin City',
    'C1H 2N3',
    '1234567890'
  );

  await signup.createAccountButton.click();
  await expect(AccountCreated.accountCreatedText).toBeVisible();
  await AccountCreated.continueButton.click();
  await expect(home.loggedInAsText).toHaveText(new RegExp(user));
  await home.deleteAccountButton.click();
  await expect(DeleteAccount.accountDeletedText).toBeVisible();
  await DeleteAccount.continueButton.click();

});
