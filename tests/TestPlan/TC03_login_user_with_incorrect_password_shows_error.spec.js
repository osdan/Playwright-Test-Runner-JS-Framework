import { test, expect } from '@playwright/test';

import HomePage from '../../pages/home.page.js';
import LoginPage from '../../pages/login.page.js';
import SignupPage from '../../pages/signup.page.js';
import AccountCreatedPage from '../../pages/accountcreated.page.js';
import DeleteAccountPage from '../../pages/deleteaccount.page.js';

import { CharGen } from '../../utils/characterGenerator.js';

test('Login User with incorrect password shows error @regression', async ({ page }) => {
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