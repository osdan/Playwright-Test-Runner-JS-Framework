class AccountCreatedPage {
    constructor(page) {
        this.page = page;
        this.accountCreatedText = page.locator('//b[text()="Account Created!"]');
        this.continueButton = page.locator('a[data-qa="continue-button"]');
    }

    async AccountCreatedText() {
        await expect(this.accountCreatedText).toBeVisible();
    }

    async ContinueButton() {
        await this.continueButton;
    }
}

export default AccountCreatedPage;