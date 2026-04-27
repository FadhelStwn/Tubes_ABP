<template>
  <div class="flex min-h-screen bg-black selection:bg-green-400 selection:text-black">
    <DashboardSidebar />

    <main class="flex-grow p-10 text-white overflow-y-auto">
      <header class="mb-10">
        <div class="flex justify-between items-end">
          <div>
            <h2 class="text-3xl font-black uppercase tracking-tighter text-white">Find Trainers</h2>
            <p class="text-gray-500 text-sm mt-1 font-medium">Temukan sesi latihan terbaik dari database kami.</p>
          </div>
          <div class="hidden md:block text-right">
            <span class="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-400 font-bold uppercase tracking-widest">
              Live Database Access
            </span>
          </div>
        </div>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <input v-model="searchQuery" type="text" placeholder="Cari trainer atau judul sesi..." 
               class="w-full bg-[#0f1115] border border-gray-800 p-4 rounded-2xl text-sm focus:ring-2 focus:ring-green-400 outline-none text-white">
        
        <select v-model="selectedSpecialty" class="bg-[#0f1115] border border-gray-800 p-4 rounded-2xl text-sm text-gray-400 outline-none cursor-pointer">
          <option value="">Semua Kategori</option>
          <option value="Yoga">Yoga</option>
          <option value="HIIT">HIIT</option>
          <option value="Strength">Strength</option>
        </select>

        <select v-model="selectedLocation" class="bg-[#0f1115] border border-gray-800 p-4 rounded-2xl text-sm text-gray-400 outline-none cursor-pointer">
          <option value="">Semua Lokasi</option>
          <option value="Purworejo">Purworejo</option>
          <option value="Banyumas">Banyumas</option>
          <option value="Tegal">Tegal</option>
        </select>
      </div>

      <div v-if="loading" class="flex flex-col items-center justify-center py-32">
        <div class="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-green-400 font-black uppercase tracking-widest text-xs">Fetching sessions...</p>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div v-for="session in filteredSessions" :key="session.session_id" 
             class="bg-[#0f1115] p-8 rounded-[2.5rem] border border-gray-900 hover:border-green-400 transition-all duration-500 group relative overflow-hidden shadow-2xl">
          
          <div class="flex justify-between items-start mb-6">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 bg-green-400 rounded-2xl flex items-center justify-center text-black font-black text-xl">
                {{ (session.trainer_name || 'T').charAt(0) }}
              </div>
              <div>
                <h4 class="font-black text-lg uppercase group-hover:text-green-400 transition-colors">{{ session.trainer_name }}</h4>
                <p class="text-xs text-green-400 font-bold italic">{{ session.title }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-[10px] text-gray-600 font-black uppercase">Price</p>
              <p class="text-sm font-bold text-white">Rp {{ session.price?.toLocaleString('id-ID') }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-8 py-4 border-y border-white/5">
            <div>
              <p class="text-[9px] text-gray-600 font-black uppercase">Location</p>
              <p class="text-xs font-bold text-gray-300">📍 {{ session.location_name }}</p>
            </div>
            <div>
              <p class="text-[9px] text-gray-600 font-black uppercase">Time Slot</p>
              <p class="text-xs font-bold text-gray-300">🕒 {{ formatTime(session.start_time) }} - {{ formatTime(session.end_time) }}</p>
            </div>
            <div>
              <p class="text-[9px] text-gray-600 font-black uppercase">Availability</p>
              <p class="text-xs font-bold text-gray-300">👥 {{ session.confirmed_bookings || 0 }} / {{ session.capacity }}</p>
            </div>
            <div>
              <p class="text-[9px] text-gray-600 font-black uppercase">Status</p>
              <span class="text-[9px] px-2 py-0.5 bg-green-400/10 text-green-400 border border-green-400/20 rounded">Active</span>
            </div>
          </div>

          <button @click="handleBooking(session.session_id)"
                  :disabled="loadingBooking || isAlreadyBooked(session.session_id)"
                  class="w-full py-4 font-black uppercase text-xs tracking-widest rounded-2xl transition-all"
                  :class="isAlreadyBooked(session.session_id) 
                          ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                          : 'bg-green-400 text-black hover:bg-green-300 shadow-lg shadow-green-400/20'">
            <span v-if="loadingBooking" class="animate-pulse">Processing...</span>
            <span v-else-if="isAlreadyBooked(session.session_id)">Sudah Dipesan ✅</span>
            <span v-else>Ambil Sesi Sekarang →</span>
          </button>
        </div>

        <div v-if="filteredSessions.length === 0" class="col-span-full text-center py-20 border border-dashed border-gray-800 rounded-[2rem]">
          <p class="text-gray-600 font-bold uppercase tracking-widest text-xs">Tidak ada sesi ditemukan.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import DashboardSidebar from '../../components/DashboardSidebar.vue'
import api from '../../utils/api'

// State
const sessions = ref([])
const myBookings = ref([])
const loading = ref(true)
const loadingBooking = ref(false)
const searchQuery = ref('')
const selectedSpecialty = ref('')
const selectedLocation = ref('')

const fetchData = async () => {
  loading.value = true
  try {
    const resSessions = await api.get('/sessions')
    
    // DEBUG: Cek di Console (F12) untuk melihat isi asli dari database
    console.log("Data dari Backend:", resSessions.data)
    
    // Pastikan data adalah Array
    if (resSessions.data && Array.isArray(resSessions.data)) {
      sessions.value = resSessions.data
    } else if (resSessions.data.data && Array.isArray(resSessions.data.data)) {
      // Beberapa backend membungkus array di dalam objek { data: [] }
      sessions.value = resSessions.data.data
    } else {
      sessions.value = []
    }

    // Ambil riwayat booking (opsional)
    const resMyBookings = await api.get('/views/customer-booking-history')
    myBookings.value = resMyBookings.data || []
    
  } catch (err) {
    console.error('Fetch error:', err)
  } finally {
    loading.value = false
  }
}

// Logika Filtering (Pastikan variabel ada)
const filteredSessions = computed(() => {
  if (!sessions.value) return []
  return sessions.value.filter(s => {
    const name = s.trainer_name || ''
    const title = s.title || ''
    const loc = s.location_name || ''

    const matchSearch = name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchSpecialty = selectedSpecialty.value === '' || title.includes(selectedSpecialty.value)
    const matchLocation = selectedLocation.value === '' || loc === selectedLocation.value
    
    return matchSearch && matchSpecialty && matchLocation
  })
})

const formatTime = (dateStr) => {
  if (!dateStr) return '--:--'
  try {
    const date = new Date(dateStr)
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  } catch (e) { return '--:--' }
}

const isAlreadyBooked = (sessionId) => {
  return myBookings.value.some(b => b.session_id === sessionId && b.status !== 'Cancel')
}

const handleBooking = async (sessionId) => {
  if (loadingBooking.value) return
  
  loadingBooking.value = true
  try {
    await api.post('/bookings', { session_id: sessionId })
    alert('Booking berhasil!')
    await fetchData() // Refresh data setelah booking
  } catch (err) {
    console.error("Booking error:", err)
    alert(err.response?.data?.message || 'Gagal melakukan booking')
  } finally {
    loadingBooking.value = false
  }
}

onMounted(fetchData)
</script>

<style scoped>
.transition-all {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>

