import { test, expect } from '@playwright/test';
import  HomePage  from '../pages/home.page.js';
import { urls } from '../utils/urls.js';

test('Register User', async ({ page }) => {
  const home = new HomePage(page);

  await home.goto();
  await expect(page).toHaveURL(urls.home);
});