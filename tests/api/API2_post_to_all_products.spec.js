import { test, expect } from '../fixtures/apiClient';
import { urls } from '../../utils/urls';

test('@smoke @regression POST To all products', async ({ apiClient }) => {
    const response = await apiClient.post(urls.endpoints.productsList);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(405);
    expect(body.message).toBe('This request method is not supported.');

    console.log('STATUS:', response.status());
    console.log('URL FINAL:', response.url());
    console.log('BODY:', body);
});