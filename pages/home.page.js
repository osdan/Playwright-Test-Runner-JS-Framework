import { urls } from '../utils/urls.js';

class HomePage {
  constructor(page) {
    this.page = page;

    this.homeButton = page.locator('(//a[@href="/"])[2]');
    this.productsButton = page.locator('a[href="/products"]');
    this.cartButton = page.locator('(//a[@href="/view_cart"])[2]');
    this.signupLoginButton = page.locator('a[href="/login"]');
    this.contactUsButton = page.locator('a[href="/contact_us"]');
    this.deleteAccountButton = page.locator('a[href="/delete_account"]');
    this.loggedInAsText = page.locator('//b');
    this.logoutButton = page.locator('a[href="/logout"]');
    this.testCasesButton = page.locator("(//a[@href='/test_cases'])[1]");
  }

  async goto() {
    await this.page.goto(urls.baseURL + urls.paths.home, { waitUntil: 'domcontentloaded' });
  }

  // 🔹 Acciones (acciones sí son async)
  async clickSignupLogin() {
    await this.signupLoginButton.click();
  }

  async clickDeleteAccount() {
    await this.deleteAccountButton.click();
  }

  async clickLogout() {
    await this.logoutButton.click();
  }

  async clickTestCases() {
    await this.testCasesButton.click();
  }
}

export default HomePage;