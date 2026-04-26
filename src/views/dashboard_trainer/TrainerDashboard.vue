<template>
  <main class="flex-grow p-8 text-white overflow-y-auto bg-[#0a0b10]">
    <header class="mb-8">
      <h2 class="text-3xl font-black uppercase tracking-tighter italic">Dashboard</h2>
      <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Selamat datang kembali, Coach!</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      <div class="bg-[#161920] p-6 rounded-[1.5rem] border border-gray-900">
        <div class="w-10 h-10 bg-green-400/10 rounded-xl flex items-center justify-center mb-4 border border-green-400/20">
          <span class="text-green-400 text-xl">📅</span>
        </div>
        <p class="text-2xl font-black italic">12</p>
        <p class="text-[9px] font-black text-gray-600 uppercase tracking-widest">Sesi Aktif</p>
      </div>

      <div class="bg-[#161920] p-6 rounded-[1.5rem] border border-gray-900">
        <div class="w-10 h-10 bg-blue-400/10 rounded-xl flex items-center justify-center mb-4 border border-blue-400/20">
          <span class="text-blue-400 text-xl">👥</span>
        </div>
        <p class="text-2xl font-black italic">28</p>
        <p class="text-[9px] font-black text-gray-600 uppercase tracking-widest">Total Booker</p>
      </div>

      <div class="bg-[#161920] p-6 rounded-[1.5rem] border border-gray-900">
        <div class="w-10 h-10 bg-purple-400/10 rounded-xl flex items-center justify-center mb-4 border border-purple-400/20">
          <span class="text-purple-400 text-xl">💵</span>
        </div>
        <p class="text-2xl font-black italic text-green-400">Rp 2.3jt</p>
        <p class="text-[9px] font-black text-gray-600 uppercase tracking-widest">Bulan ini</p>
      </div>

      <div class="bg-[#161920] p-6 rounded-[1.5rem] border border-gray-900">
        <div class="w-10 h-10 bg-orange-400/10 rounded-xl flex items-center justify-center mb-4 border border-orange-400/20">
          <span class="text-orange-400 text-xl">⭐</span>
        </div>
        <p class="text-2xl font-black italic text-orange-400">4.9</p>
        <p class="text-[9px] font-black text-gray-600 uppercase tracking-widest">Rating</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <div class="lg:col-span-2 space-y-6">
        <div class="flex justify-between items-center px-2">
          <h3 class="font-black uppercase text-sm tracking-widest">Sesi Latihan Saya</h3>
          <button class="text-[10px] text-green-400 font-bold uppercase tracking-widest hover:underline">Kelola Semua</button>
        </div>

        <div class="space-y-4">
          <div v-for="session in sessions" :key="session.id" 
               class="bg-[#161920] p-6 rounded-[2rem] border border-gray-900 hover:border-green-400/30 transition-all relative overflow-hidden group">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-black text-sm uppercase tracking-tight mb-2 italic">{{ session.title }}</h4>
                <div class="space-y-1">
                  <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-2">
                    <span>🗓️</span> {{ session.days }} • {{ session.time }}
                  </p>
                  <p class="text-[10px] text-green-400 font-black tracking-widest uppercase">
                    {{ session.price }} <span class="text-gray-600 mx-2">|</span> 👥 {{ session.bookerCount }} booker
                  </p>
                </div>
              </div>
              <span class="bg-green-400/10 text-green-400 text-[8px] font-black px-3 py-1 rounded border border-green-400/20 uppercase">active</span>
            </div>
          </div>
          
          <button class="w-full py-4 border-2 border-dashed border-gray-800 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest text-gray-600 hover:border-green-400/50 hover:text-green-400 transition-all">
            + Buat Sesi Baru
          </button>
        </div>
      </div>

      <div class="space-y-6">
        <div class="flex justify-between items-center px-2">
          <h3 class="font-black uppercase text-sm tracking-widest">Booker Terbaru</h3>
          <button class="text-[10px] text-green-400 font-bold uppercase tracking-widest hover:underline">Lihat Semua</button>
        </div>

        <div class="bg-[#161920] p-6 rounded-[2.5rem] border border-gray-900 space-y-6">
          <div v-for="booker in recentBookers" :key="booker.id" class="flex items-center justify-between group">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-green-400 rounded-xl flex items-center justify-center text-black font-black text-xs italic">
                {{ booker.initials }}
              </div>
              <div>
                <p class="text-xs font-bold text-white group-hover:text-green-400 transition-colors">{{ booker.name }}</p>
                <p class="text-[9px] text-gray-500 font-bold uppercase">{{ booker.type }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-[8px] text-gray-600 font-bold mb-1">{{ booker.date }}</p>
              <span :class="booker.status === 'confirmed' ? 'text-green-400' : 'text-orange-400'" 
                    class="text-[8px] font-black uppercase px-2 py-0.5 bg-white/5 rounded border border-white/10">
                {{ booker.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-6 mt-10">
      <h3 class="font-black uppercase text-sm tracking-widest px-2">Quick Actions</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <router-link to='/trainer/sesion' 
        class="bg-green-400/5 border border-green-400/20 p-6 rounded-2xl hover:bg-green-400/10 transition-all cursor-pointer group">
          <p class="text-green-400 font-black text-xs uppercase mb-1">Kelola Sesi</p>
          <p class="text-[10px] text-gray-500 font-bold group-hover:text-gray-300">Tambah, edit, atau hapus sesi</p>
        </router-link>
        

        <router-link to='/trainer/clien'
        class="bg-blue-400/5 border border-blue-400/20 p-6 rounded-2xl hover:bg-blue-400/10 transition-all cursor-pointer group">
          <p class="text-blue-400 font-black text-xs uppercase mb-1">Lihat Booker</p>
          <p class="text-[10px] text-gray-500 font-bold group-hover:text-gray-300">Cek member yang booking</p>
        </router-link>

      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const sessions = ref([
  { id: 1, title: 'Strength Training - Beginner', days: 'Senin, Rabu, Jumat', time: '09:00-10:00', price: 'Rp 150.000', bookerCount: '8/10' },
  { id: 2, title: 'HIIT Workout', days: 'Selasa, Kamis', time: '18:00-19:00', price: 'Rp 200.000', bookerCount: '6/8' },
  { id: 3, title: 'Weight Loss Program', days: 'Senin, Rabu', time: '17:00-18:00', price: 'Rp 175.000', bookerCount: '5/10' },
])

const recentBookers = ref([
  { id: 1, name: 'Alex Johnson', initials: 'AJ', type: 'Strength Training', date: '2026-04-24', status: 'confirmed' },
  { id: 2, name: 'Sarah Chen', initials: 'SC', type: 'HIIT Workout', date: '2026-04-24', status: 'confirmed' },
  { id: 3, name: 'Michael Brown', initials: 'MB', type: 'Weight Loss', date: '2026-04-23', status: 'confirmed' },
  { id: 4, name: 'Emma Davis', initials: 'ED', type: 'Strength Training', date: '2026-04-22', status: 'pending' },
])
</script>