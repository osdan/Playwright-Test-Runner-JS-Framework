import { test, expect } from '@playwright/test';
import HomePage from '../../pages/home.page.js';
import contactUsPage from '../../pages/contactus.page.js';

import { urls } from '../../utils/urls.js';
import { CharGen } from '../../utils/characterGenerator.js';
import path from 'path';

test('Contact Us Form @regression', async ({ page }) => {

  const home = new HomePage(page);
  const contactUs = new contactUsPage(page);
  const name = "user." + CharGen.getRandomString(4);
  const email = name + "@test.com";
  const filePath = path.join(process.cwd(), 'tests/fixtures/file.pdf');

  // 🔹 1. Launch browser
  await test.step('1. Launch browser', async () => {
    // handled by Playwright
  });

  // 🔹 2. Navigate to URL
  await test.step("2. Navigate to url 'http://automationexercise.com'", async () => {
    await home.goto();
  });

  // 🔹 3. Verify home page
  await test.step('3. Verify that home page is visible successfully', async () => {
    await expect(home.signupLoginButton).toBeVisible();
  });

  // 🔹 4. Click Contact Us
  await test.step("4. Click on 'Contact Us' button", async () => {
    await home.contactUsButton.click();
  });

  // 🔹 5. Verify GET IN TOUCH
  await test.step("5. Verify 'GET IN TOUCH' is visible", async () => {
    await expect(contactUs.contactUsHeader).toBeVisible();
  });

  // 🔹 6. Enter form data
  await test.step('6. Enter name, email, subject and message', async () => {
    await contactUs.nameInput.fill(name);
    await contactUs.emailInput.fill(email);
    await contactUs.subjectInput.fill('Automation Test');
    await contactUs.messageTextArea.fill('This is a test message from Playwright');
  });

  // 🔹 7. Upload file
  await test.step('7. Upload file', async () => {
    await contactUs.uploadFileInput.setInputFiles('tests/fixtures/file.pdf');
  });

  // 🔹 8. Click Submit
  await test.step("8. Submit form and accept alert", async () => {
    page.once('dialog', async dialog => {
    await dialog.accept();
  });

  await contactUs.submitButton.click();
  });

  // 🔹 9. Handle alert (OK)
  await test.step('9. Click OK button', async () => {
    // handled in previous step
  });

  // 🔹 10. Verify success message
  await test.step("10. Verify success message", async () => {
    await expect(contactUs.successMessage).toBeVisible();

    await expect(contactUs.successMessage).toContainText(
      'Success! Your details have been submitted successfully'
    ); 
  });

  // 🔹 11. Click Home and verify redirect
  await test.step("11. Click 'Home' button and verify navigation", async () => {
    await contactUs.homeButton.click();
    await expect(page).toHaveURL(urls.home);
  });

});