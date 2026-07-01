import axios from 'axios';

// Aapka live Railway backend URL (CORS aur 404 errors se bachne ke liye direct)
const BASE_URL = 'https://ai-image-banalo-production.up.railway.app/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout AI generation ke liye
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
        new Error('Backend ne JSON ke bajaye HTML return kiya hai. Apne Railway par endpoints ya route check karein.')
      );
    }
    
    return Promise.reject(error);
  }
);

export default api;
