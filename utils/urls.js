import { appendFile } from "fs";

export const urls = {
  baseURL: 'https://automationexercise.com',

  paths: {
    api: '/api',
    home: '/',
    login: '/login',
    products: '/products',
    contactUs: '/contact_us',
    testCases: '/test_cases',
  },

  endpoints: {
    productsList: 'productsList',
    brandsList: 'brandsList',
    searchProduct: 'searchProduct',
  },

};