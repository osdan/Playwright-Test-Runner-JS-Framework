import { test, expect } from '../fixtures/apiClient';
import { urls } from '../../utils/urls';

test('@regression GET all brands list', async ({ apiClient }) => {
    const response = await apiClient.get(urls.endpoints.brandsList);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);

    console.log('STATUS:', response.status());
    console.log('URL FINAL:', response.url());
    console.log('BODY:', body);
});