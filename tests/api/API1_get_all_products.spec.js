import { test, expect } from '../fixtures/apiClient';
import { urls } from '../../utils/urls';

test('@smoke GET all products', async ({ apiClient }) => {
    const response = await apiClient.get(urls.endpoints.productsList);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);

    console.log('STATUS:', response.status());
    console.log('URL FINAL:', response.url());
    console.log('BODY:', body);
});