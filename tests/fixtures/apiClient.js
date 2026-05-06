// tests/fixtures/apiClient.js
import { test as base, expect, request as playwrightRequest } from '@playwright/test';
import { urls } from '../../utils/urls';

export const test = base.extend({

  apiClient: async ({}, use) => {

    const apiClient = await playwrightRequest.newContext({
        baseURL: `${urls.baseURL}${urls.paths.api}/`,
        extraHTTPHeaders: {
            'Accept': 'application/json'
        }
    });

    console.log(`🌐 API Base URL: ${urls.baseURL}${urls.paths.api}`);

    await use(apiClient);

    await apiClient.dispose();
  }

});

export { expect };