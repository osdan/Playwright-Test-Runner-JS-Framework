import { urls } from '../utils/urls.js';

class HomePage {
  constructor(page) {
    this.page = page;

    this.homeButton = page.locator('(//a[@href="/"])[2]');
    this.productsButton = page.locator('a[href="/products"]');
    this.cartButton = page.locator('(//a[@href="/view_cart"])[2]');
    this.signupLoginButton = page.locator('a[href="/login"]');
    this.contactUsButton = page.locator('a[href="/contact_us"]');
    
  }

  async goto() {
    await this.page.goto(urls.home, { waitUntil: 'domcontentloaded' });
  }

  async goToHomeTab(){
    await this.homeButton.click();
  }

  async goToLogin() {
    await this.signupLoginButton.click();
  }

  async goToProducts() {
    await this.productsButton.click();
  }

  async goToContactUs() {
    await this.contactUsButton.click();
  }

    async goToContactUs() {
    await this.contactUsButton.click();
  }
}

export default HomePage;
