import { test, expect } from '../fixtures/apiClient';
import { urls } from '../../utils/urls';

test('@regression POST to search product (Positive)', async ({ apiClient }) => {
    const response = await apiClient.post(urls.endpoints.searchProduct, {
        form: { search_product: 'top' }
    });

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);

    console.log('STATUS:', response.status());
    console.log('URL FINAL:', response.url());
    console.log('BODY:', body);
});

test('@regression POST to search product (Negative)', async ({ apiClient }) => {
    const response = await apiClient.post(urls.endpoints.searchProduct, {
        form: { search_product: 'xxxxx' }
    });

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBe(0);

    console.log('STATUS:', response.status());
    console.log('URL FINAL:', response.url());
    console.log('BODY:', body);
});