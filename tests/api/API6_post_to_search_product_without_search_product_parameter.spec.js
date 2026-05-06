import { test, expect } from '../fixtures/apiClient';
import { urls } from '../../utils/urls';

test('@regression POST to search product without search_product parameter', async ({ apiClient }) => {
    const response = await apiClient.post(urls.endpoints.searchProduct, {
        
    });

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(400);
    expect(body.message).toBe('Bad request, search_product parameter is missing in POST request.');

    console.log('STATUS:', response.status());
    console.log('URL FINAL:', response.url());
    console.log('BODY:', body);
});