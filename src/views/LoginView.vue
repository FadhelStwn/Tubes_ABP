<template>
  <div class="min-h-screen flex items-center justify-center bg-[#000000] p-4 font-sans">
    <div class="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-[#000000] rounded-3xl overflow-hidden shadow-2xl">
      
      <div class="relative hidden md:block p-12 bg-cover bg-center" 
           style="background-image: url('/src/assets/gymapp-login.jpg')">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
        <div class="relative z-10 h-full flex flex-col justify-center text-white">
          <p class="text-sm font-semibold tracking-widest uppercase mb-4 text-green-400">Join For Free</p>
          <h1 class="text-5xl font-bold leading-tight mb-6">
            Latihan Jadi Lebih Mudah <span class="text-green-400 font-black">Bersama GymBuddy</span>
          </h1>
          <p class="text-gray-300 mb-10 max-w-sm">Temukan trainer terbaik dan wujudkan tubuh impianmu dengan sistem yang praktis dan terpercaya.</p>
        </div>
      </div>

      <div class="p-8 md:p-16 flex flex-col justify-center bg-[#000000]">
        <div class="mb-10">
          <h2 class="text-4xl font-bold text-white mb-2">Selamat Datang<span class="text-green-500">.</span></h2>
          <p class="text-gray-400">Silakan masukkan detail Anda untuk masuk.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="relative">
            <label class="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-1">Email Address</label>
            <input v-model="email" type="email" required
                   class="w-full bg-[#1F2937] border border-gray-700 text-white px-5 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
                   placeholder="Enter your email">
          </div>

          <div class="relative">
            <label class="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-1">Password</label>
            <input v-model="password" type="password" required
                   class="w-full bg-[#1F2937] border border-gray-700 text-white px-5 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
                   placeholder="••••••••">
          </div>

          <button type="submit" :disabled="loading"
                  class="w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#27AE60] shadow-xl shadow-green-500/20 transition-all active:scale-[0.98] disabled:bg-gray-600">
            {{ loading ? 'Signing In...' : 'Log In' }}
          </button>
        </form>

        <p class="mt-8 text-center text-gray-400 text-sm">
          Not a Member yet? 
          <router-link to="/register" class="text-blue-400 font-bold hover:underline ml-1">Join for Free</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../utils/api' 
import { useAuthStore } from '../stores/authStore' // Import store

const router = useRouter()
const authStore = useAuthStore() // Inisialisasi store
const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    })

    // 1. Simpan token ke localStorage untuk interceptor api.js
    localStorage.setItem('token', response.data.token)
    
    // 2. Simpan data user (termasuk role) ke Pinia
    const user = response.data.user
    authStore.setUser(user) 
    
    alert("Login Berhasil!")

    // 3. Redirect otomatis berdasarkan role dari database
    if (user.role === 'admin') {
      router.push('/admin/dashboard') // Redirect ke template admin
    } else if (user.role === 'trainer') {
      router.push('/trainer/dashboard') // Redirect ke dashboard trainer
    } else {
      router.push('/dashboard') // Default untuk customer
    }

  } catch (error) {
    // Menangkap pesan error dari middleware backend
    const errorMsg = error.response?.data?.message || "Gagal terhubung ke server"
    alert("Login Gagal: " + errorMsg)
  } finally {
    loading.value = false
  }
}
</script>