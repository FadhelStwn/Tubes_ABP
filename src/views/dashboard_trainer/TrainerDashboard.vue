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
        <p class="text-2xl font-black italic">{{ stats.totalSessions }}</p>
        <p class="text-[9px] font-black text-gray-600 uppercase tracking-widest text-nowrap">Sesi Aktif</p>
      </div>

      <div class="bg-[#161920] p-6 rounded-[1.5rem] border border-gray-900">
        <div class="w-10 h-10 bg-blue-400/10 rounded-xl flex items-center justify-center mb-4 border border-blue-400/20">
          <span class="text-blue-400 text-xl">👥</span>
        </div>
        <p class="text-2xl font-black italic">{{ stats.totalBookers }}</p>
        <p class="text-[9px] font-black text-gray-600 uppercase tracking-widest text-nowrap">Total Booker</p>
      </div>
    </div>

    <div class="mb-10">
      <h3 class="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
        Quick Actions <span class="w-10 h-[1px] bg-gray-800"></span>
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <router-link to="/trainer/manage-sessions" 
        class="bg-green-400/5 border border-green-400/20 p-6 rounded-2xl hover:bg-green-400/10 transition-all cursor-pointer group">
          <p class="text-green-400 font-black text-xs uppercase mb-1">Kelola Jadwal</p>
          <p class="text-[10px] text-gray-500 font-bold group-hover:text-gray-300">Tambah, edit, atau hapus sesi</p>
        </router-link>

        <router-link to="/trainer/participants"
        class="bg-blue-400/5 border border-blue-400/20 p-6 rounded-2xl hover:bg-blue-400/10 transition-all cursor-pointer group">
          <p class="text-blue-400 font-black text-xs uppercase mb-1">Lihat Booker</p>
          <p class="text-[10px] text-gray-500 font-bold group-hover:text-gray-300">Cek member yang booking</p>
        </router-link>
      </div>
    </div>

    <div class="bg-[#161920] rounded-[2rem] border border-gray-900 overflow-hidden shadow-2xl">
      <div class="p-8 border-b border-gray-900 flex justify-between items-center">
        <h3 class="text-lg font-black uppercase tracking-tight italic">Jadwal Sesi Anda</h3>
        <span class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Real-time Data</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-black/20">
              <th class="py-4 px-8 text-[10px] font-black text-gray-600 uppercase tracking-widest">Sesi</th>
              <th class="py-4 px-8 text-[10px] font-black text-gray-600 uppercase tracking-widest">Waktu</th>
              <th class="py-4 px-8 text-[10px] font-black text-gray-600 uppercase tracking-widest text-center">Status Booker</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
               <td colspan="3" class="py-20 text-center">
                  <div class="animate-pulse text-green-400 font-black uppercase text-xs tracking-widest">Loading Schedule...</div>
               </td>
            </tr>
            <tr v-else-if="sessions.length === 0">
               <td colspan="3" class="py-20 text-center text-gray-600 font-bold text-xs uppercase tracking-widest">
                  Belum ada sesi yang dibuat.
               </td>
            </tr>
            <tr v-for="session in sessions" :key="session.session_id" class="border-b border-gray-900/50 hover:bg-white/[0.02] transition-colors group">
              <td class="py-6 px-8">
                <p class="text-xs font-black uppercase group-hover:text-green-400 transition-colors">{{ session.title }}</p>
                <p class="text-[9px] text-gray-600 font-bold mt-1 uppercase italic">📍 {{ session.location_name || 'Main Gym' }}</p>
              </td>
              <td class="py-6 px-8">
                <div class="flex flex-col gap-1">
                  <p class="text-[10px] text-gray-300 font-black tracking-tight">{{ formatDate(session.start_time) }}</p>
                  <p class="text-[10px] text-gray-500 font-medium">{{ formatTime(session.start_time) }} - {{ formatTime(session.end_time) }}</p>
                </div>
              </td>
              <td class="py-6 px-8 text-center">
                <span class="text-[10px] bg-green-400/10 text-green-400 px-4 py-1.5 rounded-full border border-green-400/20 font-black uppercase tracking-widest">
                  {{ session.confirmed_customers || 0 }} Members
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../utils/api'

// State
const sessions = ref([])
const stats = ref({
  totalSessions: 0,
  totalBookers: 0
})
const loading = ref(true)

// Fetch Data dari Backend
const fetchTrainerDashboard = async () => {
  loading.value = true
  try {
    // Memanggil View trainer-schedule sesuai README
    const { data } = await api.get('/views/trainer-schedule')
    sessions.value = data
    
    // Hitung Stats
    stats.value.totalSessions = data.length
    stats.value.totalBookers = data.reduce((acc, curr) => acc + (curr.confirmed_customers || 0), 0)
    
  } catch (err) {
    console.error('Error fetching trainer dashboard:', err)
  } finally {
    loading.value = false
  }
}

// Formatters
const formatTime = (dateStr) => {
  if (!dateStr) return '--:--'
  return new Date(dateStr).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' })
}

onMounted(fetchTrainerDashboard)
</script>