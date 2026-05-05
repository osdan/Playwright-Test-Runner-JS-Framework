import { test, expect } from '@playwright/test';

import HomePage from '../../pages/home.page.js';
import LoginPage from '../../pages/login.page.js';
import SignupPage from '../../pages/signup.page.js';
import AccountCreatedPage from '../../pages/accountcreated.page.js';
import DeleteAccountPage from '../../pages/deleteaccount.page.js';

import { CharGen } from '../../utils/characterGenerator.js';
import { users } from '../../fixtures/users.js';

test('Register User with existing email shows error @regression', async ({ page }) => {
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