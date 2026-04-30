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
<tr v-for="booker in filteredBookers" :key="booker.booking_id" class="border-b border-gray-900/50 hover:bg-white/[0.02]">
  <td class="py-6 px-8">
    <div class="flex items-center gap-4">
      <!-- Initials: Pastikan memanggil customer_name sesuai screenshot -->
      <div class="w-10 h-10 bg-green-400/10 border border-green-400/20 rounded-full flex items-center justify-center font-black text-green-400 text-xs">
        {{ getInitials(booker.customer_name) }}
      </div>
      <div>
        <!-- Nama Member sesuai screenshot: customer_name -->
        <p class="text-xs font-black uppercase">{{ booker.customer_name || 'Member Unknown' }}</p>
        <!-- Email biasanya tidak ada di view history, pastikan API mengirimkannya atau beri '-' -->
        <p class="text-[9px] text-gray-600 lowercase tracking-tighter">{{ booker.customer_email || '-' }}</p>
      </div>
    </div>
  </td>
  
  <td class="py-6 px-8">
    <!-- Judul Sesi sesuai screenshot: session_title -->
    <p class="text-[10px] text-gray-200 font-black uppercase italic">{{ booker.session_title || 'General Session' }}</p>
    <!-- Waktu sesuai screenshot: start_time -->
    <p class="text-[9px] text-gray-600 font-bold mt-1 uppercase">{{ formatDate(booker.start_time) }}</p>
  </td>

  <td class="py-6 px-8 text-center">
    <!-- Status sesuai screenshot: status -->
    <span 
      :class="getStatusClass(booker.status)"
      class="text-[8px] px-4 py-1.5 rounded-full border font-black uppercase tracking-widest inline-block"
    >
      {{ booker.status || 'Pending' }}
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

// Ambil data user yang login untuk filter internal
const userData = JSON.parse(localStorage.getItem('user') || '{}')

// 1. PERBAIKAN FILTER: Gunakan display_name agar sinkron dengan hasil mapping
const filteredBookers = computed(() => bookers.value)

const confirmedCount = computed(() => bookers.value.filter(b => b.status === 'Confirmed' || b.status === 'Pending').length)

const getInitials = (n) => n ? n.split(' ').map(i => i[0]).join('').toUpperCase().slice(0, 2) : 'M'
const formatDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', {day:'numeric', month:'short'}) : '--'

const getStatusClass = (status) => {
  if (status === 'Pending') return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20'
  if (status === 'Cancel') return 'bg-red-400/10 text-red-400 border-red-400/20'
  return 'bg-green-400/10 text-green-400 border-green-400/20'
}

const fetchBookers = async () => {
  loading.value = true
  try {
    // 1. Langsung tembak ke pintu yang sudah pasti ada datanya di screenshot phpMyAdmin kamu
    const res = await api.get('/views/customer-booking-history')
    
    // 2. DEBUG KERAS: Lihat struktur asli dari backend di console F12
    console.log("Respon API mentah:", res)

    // Mencoba berbagai kemungkinan letak array (res.data, res.data.data, atau res.data.data.data)
    const rawData = res.data?.data?.data || res.data?.data || res.data || []
    
    if (Array.isArray(rawData)) {
      // 3. JANGAN DIFILTER DULU. Kita pastikan data masuk ke tabel.
      bookers.value = rawData.map(item => ({
        ...item,
        // Gunakan nama kolom persis seperti di phpMyAdmin
        display_name: item.customer_name || 'No Name',
        display_session: item.session_title || 'No Session',
        status: item.status || 'Confirmed'
      }))
      
      console.log("Data yang berhasil di-map ke tabel:", bookers.value)
    } else {
      console.error("API tidak mengembalikan Array. Cek format backend kamu.")
    }

  } catch (err) {
    console.error("Gagal total memanggil API:", err)
    // Cek apakah error 401 (Unauthorized) atau 404 (Not Found)
  } finally {
    loading.value = false
  }
}

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