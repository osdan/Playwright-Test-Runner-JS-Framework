class LoginPage {
    constructor(page) {
        this.page = page;
        
        this.newUserSignupText = page.locator('(//h2)[3]');
        this.nameInput = page.locator('input[data-qa="signup-name"]');
        this.emailInput = page.locator('input[data-qa="signup-email"]');
        this.signupButton = page.locator('button[data-qa="signup-button"]');
    }

    async sendKeysNameEmail(name, email) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
    }

    async newUserSignupText() {
        return this.newUserSignupText;
    }

}
export default LoginPage;