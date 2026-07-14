import axios from 'axios';

// Backend API base URL for development. Uses Vite env or proxy.
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request Interceptor: Agar user logged in hai toh token automatic attach ho jaye
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: HTML/JSON mismatch errors ko handle karne ke liye
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const responseData = error.response?.data;
    
    // Agar response string hai aur '<' se shuru ho raha hai (Yani HTML page aa gaya)
    if (typeof responseData === 'string' && responseData.trim().startsWith('<')) {
      return Promise.reject(
        new Error('Backend ne JSON ke bajaye HTML return kiya hai. Apne par endpoints ya route check karein.')
      );
    }
    
    return Promise.reject(error);
  }
);

export default api;
