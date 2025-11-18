class LoginPage {
    constructor(page) {
        this.page = page;
        
        this.loginAccountText = page.locator('(//h2)[1]');
        this.newUserSignupText = page.locator('(//h2)[3]');
        this.signupNameInput = page.locator('input[data-qa="signup-name"]');
        this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
        this.loginEmailInput = page.locator('input[data-qa="login-email"]');
        this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
        this.signupButton = page.locator('button[data-qa="signup-button"]');
        this.loginButton = page.locator('button[data-qa="login-button"]');
        this.redLabelLoginErrorText = page.locator('//p[@style="color: red;"]');
        this.emailAlreadyExistText = page.locator('//p[@style="color: red;"]');
    }

    async sendKeysSignupNameEmail(name, email) {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
    }

    async sendKeysLoginEmail(email, password) {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
    }

    async loginAccountText() {
        return this.loginAccountText;
    }

    async newUserSignupText() {
        return this.newUserSignupText;
    }

    async signupButton() {
        return this.signupButton;
    }

    async loginButton() {
        return this.loginButton;
    }

    async redLabelLoginErrorText() {
        return this.redLabelLoginErrorText;
    }

    async emailAlreadyExistText() {
        return this.emailAlreadyExistText
    }

}
export default LoginPage;