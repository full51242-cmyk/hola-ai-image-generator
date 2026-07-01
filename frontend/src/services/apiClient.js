import axios from 'axios';

const PROD_BASE_URL = 'https://ai-image-banalo-production.up.railway.app';
const configuredBaseUrl = import.meta.env.VITE_API_URL?.trim();
const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';
const normalizedBaseUrl = configuredBaseUrl
  ? configuredBaseUrl.replace(/\/api\/?$/, '')
  : null;
const BASE_URL = normalizedBaseUrl || (isLocalhost ? '' : PROD_BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
  transformResponse: [
    (data) => {
      if (typeof data === 'string') {
        const trimmed = data.trim();

        if (!trimmed || trimmed.startsWith('<')) {
          return data;
        }

        try {
          return JSON.parse(trimmed);
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
    const responseData = error.response?.data;}

)

export default api
