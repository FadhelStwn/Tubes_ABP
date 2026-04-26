// utils/api.js
import axios from 'axios'

const api = axios.create({
  // Jika sedang tahap development pake localhost, jika sudah online pake URL hosting backend
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Tambahkan interceptor untuk token (penting buat Find Trainer & My Booking)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') // sesuaikan nama key token kamu
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api