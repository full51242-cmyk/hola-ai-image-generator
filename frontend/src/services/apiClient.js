import axios from 'axios';

const DEFAULT_BASE_URL = 'http://localhost:5000';
const PROD_BASE_URL = 'https://ai-image-banalo-production.up.railway.app';
const configuredBaseUrl = import.meta.env.VITE_API_URL?.trim();
const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';
const BASE_URL = configuredBaseUrl || (isLocalhost ? DEFAULT_BASE_URL : PROD_BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
  transformResponse: [
    (data) => {
      if (typeof data === 'string') {
        try {
          return JSON.parse(data);
        } catch {
          return data;
        }
      }
      return data;
    },
  ],
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const contentType = error.response?.headers?.['content-type'] || '';
    const responseData = error.response?.data;

    if (typeof responseData === 'string' && responseData.trim().startsWith('<')) {
      return Promise.reject(
        new Error('The API returned HTML instead of JSON. Check the backend URL and ensure the server is running.')
      );
    }

    if (contentType.includes('text/html')) {
      return Promise.reject(
        new Error('The API returned HTML instead of JSON. Check the backend URL and ensure the server is running.')
      );
    }

    if (error.message?.includes('Unexpected token')) {
      return Promise.reject(
        new Error('The API returned an invalid response. Check the backend URL and ensure it is returning JSON.')
      );
    }

    return Promise.reject(error);
  }
);

export default api;
