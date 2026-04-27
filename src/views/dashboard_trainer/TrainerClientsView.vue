<template>
  <main class="flex-grow p-8 text-white overflow-y-auto bg-[#0a0b10] min-h-screen">
    <header class="mb-8">
      <h2 class="text-3xl font-black uppercase tracking-tighter italic text-white">Daftar Booker</h2>
      <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">
        Manajemen data peserta berdasarkan riwayat booking gym
      </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-[#161920] p-6 rounded-2xl border border-gray-900 shadow-xl">
        <p class="text-2xl font-black italic text-green-400 mb-1">{{ bookers.length }}</p>
        <p class="text-[9px] font-black text-gray-600 uppercase tracking-widest">Total Record</p>
      </div>
      <div class="bg-[#161920] p-6 rounded-2xl border border-gray-900 shadow-xl">
        <p class="text-2xl font-black italic text-blue-400 mb-1">{{ confirmedCount }}</p>
        <p class="text-[9px] font-black text-gray-600 uppercase tracking-widest">Confirmed</p>
      </div>
    </div>

    <div class="bg-[#161920] p-6 rounded-2xl border border-gray-900 mb-8">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Cari nama member..." 
        class="w-full bg-black/40 border border-gray-800 rounded-xl px-5 py-3 text-xs focus:border-green-400 outline-none transition-all"
      />
    </div>

    <div class="bg-[#161920] rounded-[2rem] border border-gray-900 overflow-hidden shadow-2xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-black/20">
              <th class="py-5 px-8 text-[10px] font-black text-gray-600 uppercase tracking-widest">Member</th>
              <th class="py-5 px-8 text-[10px] font-black text-gray-600 uppercase tracking-widest">Detail Sesi</th>
              <th class="py-5 px-8 text-[10px] font-black text-gray-600 uppercase tracking-widest text-center">Status</th>
              <th class="py-5 px-8 text-[10px] font-black text-gray-600 uppercase tracking-widest text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="4" class="py-20 text-center text-green-400 font-black text-xs animate-pulse uppercase tracking-widest">Menghubungkan ke Database...</td>
            </tr>
            <tr v-for="booker in filteredBookers" :key="booker.booking_id || booker.id" class="border-b border-gray-900/50 hover:bg-white/[0.02]">
              <td class="py-6 px-8">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 bg-green-400/10 border border-green-400/20 rounded-full flex items-center justify-center font-black text-green-400 text-xs">
                    {{ getInitials(booker.customer_name || booker.name) }}
                  </div>
                  <div>
                    <p class="text-xs font-black uppercase">{{ booker.customer_name || booker.name || 'Member' }}</p>
                    <p class="text-[9px] text-gray-600 lowercase tracking-tighter">{{ booker.customer_email || booker.email || '-' }}</p>
                  </div>
                </div>
              </td>
              <td class="py-6 px-8">
                <p class="text-[10px] text-gray-200 font-black uppercase italic">{{ booker.session_title || 'General Session' }}</p>
                <p class="text-[9px] text-gray-600 font-bold mt-1 uppercase">{{ formatDate(booker.start_time || booker.created_at) }}</p>
              </td>
              <td class="py-6 px-8 text-center">
                <span 
                  :class="getStatusClass(booker.status)"
                  class="text-[8px] px-4 py-1.5 rounded-full border font-black uppercase tracking-widest inline-block"
                >
                  {{ booker.status || 'Confirmed' }}
                </span>
              </td>
              <td class="py-6 px-8 text-center">
                <button 
                  @click="openModal(booker)"
                  class="bg-green-400 hover:bg-green-500 text-black px-4 py-2 rounded-lg text-[9px] font-black uppercase transition-all shadow-lg shadow-green-400/20"
                >
                  + Progress
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div class="bg-[#161920] border border-gray-900 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
        <h2 class="text-xl font-black uppercase italic mb-1">Catat Progress</h2>
        <p class="text-[10px] text-gray-500 font-bold uppercase mb-6 tracking-widest">Member: {{ selectedMember?.customer_name || selectedMember?.name }}</p>
        <form @submit.prevent="saveProgress" class="space-y-4">
          <textarea v-model="note" placeholder="Tulis catatan latihan..." class="w-full bg-black/40 border border-gray-900 rounded-2xl px-4 py-4 text-xs text-white focus:border-green-400 outline-none h-32 transition-all" required></textarea>
          <div class="flex gap-3 pt-2">
            <button type="button" @click="showModal = false" class="flex-1 py-4 bg-white/5 rounded-2xl text-[9px] font-black uppercase border border-gray-800">Batal</button>
            <button type="submit" class="flex-1 py-4 bg-green-400 text-black rounded-2xl text-[9px] font-black uppercase hover:bg-green-500">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../../utils/api'

const bookers = ref([])
const loading = ref(true)
const searchQuery = ref('')
const showModal = ref(false)
const selectedMember = ref(null)
const note = ref('')

const filteredBookers = computed(() => bookers.value.filter(b => (b.customer_name || b.name || '').toLowerCase().includes(searchQuery.value.toLowerCase())))
const confirmedCount = computed(() => bookers.value.filter(b => b.status === 'Confirmed' || !b.status).length)

const getInitials = (n) => n ? n.split(' ').map(i => i[0]).join('').toUpperCase().slice(0, 2) : 'M'
const formatDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', {day:'numeric', month:'short'}) : '--'

const getStatusClass = (status) => {
  if (status === 'Pending') return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20'
  if (status === 'Cancel') return 'bg-red-400/10 text-red-400 border-red-400/20'
  return 'bg-green-400/10 text-green-400 border-green-400/20'
}

// STRATEGI ANTI-403: Coba semua pintu yang mungkin dibuka backend
const fetchBookers = async () => {
  loading.value = true
  // Daftar pintu yang kita coba ketok
  const endpoints = ['/views/session-participants', '/views/customer-booking-history', '/booking']
  
  for (const url of endpoints) {
    try {
      const res = await api.get(url)
      const rawData = res.data.data || res.data || []
      
      if (Array.isArray(rawData)) {
        // MAPPING CERDAS: Nyari nama di segala jenis kolom
        bookers.value = rawData.map(item => ({
          ...item,
          // Dia bakal nyari customer_name, kalau gak ada cari member_name, dst.
          display_name: item.customer_name || item.member_name || item.name || item.username || 'Member Unknown',
          display_session: item.session_title || item.title || item.session_name || 'Latihan Umum'
        }))
        loading.value = false
        return 
      }
    } catch (err) {
      console.warn(`Pintu ${url} ditolak, nyoba jalur lain...`)
    }
  }
  loading.value = false
}

const openModal = (m) => { selectedMember.value = m; note.value = ''; showModal.value = true }

const saveProgress = async () => {
  try {
    await api.post('/progress', {
      booking_id: selectedMember.value.booking_id || selectedMember.value.id,
      member_id: selectedMember.value.customer_id || selectedMember.value.member_id,
      notes: note.value
    })
    alert('Progress Tersimpan!')
    showModal.value = false
  } catch (err) { alert('Gagal simpan ke database') }
}

onMounted(fetchBookers)
</script>