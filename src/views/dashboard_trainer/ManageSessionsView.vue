<template>
  <main class="flex-grow p-8 text-white overflow-y-auto bg-[#0a0b10]">
    <header class="mb-8 flex justify-between items-center">
      <div>
        <h2 class="text-3xl font-black uppercase tracking-tighter italic">Kelola Sesi</h2>
        <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Tambah, edit, atau hapus sesi latihan Anda</p>
      </div>
      <button class="bg-green-400 text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-green-300 transition-all flex items-center gap-2 shadow-lg shadow-green-400/10">
        <span class="text-lg leading-none">+</span> Buat Sesi Baru
      </button>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="bg-[#161920]/50 p-6 rounded-2xl border border-gray-900/50 flex flex-col">
        <span class="text-2xl font-black text-green-400 italic mb-1">3</span>
        <span class="text-[9px] font-black text-gray-600 uppercase tracking-widest">Sesi Aktif</span>
      </div>
      <div class="bg-[#161920]/50 p-6 rounded-2xl border border-gray-900/50 flex flex-col">
        <span class="text-2xl font-black text-blue-400 italic mb-1">19</span>
        <span class="text-[9px] font-black text-gray-600 uppercase tracking-widest">Total Booker</span>
      </div>
      <div class="bg-[#161920]/50 p-6 rounded-2xl border border-gray-900/50 flex flex-col">
        <span class="text-2xl font-black text-purple-400 italic mb-1">28</span>
        <span class="text-[9px] font-black text-gray-600 uppercase tracking-widest">Total Kapasitas</span>
      </div>
    </div>

    <div class="space-y-4">
      <div v-for="session in sessions" :key="session.id" 
           class="bg-[#161920] p-8 rounded-[2rem] border border-gray-900 hover:border-white/10 transition-all relative group">
        
        <div class="flex flex-col md:flex-row justify-between gap-6">
          <div class="flex-grow">
            <div class="flex items-center gap-3 mb-2">
              <h4 class="font-black text-lg uppercase tracking-tight italic">{{ session.title }}</h4>
              <span class="bg-green-400/10 text-green-400 text-[8px] font-black px-2 py-0.5 rounded border border-green-400/20 uppercase">active</span>
            </div>
            <p class="text-xs text-gray-500 mb-6 font-medium">{{ session.description }}</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <p class="text-[10px] text-gray-400 flex items-center gap-2">
                  <span class="opacity-50">🗓️</span> <span class="font-bold text-gray-500 uppercase">Jadwal:</span> {{ session.days }}
                </p>
                <p class="text-[10px] text-gray-400 flex items-center gap-2">
                  <span class="opacity-50">🕒</span> <span class="font-bold text-gray-500 uppercase">Waktu:</span> {{ session.time }}
                </p>
              </div>
              <div class="space-y-2">
                <p class="text-[10px] text-gray-400 flex items-center gap-2">
                  <span class="opacity-50">💰</span> <span class="font-bold text-gray-500 uppercase">Harga:</span> <span class="text-green-400">Rp {{ session.price }}</span>
                </p>
                <p class="text-[10px] text-gray-400 flex items-center gap-2">
                  <span class="opacity-50">👥</span> <span class="font-bold text-gray-500 uppercase">Booker:</span> {{ session.bookerCount }}
                </p>
              </div>
            </div>
          </div>

          <div class="flex md:flex-col justify-end gap-2 shrink-0">
            <button class="bg-[#2a2d35] hover:bg-orange-500/20 hover:text-orange-400 text-orange-400/60 text-[9px] font-black uppercase px-4 py-2 rounded-lg transition-all border border-transparent hover:border-orange-500/30">
              Nonaktifkan
            </button>
            <div class="flex gap-2">
              <button class="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-all">
                <span class="text-sm">✏️</span>
              </button>
              <button class="p-2.5 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">
                <span class="text-sm">🗑️</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const sessions = ref([
  { 
    id: 1, 
    title: 'Strength Training - Beginner', 
    description: 'Latihan kekuatan dasar untuk pemula',
    days: 'Senin, Rabu, Jumat', 
    time: '09:00-10:00', 
    price: '150.000', 
    bookerCount: '8/10' 
  },
  { 
    id: 2, 
    title: 'HIIT Workout', 
    description: 'High Intensity Interval Training untuk pembakaran kalori maksimal',
    days: 'Selasa, Kamis', 
    time: '18:00-19:00', 
    price: '200.000', 
    bookerCount: '6/8' 
  },
  { 
    id: 3, 
    title: 'Weight Loss Program', 
    description: 'Program khusus penurunan berat badan',
    days: 'Senin, Rabu', 
    time: '17:00-18:00', 
    price: '175.000', 
    bookerCount: '5/10' 
  },
])
</script>