import { test, expect } from '@playwright/test';

import HomePage from '../../pages/home.page.js';
import TestCasesPage from '../../pages/testcases.page.js';
import { urls } from '../../utils/urls.js';

test('Verify Test Cases Page @regression', async ({ page }) => {
    const home = new HomePage(page);
    const testCases = new TestCasesPage(page);

    await home.goto();
    await expect(home.HomeTabButton()).toHaveAttribute('style', /color:\s*orange/);    
    await home.TestCasesButton().click();
    await expect(testCases.TestCasesHeader()).toBeVisible();
});