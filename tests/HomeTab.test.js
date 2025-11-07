import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page.js';

test('Navigate to Home Tab', async ({ page }) => {
  const home = new HomePage(page);

  await home.goto();
  await home.goToHomeTab();
  await home.goToProducts();

  await expect(page).toHaveURL(/products/);
});