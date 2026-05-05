import axios from 'axios';

// Fallback to localhost if environment variable is not set
const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:5001/api';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor to handle global errors (like 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and handle unauthorized
      localStorage.removeItem('token');
      // You could trigger a global event here or use a Context function
      window.dispatchEvent(new Event('unauthorized'));
    }
    return Promise.reject(error);
  }
);
