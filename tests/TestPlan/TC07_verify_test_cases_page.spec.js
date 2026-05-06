import { test, expect } from '@playwright/test';

import HomePage from '../../pages/home.page.js';
import TestCasesPage from '../../pages/testcases.page.js';

import { urls } from '../../utils/urls.js';

test('Verify Test Cases Page @regression', async ({ page }) => {

    const home = new HomePage(page);
    const testCases = new TestCasesPage(page);

    // 🔹 1. Launch browser
    await test.step('1. Launch browser', async () => {
        // handled by Playwright
    });

    // 🔹 2. Navigate to URL
    await test.step("2. Navigate to 'http://automationexercise.com'", async () => {
        await home.goto();
    });

    // 🔹 3. Verify home page
    await test.step('3. Verify home page is visible successfully', async () => {
        await expect(page).toHaveURL(urls.baseURL + urls.paths.home);
        await expect(home.signupLoginButton).toBeVisible();
    });

    // 🔹 4. Click Test Cases button
    await test.step("4. Click on 'Test Cases' button", async () => {
        await home.clickTestCases();
    });

    // 🔹 5. Verify navigation to Test Cases page
    await test.step('5. Verify user is navigated to Test Cases page successfully', async () => {
        await expect(page).toHaveURL(urls.baseURL + urls.paths.testCases);
        await expect(testCases.TestCasesHeader()).toBeVisible();
    });

});