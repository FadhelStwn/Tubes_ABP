<template>
  <main class="flex-grow p-8 text-white overflow-y-auto bg-[#0a0b10]">
    <header class="mb-8">
      <h2 class="text-3xl font-black uppercase tracking-tighter italic text-white">Daftar Booker</h2>
      <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Member yang booking sesi latihan Anda</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div v-for="stat in stats" :key="stat.label" class="bg-[#161920]/60 p-6 rounded-xl border border-gray-900">
        <p class="text-2xl font-black italic text-green-400 mb-1">{{ stat.value }}</p>
        <p class="text-[9px] font-black text-gray-600 uppercase tracking-widest">{{ stat.label }}</p>
      </div>
    </div>

    <div class="bg-[#161920] p-6 rounded-2xl border border-gray-900 mb-8 flex flex-col md:flex-row gap-6">
      <div class="flex-grow">
        <label class="text-[9px] font-black uppercase text-gray-600 tracking-widest mb-2 block ml-1">Cari Booker</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs">🔍</span>
          <input type="text" placeholder="Cari nama, email, atau sesi..." class="w-full bg-black/40 border border-gray-800 rounded-xl py-3 pl-11 pr-4 text-xs focus:border-green-400 outline-none transition-all">
        </div>
      </div>
      <div class="w-full md:w-64">
        <label class="text-[9px] font-black uppercase text-gray-600 tracking-widest mb-2 block ml-1">Filter Status</label>
        <select class="w-full bg-black/40 border border-gray-800 rounded-xl py-3 px-4 text-xs focus:border-green-400 outline-none transition-all appearance-none text-gray-400 font-bold">
          <option>Semua Status</option>
          <option>Confirmed</option>
          <option>Pending</option>
        </select>
      </div>
    </div>

    <div class="space-y-4">
      <p class="text-[10px] font-black text-gray-700 uppercase tracking-[0.2em] mb-4 ml-2">{{ bookers.length }} booker ditemukan</p>
      
      <div v-for="booker in bookers" :key="booker.id" class="bg-[#161920] p-8 rounded-[2rem] border border-gray-900 flex flex-col lg:flex-row gap-8 relative hover:border-white/10 transition-all group">
        <div class="lg:w-1/4 flex gap-4">
          <div class="w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center text-black font-black text-xs shrink-0 italic">
            {{ booker.initials }}
          </div>
          <div>
            <h4 class="font-black text-sm uppercase tracking-tight italic">{{ booker.name }}</h4>
            <div class="mt-2 space-y-1">
              <p class="text-[9px] text-gray-500 flex items-center gap-2"><span>✉️</span> {{ booker.email }}</p>
              <p class="text-[9px] text-gray-500 flex items-center gap-2"><span>📞</span> {{ booker.phone }}</p>
              <p class="text-[9px] text-gray-500 flex items-center gap-2"><span>📍</span> {{ booker.location }}</p>
            </div>
          </div>
        </div>

        <div class="lg:w-2/4 bg-black/20 p-5 rounded-2xl border border-gray-800/50 flex flex-col justify-center">
          <p class="text-[11px] font-black text-green-400 uppercase tracking-widest mb-2">{{ booker.sessionType }}</p>
          <div class="grid grid-cols-2 gap-y-2">
            <p class="text-[9px] text-gray-500 uppercase font-bold">Tanggal Booking:</p>
            <p class="text-[9px] text-gray-300 font-bold">{{ booker.bookingDate }}</p>
            <p class="text-[9px] text-gray-500 uppercase font-bold">Sesi:</p>
            <p class="text-[9px] text-gray-300 font-bold italic">{{ booker.sessionSchedule }}</p>
            <p class="text-[9px] text-gray-500 uppercase font-bold">Waktu:</p>
            <p class="text-[9px] text-gray-300 font-bold italic">🕒 {{ booker.sessionTime }}</p>
            <p class="text-[9px] text-gray-500 uppercase font-bold">Harga:</p>
            <p class="text-[9px] text-green-400 font-black italic">Rp {{ booker.price }}</p>
          </div>
        </div>

        <div class="lg:w-1/4 flex flex-col justify-between items-end">
          <span :class="{
            'bg-green-400/10 text-green-400 border-green-400/20': booker.status === 'CONFIRMED',
            'bg-orange-400/10 text-orange-400 border-orange-400/20': booker.status === 'PENDING'
          }" class="text-[8px] font-black uppercase px-4 py-1.5 rounded-full border tracking-widest">
            {{ booker.status }}
          </span>

          <div v-if="booker.status === 'PENDING'" class="flex gap-2">
            <button class="bg-green-500/20 text-green-400 border border-green-500/30 text-[8px] font-black uppercase px-4 py-2 rounded-lg hover:bg-green-500 hover:text-black transition-all">Terima</button>
            <button class="bg-red-500/20 text-red-400 border border-red-500/30 text-[8px] font-black uppercase px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all italic">Tolak</button>
          </div>
          <button v-else class="text-[9px] font-black text-blue-400 uppercase tracking-widest hover:underline">Lihat Detail</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
  { label: 'Total Booker', value: 6 },
  { label: 'Confirmed', value: 3 },
  { label: 'Pending', value: 1 },
  { label: 'Completed', value: 2 }
])

const bookers = ref([
  { 
    id: 1, name: 'Alex Johnson', initials: 'AJ', email: 'alexjohnson@gmail.com', phone: '+62 812-3456-7890', location: 'Jakarta Selatan',
    sessionType: 'Strength Training - Beginner', bookingDate: '2026-04-10', sessionSchedule: '2026-04-15', sessionTime: '09:00-10:00', price: '150.000', status: 'CONFIRMED'
  },
  { 
    id: 2, name: 'Sarah Chen', initials: 'SC', email: 'sarah.chen@gmail.com', phone: '+62 813-9876-5432', location: 'Jakarta Pusat',
    sessionType: 'HIIT Workout', bookingDate: '2026-04-11', sessionSchedule: '2026-04-16', sessionTime: '18:00-19:00', price: '200.000', status: 'CONFIRMED'
  },
  { 
    id: 3, name: 'Michael Brown', initials: 'MB', email: 'michael.b@gmail.com', phone: '+62 821-1111-2222', location: 'Tangerang',
    sessionType: 'Weight Loss Program', bookingDate: '2026-04-12', sessionSchedule: '2026-04-17', sessionTime: '17:00-18:00', price: '175.000', status: 'PENDING'
  },
  { 
    id: 4, name: 'Emma Davis', initials: 'ED', email: 'emma.davis@gmail.com', phone: '+62 822-3333-4444', location: 'Bekasi',
    sessionType: 'Strength Training - Beginner', bookingDate: '2026-04-13', sessionSchedule: '2026-04-18', sessionTime: '09:00-10:00', price: '150.000', status: 'CONFIRMED'
  }
])
</script>