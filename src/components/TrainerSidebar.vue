<template>
  <aside class="w-64 bg-[#0a0a0a] text-gray-400 flex flex-col min-h-screen border-r border-gray-900 shadow-2xl">
    
    <div class="p-6">
      <h1 class="text-xl font-bold text-white flex items-center gap-3">
        <span class="p-2 bg-green-400 rounded-lg text-black text-xs font-black">GB</span> 
        GymBuddy
      </h1>
    </div>
        
    <router-link to="/trainer-panel/dashboard" 
    class="flex items-center gap-3.5 px-4 py-3 hover:text-white hover:bg-white/5 rounded-full transition text-sm"
    active-class="bg-green-400/10 text-green-400 border border-green-400/20 font-medium shadow-lg shadow-green-400/5">
    <span class="text-lg"></span>
    <span>Dashboard</span>
    </router-link>  

    <router-link to="/trainer-panel/sesion"
        class="flex items-center gap-3.5 px-4 py-3 hover:text-white hover:bg-white/5 rounded-full transition text-sm"
        active-class="bg-green-400/10 text-green-400 border border-green-400/20 font-medium shadow-lg shadow-green-400/5">
        <span></span>
        <span>Kelola Sesi</span>
      </router-link>   
      
      <router-link to="/trainer-panel/clien" 
        class="flex items-center gap-3.5 px-4 py-3 hover:text-white hover:bg-white/5 rounded-full transition text-sm"
        active-class="bg-green-400/10 text-green-400 border border-green-400/20 font-medium shadow-lg shadow-green-400/5">
        <span></span>
        <span>Daftar Booker</span>
      </router-link> 
      
      <router-link to="/trainer-panel/profile" 
        class="flex items-center gap-3.5 px-4 py-3 hover:text-white hover:bg-white/5 rounded-full transition text-sm"
        active-class="bg-green-400/10 text-green-400 border border-green-400/20 font-medium shadow-lg shadow-green-400/5">
        <span></span>
        <span>Profile</span>
      </router-link>  

    <div class="p-5 border-t border-gray-900 mt-6 text-sm">
    <button 
    @click="handleLogout"
    class="flex w-full items-center justify-center gap-2.5 px-4 py-2.5 border border-gray-800 rounded-full hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition cursor-pointer">
    <span class="text-lg"></span>
    <span>Log out</span>
    </button>
    </div>  

</aside>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  // 1. Hapus token agar "Satpam" di router tahu Anda sudah keluar
  localStorage.removeItem('token')
  
  // 2. (Opsional) Jika Anda menyimpan data user, hapus juga
  localStorage.removeItem('user')

  // 3. Tampilkan notifikasi kecil
  alert('Anda telah berhasil keluar.')

  // 4. Arahkan ke halaman utama atau halaman login
  router.push('/login')
}
</script>