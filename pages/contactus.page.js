import { urls } from '../utils/urls.js';

class contactUsPage {
    constructor(page) {
        this.page = page;   
        this.contactUsHeader = page.locator('//h2[text()="Get In Touch"]');
        this.nameInput = page.locator('input[name="name"]');
        this.emailInput = page.locator('input[name="email"]');
        this.subjectInput = page.locator('input[name="subject"]');
        this.messageTextArea = page.locator('textarea[name="message"]');
        this.uploadFileInput = page.locator('input[type="file"]');        
        this.submitButton = page.locator('input[name="submit"]');
        this.successMessage = page.locator('.status.alert.alert-success');
        this.homeButton = page.locator('(//a[@href="/"])[2]');
    }
}

export default contactUsPage;