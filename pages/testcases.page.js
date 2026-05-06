import { urls } from '../utils/urls.js';

class TestCasesPage {
  constructor(page) {
    this.page = page;   
    this.testCasesHeader = page.locator('h2.title.text-center');
    }

    async goto() {
        await this.page.goto(urls.baseURL + urls.paths.testCases, { waitUntil: 'domcontentloaded' });
    }
    TestCasesHeader(){
        return this.testCasesHeader;
    }
}

export default TestCasesPage;