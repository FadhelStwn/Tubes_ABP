import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Harus sama dengan nama di .env
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor untuk menyisipkan Token otomatis jika sudah login
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;