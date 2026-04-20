<template>
  <div class="flex min-h-screen bg-[#0a0b10] selection:bg-green-400 selection:text-black">
    <DashboardSidebar />

    <main class="flex-grow p-8 text-white overflow-y-auto">
      
      <div class="bg-[#161920] rounded-[2.5rem] p-8 border border-gray-900 mb-8 relative overflow-hidden shadow-2xl">
        <div class="absolute inset-0 opacity-10 pointer-events-none" 
             style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 24px 24px;"></div>

        <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div class="w-32 h-32 bg-green-400 rounded-[2rem] flex items-center justify-center text-black font-black text-4xl shadow-xl shadow-green-400/20">
            AJ
          </div>

          <div class="flex-grow text-center md:text-left">
            <div class="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h2 class="text-3xl font-black uppercase tracking-tighter italic">Alex Johnson</h2>
              <span class="bg-green-400/10 text-green-400 text-[10px] font-black px-2 py-1 rounded-md border border-green-400/20 uppercase tracking-widest">
                👑 Premium
              </span>
            </div>
            
            <div class="flex flex-col gap-1 text-gray-500 text-sm mb-6 font-medium">
              <p class="flex items-center justify-center md:justify-start gap-2">📧 alex.johnson@gmail.com</p>
              <p class="flex items-center justify-center md:justify-start gap-2">📞 +62 812-3456-7890</p>
              <p class="flex items-center justify-center md:justify-start gap-2">📍 Jakarta Selatan</p>
            </div>

            <div class="flex items-center justify-center md:justify-start gap-4">

        <router-link to="/dashboard/profile/edit" class="bg-green-400 text-black px-6 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-green-300 transition-all flex items-center gap-2 shadow-lg shadow-green-400/10">
        <span></span> Edit Profile
        </router-link>                 
        <p class="text-[10px] text-gray-600 font-bold italic">Premium until <span class="text-gray-400">January 2027</span></p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div class="bg-[#161920] p-6 rounded-[2rem] border border-gray-900 flex flex-col group hover:border-green-400/30 transition-all">
          <div class="w-10 h-10 bg-green-400/10 rounded-xl flex items-center justify-center text-lg mb-4 group-hover:scale-110 transition-transform">💪</div>
          <p class="text-3xl font-black tracking-tighter">42</p>
          <p class="text-[10px] text-gray-600 uppercase font-bold tracking-widest mt-1">Total Sessions</p>
        </div>
        <div class="bg-[#161920] p-6 rounded-[2rem] border border-gray-900 flex flex-col group hover:border-blue-400/30 transition-all">
          <div class="w-10 h-10 bg-blue-400/10 rounded-xl flex items-center justify-center text-lg mb-4 group-hover:scale-110 transition-transform">🕒</div>
          <p class="text-3xl font-black tracking-tighter">84</p>
          <p class="text-[10px] text-gray-600 uppercase font-bold tracking-widest mt-1">Hours Trained</p>
        </div>
        <div class="bg-[#161920] p-6 rounded-[2rem] border border-gray-900 flex flex-col group hover:border-purple-400/30 transition-all">
          <div class="w-10 h-10 bg-purple-400/10 rounded-xl flex items-center justify-center text-lg mb-4 group-hover:scale-110 transition-transform">👥</div>
          <p class="text-3xl font-black tracking-tighter">8</p>
          <p class="text-[10px] text-gray-600 uppercase font-bold tracking-widest mt-1">Gym Partners</p>
        </div>
        <div class="bg-[#161920] p-6 rounded-[2rem] border border-gray-900 flex flex-col group hover:border-orange-400/30 transition-all">
          <div class="w-10 h-10 bg-orange-400/10 rounded-xl flex items-center justify-center text-lg mb-4 group-hover:scale-110 transition-transform">🏅</div>
          <p class="text-3xl font-black tracking-tighter">15</p>
          <p class="text-[10px] text-gray-600 uppercase font-bold tracking-widest mt-1">Achievements</p>
        </div>
      </div>

      <div class="flex gap-8 border-b border-gray-900 mb-8 px-2">
        <button 
          @click="activeTab = 'overview'"
          :class="activeTab === 'overview' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-600 hover:text-gray-400'"
          class="pb-4 text-xs font-black uppercase tracking-widest transition-all"
        >
          Overview
        </button>
        <button 
          @click="activeTab = 'history'"
          :class="activeTab === 'history' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-600 hover:text-gray-400'"
          class="pb-4 text-xs font-black uppercase tracking-widest transition-all"
        >
          Booking History
        </button>
      </div>

      <div v-if="activeTab === 'overview'" class="animate-fade-in">
        <div class="bg-[#161920] p-8 rounded-[2.5rem] border border-gray-900">
          <div class="flex justify-between items-center mb-8">
            <h3 class="font-black uppercase text-sm tracking-widest text-white">Recent Bookings</h3>
            <button @click="activeTab = 'history'" class="text-green-400 text-[10px] font-bold uppercase hover:underline">View All</button>
          </div>
          <div class="space-y-4">
            <div v-for="booking in historyData.slice(0, 3)" :key="booking.id" 
                 class="bg-black/20 p-5 rounded-2xl border border-gray-800/50 flex justify-between items-center hover:border-green-400/20 transition-all">
               <div class="flex items-center gap-4">
                  <div class="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-[10px] font-black text-green-400 border border-gray-700">
                    {{ booking.initials }}
                  </div>
                  <div>
                    <p class="text-sm font-bold text-white">{{ booking.trainer }}</p>
                    <p class="text-[10px] text-gray-600 uppercase font-bold mt-0.5">{{ booking.date }} • {{ booking.type }}</p>
                  </div>
               </div>
               <div class="text-yellow-500 text-xs tracking-widest">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'history'" class="bg-[#161920] p-8 rounded-[2.5rem] border border-gray-900 animate-fade-in shadow-2xl">
        <div class="flex justify-between items-center mb-8">
          <h3 class="font-black uppercase text-sm tracking-widest text-white">All Booking History</h3>
        </div>

        <div class="space-y-3">
          <div v-for="item in historyData" :key="item.id" 
               class="bg-[#1c1f26]/40 p-6 rounded-2xl border border-gray-800/40 flex items-center justify-between group hover:bg-[#1c1f26] hover:border-gray-700 transition-all">
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-3">
                <p class="text-sm font-black text-white uppercase tracking-tight group-hover:text-green-400 transition-colors">{{ item.trainer }}</p>
                <div class="text-yellow-500 text-[8px] flex gap-0.5">
                  <span v-for="i in 5" :key="i">⭐</span>
                </div>
              </div>
              <div class="flex items-center gap-4 text-gray-500 font-bold uppercase text-[9px] tracking-wider">
                <span class="flex items-center gap-1.5">📅 {{ item.date }}</span>
                <span class="flex items-center gap-1.5 font-black text-gray-600">•</span>
                <span class="flex items-center gap-1.5">💪 {{ item.type }}</span>
              </div>
            </div>

            <div class="bg-green-400/5 border border-green-400/20 px-4 py-1.5 rounded-full">
              <span class="text-[9px] font-black uppercase text-green-400 tracking-tighter italic">completed</span>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DashboardSidebar from '../../components/DashboardSidebar.vue'

// Tab yang aktif saat pertama kali buka halaman
const activeTab = ref('overview')

// Data riwayat booking
const historyData = [
  { id: 1, trainer: 'David Martinez', initials: 'DM', date: '2026-04-12', type: 'Strength Training' },
  { id: 2, trainer: 'Lisa Anderson', initials: 'LA', date: '2026-04-10', type: 'HIIT Workout' },
  { id: 3, trainer: 'Chris Taylor', initials: 'CT', date: '2026-04-08', type: 'Weight Loss' },
  { id: 4, trainer: 'Nina Patel', initials: 'NP', date: '2026-04-05', type: 'Yoga & Flexibility' },
  { id: 5, trainer: 'Marcus Johnson', initials: 'MJ', date: '2026-04-01', type: 'Crossfit' }
]
</script>

<style scoped>
/* Animasi halus saat pindah tab */
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(8px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* Custom Scrollbar agar senada dengan tema dark */
main::-webkit-scrollbar {
  width: 6px;
}
main::-webkit-scrollbar-track {
  background: transparent;
}
main::-webkit-scrollbar-thumb {
  background: #1f2937;
  border-radius: 10px;
}
main::-webkit-scrollbar-thumb:hover {
  background: #374151;
}
</style>