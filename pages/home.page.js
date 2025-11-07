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
    
  }

  async goto() {
    await this.page.goto(urls.home, { waitUntil: 'domcontentloaded' });
  }

  async HomeTabButton(){
    await this.homeButton.click();
  }

  async ProductsButton() {
    await this.productsButton.click();
  }

  async ContactUsButton() {
    await this.contactUsButton.click();
  }

  async signupLoginButton() {
    await this.signupLoginButton;
  }

  async deleteAccountButton() {
    return this.deleteAccountButton;
  }

  async loggedInAsText() {
    return this.loggedInAsText;
  }
}

export default HomePage;
