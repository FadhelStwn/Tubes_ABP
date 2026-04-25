<template>
  <div class="flex min-h-screen bg-[#0a0b10] selection:bg-green-400 selection:text-black">
    <DashboardSidebar />

    <main class="flex-grow p-8 text-white overflow-y-auto">
      
      <div class="bg-[#161920] rounded-[2.5rem] p-8 border border-gray-900 mb-8 relative overflow-hidden shadow-2xl">
        <div class="absolute inset-0 opacity-10 pointer-events-none" 
             style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 24px 24px;"></div>

        <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div class="w-32 h-32 bg-green-400 rounded-[2rem] flex items-center justify-center text-black font-black text-4xl shadow-xl shadow-green-400/20">
            {{ getInitials(user.nama) }}
          </div>

          <div class="flex-grow text-center md:text-left">
            <div class="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h2 class="text-3xl font-black uppercase tracking-tighter italic">{{ user.nama || 'Loading...' }}</h2>
            </div>
            
            <div class="flex flex-col gap-1 text-gray-500 text-sm mb-6 font-medium">
              <p class="flex items-center justify-center md:justify-start gap-2">📧 {{ user.email }}</p>
              <p class="flex items-center justify-center md:justify-start gap-2 uppercase">📍 {{ user.kota || 'Location not set' }}</p>
            </div>

            <div class="flex items-center justify-center md:justify-start gap-4">
              <router-link to="/dashboard/profile/edit" class="bg-green-400 text-black px-6 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-green-300 transition-all shadow-lg shadow-green-400/10">
                Edit Profile
              </router-link>
              </div>
          </div>
        </div>
      </div>
      
      <div class="bg-[#161920] p-8 rounded-[2.5rem] border border-gray-900 shadow-2xl">
        <h3 class="font-black uppercase text-sm tracking-widest text-white mb-8 border-b border-gray-800 pb-4">
          Detailed Information
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-1">
            <p class="text-[10px] text-gray-600 uppercase font-bold tracking-widest text-green-400">Full Name</p>
            <p class="text-sm font-bold text-white">{{ user.nama || '-' }}</p>
          </div>
          
          <div class="space-y-1">
            <p class="text-[10px] text-gray-600 uppercase font-bold tracking-widest text-green-400">Email Address</p>
            <p class="text-sm font-bold text-white">{{ user.email || '-' }}</p>
          </div>

          <div class="space-y-1">
            <p class="text-[10px] text-gray-600 uppercase font-bold tracking-widest text-green-400">Current City</p>
            <p class="text-sm font-bold text-white uppercase">{{ user.kota || 'Not Set' }}</p>
          </div>

          <div class="space-y-1">
            <p class="text-[10px] text-gray-600 uppercase font-bold tracking-widest text-green-400">Account Role</p>
            <p class="text-sm font-bold uppercase text-white px-3 py-1 bg-green-400/10 border border-green-400/20 rounded-lg inline-block">
              {{ user.role || '-' }}
            </p>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DashboardSidebar from '../../components/DashboardSidebar.vue'
import api from '../../utils/api'

const user = ref({
  nama: '',
  email: '',
  role: '',
  kota: ''
})

const fetchUserProfile = async () => {
  try {
    const response = await api.get('/auth/me') 
    user.value = response.data
  } catch (error) {
    console.error("Gagal memuat profil:", error)
  }
}

const getInitials = (name) => {
  if (!name) return 'GB'
  const names = name.split(' ')
  return names.length > 1 
    ? (names[0][0] + names[1][0]).toUpperCase() 
    : names[0][0].toUpperCase()
}

onMounted(() => {
  fetchUserProfile()
})
</script>