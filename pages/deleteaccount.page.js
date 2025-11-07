class DeleteAccountPage {
    constructor(page) {
        this.page = page;
        this.accountDeletedText = page.locator('//b[text()="Account Deleted!"]');
        this.continueButton = page.locator('a[data-qa="continue-button"]');
    }

    async accountDeletedText() {
        await this.accountDeletedText
    }

    async ContinueButton() {
        await this.continueButton;
    }
}

export default DeleteAccountPage;