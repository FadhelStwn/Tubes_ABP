<template>
  <aside class="w-64 bg-[#0a0a0a] text-gray-400 flex flex-col min-h-screen border-r border-gray-900 shadow-2xl">
    
    <div class="p-6">
      <h1 class="text-xl font-bold text-white flex items-center gap-3">
        <span class="p-2 bg-green-400 rounded-lg text-black text-xs font-black">GB</span> 
        GymBuddy
      </h1>
    </div>
    
    <router-link to="/dashboard"
    class="flex items-center gap-3.5 px-4 py-3 hover:text-white hover:bg-white/5 rounded-full transition text-sm"
    active-class="bg-green-400/10 text-green-400 border border-green-400/20 font-medium shadow-lg shadow-green-400/5">
    <span class="text-lg"></span> 
    <span>Dashboard</span>
    </router-link>
    
    <router-link to="/dashboard/find-trainers" 
    class="flex items-center gap-3.5 px-4 py-3 hover:text-white hover:bg-white/5 rounded-full transition text-sm"
    active-class="bg-green-400/10 text-green-400 border border-green-400/20 font-medium shadow-lg shadow-green-400/5">
    <span class="text-lg"></span>
    <span>Find Trainers</span>
    </router-link>  

    <router-link to="/dashboard/my-bookings" 
        class="flex items-center gap-3.5 px-4 py-3 hover:text-white hover:bg-white/5 rounded-full transition text-sm"
        active-class="bg-green-400/10 text-green-400 border border-green-400/20 font-medium shadow-lg shadow-green-400/5">
        <span></span>
        <span>My Bookings</span>
      </router-link>   

      <a href="#" class="flex items-center gap-3.5 px-4 py-3 hover:text-white hover:bg-white/5 rounded-full text-sm transition">
        <span class="text-lg"></span> <span>Find Partners</span>
      </a>
      
      <a href="#" class="flex items-center gap-3.5 px-4 py-3 hover:text-white hover:bg-white/5 rounded-full text-sm transition">
        <span class="text-lg"></span> <span>Progress</span>
      </a>
      
      <a href="#" class="flex items-center gap-3.5 px-4 py-3 hover:text-white hover:bg-white/5 rounded-full text-sm transition">
        <span class="text-lg"></span> <span>Profile</span>
      </a>

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
  // Jika nanti sudah pakai sistem auth, hapus token/session di sini
  // localStorage.removeItem('token')  
  // Arahkan kembali ke halaman landing page (path: '/')
  router.push('/')
}
</script>