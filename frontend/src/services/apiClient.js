import axios from 'axios';

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://ai-image-banalo-production.up.railway.app/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.headers['content-type']?.includes('text/html')) {
      return Promise.reject(new Error('API returned HTML instead of JSON. Check the backend URL or the deployed service.'));
    }
    return Promise.reject(error);
  }
);

export default api;
