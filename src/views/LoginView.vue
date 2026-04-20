<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden">
    
    <div 
      class="absolute inset-0 bg-cover bg-center z-0"
      style="background-image: url('https://images.unsplash.com/photo-1554284126-aa88f22d8b74')"
    >
      <div class="absolute inset-0 bg-black/50"></div>
    </div>

    <div class="relative z-10 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96 border border-white/20">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Login Gym App</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            class="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
            placeholder="admin@gym.com"
          >
        </div>
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            class="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
            placeholder="******"
          >
        </div>
        <button 
          type="submit" 
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md active:scale-95"
        >
          Login
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-gray-600">
        Belum punya akun? 
        <router-link to="/register" class="text-blue-600 font-semibold hover:underline cursor-pointer">
          Daftar di sini
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogin = () => {
  // 1. Logika validasi login kamu di sini (misal cek email/password)
  console.log("Login berhasil!")

  // 2. Arahkan ke dashboard
  // Pastikan '/dashboard' sesuai dengan path yang ada di router/index.js
  router.push('/dashboard')
}
</script>