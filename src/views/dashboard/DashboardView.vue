<template>
  <div class="flex min-h-screen bg-black font-sans selection:bg-green-400 selection:text-black">
    <DashboardSidebar />

    <main class="flex-grow p-8 text-white overflow-y-auto">
      
      <header class="mb-8">
        <h2 class="text-3xl font-black uppercase tracking-tighter text-white">Dashboard</h2>
        <p class="text-gray-500 text-sm mt-1">Welcome back! <span class="text-green-400/80 italic font-medium">Keep pushing towards your goals.</span></p>
      </header>

      <div class="bg-gradient-to-r from-[#2c1a11] to-[#1a110a] p-6 rounded-3xl border border-orange-900/30 mb-8 flex justify-between items-center relative overflow-hidden group">
        <div class="relative z-10">
          <h3 class="text-orange-500 font-bold uppercase text-xs tracking-widest mb-1 flex items-center gap-2">
            <span>✨</span> Upgrade to Premium
          </h3>
          <p class="text-gray-300 text-sm max-w-md">Unlock unlimited bookings, priority access to top trainers, advanced analytics, and exclusive community features.</p>
          <button class="mt-4 bg-orange-600 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-orange-500 hover:scale-105 transition-all shadow-lg shadow-orange-900/20">
          
        <router-link to="/dashboard/PricingView">
         View Plans
        </router-link>          
        </button>
        </div>
        
        <div class="text-orange-900/20 text-8xl font-black absolute -right-4 -bottom-4 group-hover:rotate-12 transition-transform duration-500">
          👑
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div class="bg-[#0f1115] p-6 rounded-[2rem] border border-gray-900 hover:border-green-400/30 transition-all shadow-xl group">
          <div class="w-12 h-12 bg-green-400/10 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">👥</div>
          <p class="text-4xl font-black text-white tracking-tighter">3</p>
          <p class="text-gray-500 text-xs uppercase font-bold tracking-widest mt-1">Active Sessions</p>
        </div>
        <div class="bg-[#0f1115] p-6 rounded-[2rem] border border-gray-900 hover:border-green-400/30 transition-all shadow-xl group">
          <div class="w-12 h-12 bg-orange-400/10 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">📅</div>
          <p class="text-4xl font-black text-white tracking-tighter">5</p>
          <p class="text-gray-500 text-xs uppercase font-bold tracking-widest mt-1">This Week</p>
        </div>
        <div class="bg-[#0f1115] p-6 rounded-[2rem] border border-gray-900 hover:border-green-400/30 transition-all shadow-xl group">
          <div class="w-12 h-12 bg-purple-400/10 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🦾</div>
          <p class="text-4xl font-black text-white tracking-tighter">8</p>
          <p class="text-gray-500 text-xs uppercase font-bold tracking-widest mt-1">Gym Partners</p>
        </div>
        <div class="bg-[#0f1115] p-6 rounded-[2rem] border border-gray-900 hover:border-green-400/30 transition-all shadow-xl group">
          <div class="w-12 h-12 bg-green-400/10 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">📈</div>
          <p class="text-4xl font-black text-white tracking-tighter">12</p>
          <p class="text-gray-500 text-xs uppercase font-bold tracking-widest mt-1">Saved Days</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div class="bg-[#0f1115] p-8 rounded-[2.5rem] border border-gray-900 shadow-2xl">
          <div class="flex justify-between items-center mb-8">
            <h3 class="font-black uppercase text-sm tracking-widest text-gray-300">Upcoming Sessions</h3>
            <button class="text-green-400 text-[10px] font-bold uppercase hover:underline">View All</button>
          </div>
          
          <div class="space-y-4">
            <div v-for="n in 3" :key="n" class="bg-[#161920] p-5 rounded-2xl border border-gray-800 hover:border-green-400/20 transition-all cursor-pointer group">
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-bold text-white group-hover:text-green-400 transition-colors">David Martinez</p>
                  <div class="flex items-center gap-3 mt-1 text-[10px] text-gray-500 font-semibold uppercase tracking-tighter">
                    <span class="flex items-center gap-1">🕒 09:00 AM</span>
                    <span class="flex items-center gap-1 text-green-400/60">💪 Strength Training</span>
                  </div>
                </div>
                <div class="w-8 h-8 rounded-full bg-black flex items-center justify-center text-xs">➡️</div>
              </div>
            </div>
          </div>

          <button class="w-full mt-8 py-4 bg-green-400 text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-green-300 transition-all shadow-lg shadow-green-400/10 active:scale-[0.98]">
            Book New Session
          </button>
        </div>

        <div class="bg-[#0f1115] p-8 rounded-[2.5rem] border border-gray-900 shadow-2xl">
          <div class="flex justify-between items-center mb-8">
            <h3 class="font-black uppercase text-sm tracking-widest text-gray-300">Recommended</h3>
            <button class="text-green-400 text-[10px] font-bold uppercase hover:underline">Browse All</button>
          </div>

          <div class="space-y-6">
            <div v-for="n in 3" :key="n" class="flex items-center justify-between group">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center font-bold text-xs text-green-400 border border-gray-800">
                  DM
                </div>
                <div>
                  <p class="text-sm font-bold text-white group-hover:text-green-400 transition-colors">David Martinez</p>
                  <p class="text-[10px] text-gray-500 uppercase font-semibold">Strength & Conditioning</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-black text-green-400">$80</p>
                <p class="text-[10px] text-gray-600 font-bold">⭐ 4.8</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </main>
  </div>
</template>

<script setup>
import DashboardSidebar from '../../components/DashboardSidebar.vue'
</script>