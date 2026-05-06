import { test, expect } from '../fixtures/apiClient';
import { urls } from '../../utils/urls';

test('@regression PUT all brands list', async ({ apiClient }) => {
    const response = await apiClient.put(urls.endpoints.brandsList);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(405);
    expect(body.message).toBe('This request method is not supported.');

    console.log('STATUS:', response.status());
    console.log('URL FINAL:', response.url());
    console.log('BODY:', body);
});