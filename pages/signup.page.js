class SignupPage {
    constructor(page) {
        this.page = page;

        this.enterAccountInfoText = page.locator('text=Enter Account Information');
        this.titleRadioButtons = page.locator('input[name="title"]');
        this.nameInput = page.locator('input[name="name"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.daySelect = page.locator('select[name="days"]');
        this.monthSelect = page.locator('select[name="months"]');
        this.yearSelect = page.locator('select[name="years"]');

        this.newsLetterCheckbox = page.locator('input[name="newsletter"]');
        this.receiveSpecialOffersCheckbox = page.locator('input[name="optin"]');

        this.firstNameInput = page.locator('input[name="first_name"]');
        this.lastNameInput = page.locator('input[name="last_name"]');
        this.companyInput = page.locator('input[name="company"]');
        this.address1Input = page.locator('input[name="address1"]');
        this.address2Input = page.locator('input[name="address2"]');
        this.countrySelect = page.locator('select[name="country"]');
        this.stateInput = page.locator('input[name="state"]');
        this.cityInput = page.locator('input[name="city"]');
        this.zipcodeInput = page.locator('input[name="zipcode"]');
        this.mobileNumberInput = page.locator('input[name="mobile_number"]');

        this.createAccountButton = page.locator('button[data-qa="create-account"]');
    }

    async enterAccountInfoText() {
        return this.enterAccountInfoText;
    }

    async fillDetailsTitleNameEmailPasswordDateOfBirth(titleIndex, name, password, day, month, year) {
        await this.titleRadioButtons.nth(titleIndex).check();
        await this.nameInput.fill(name);
        await this.passwordInput.fill(password);
        await this.daySelect.selectOption(day);
        await this.monthSelect.selectOption(month);
        await this.yearSelect.selectOption(year);
    }

    async checkNewsletterSubscription() {
        await this.newsLetterCheckbox.check();
    }
    async checkReceiveSpecialOffersSubscription() {
        await this.receiveSpecialOffersCheckbox.check();
    }

    async fillAddressInformation(firstName, lastName, company, address1, address2, country, state, city, zipcode, mobileNumber) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.companyInput.fill(company);
        await this.address1Input.fill(address1);
        await this.address2Input.fill(address2);
        await this.countrySelect.selectOption(country);
        await this.stateInput.fill(state);
        await this.cityInput.fill(city);
        await this.zipcodeInput.fill(zipcode);
        await this.mobileNumberInput.fill(mobileNumber);
    }

    async createAccountButton() {
        return this.createAccountButton;
    }

}

export default SignupPage;