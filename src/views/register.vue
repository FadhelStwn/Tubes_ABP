<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">

    <div 
      class="absolute inset-0 bg-cover bg-center z-0"
      style="background-image: url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438')"
    >
      <div class="absolute inset-0 bg-black/50"></div>
    </div>
    
    <div class="relative z-10 max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Daftar Akun</h2>
      
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
          <input v-model="formData.name" type="text" placeholder="Masukkan nama lengkap" 
                 class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="formData.email" type="email" placeholder="nama@email.com" 
                 class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="formData.password" type="password" placeholder="••••••••" 
                 class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Daftar Sebagai</label>
          <select v-model="formData.role" 
                  class="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500">
            <option value="" disabled>Pilih peran kamu</option>
            <option value="customer">Customer (Member)</option>
            <option value="trainer">Trainer (Pelatih)</option>
          </select>
        </div>

        <button type="submit" 
                class="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-200">
          Buat Akun
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        Sudah punya akun? 
        <router-link to="/login" class="text-blue-600 hover:underline">Log in di sini</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Objek untuk menampung semua data form
const formData = ref({
  name: '',
  email: '',
  password: '',
  role: '' // Default kosong agar memicu teks 'Pilih peran kamu'
})

const handleRegister = () => {
  // Sementara kita tampilkan di console dulu
  console.log('Data Pendaftaran:', formData.value)
  alert(`Berhasil daftar sebagai ${formData.value.role}!`)
}
</script>