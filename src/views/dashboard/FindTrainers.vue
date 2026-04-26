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
import { useRouter } from 'vue-router'
import api from '../../utils/api'
import DashboardSidebar from '../../components/DashboardSidebar.vue'

const router = useRouter()
const sessions = ref([])
const myBookedIds = ref([]) // Untuk menyimpan list ID sesi yang sudah dibooking
const loading = ref(true)
const loadingBooking = ref(false)

const searchQuery = ref('')
const selectedSpecialty = ref('')
const selectedLocation = ref('')

// Load data sesi dari backend
const fetchSessions = async () => {
  try {
    loading.value = true
    const response = await api.get('/views/upcoming-sessions')
    sessions.value = Array.isArray(response.data) ? response.data : (response.data.data || [])
  } catch (err) {
    console.error("Gagal load sesi:", err)
  } finally {
    loading.value = false
  }
}

// Load history booking user (untuk mematikan tombol yang sudah dibooking)
const fetchUserBookings = async () => {
  try {
    const response = await api.get('/views/customer-booking-history')
    // Simpan ID sesinya saja ke dalam array
    myBookedIds.value = response.data.map(item => item.session_id)
  } catch (err) {
    console.error("Gagal load history booking:", err)
  }
}

// Cek apakah ID sesi ada di daftar booking user
const isAlreadyBooked = (id) => myBookedIds.value.includes(id)

const filteredSessions = computed(() => {
  return sessions.value.filter(s => {
    const name = (s.trainer_name || '').toLowerCase()
    const title = (s.title || '').toLowerCase()
    const loc = (s.location_name || '').toLowerCase()
    const search = searchQuery.value.toLowerCase()

    return (name.includes(search) || title.includes(search)) &&
           (!selectedSpecialty.value || title.includes(selectedSpecialty.value.toLowerCase())) &&
           (!selectedLocation.value || loc.includes(selectedLocation.value.toLowerCase()))
  })
})

const handleBooking = async (sessionId) => {
  if (!sessionId || isAlreadyBooked(sessionId)) return
  
  loadingBooking.value = true
  try {
    // Sesuai readme: POST /api/bookings
    await api.post('/bookings', { session_id: sessionId })
    alert("Booking Berhasil! Cek jadwalmu di My Bookings.")
    
    // Update local state agar tombol langsung berubah
    myBookedIds.value.push(sessionId)
    
    router.push('/dashboard/my-bookings')
  } catch (err) {
    const msg = err.response?.data?.message || "Gagal melakukan booking."
    alert(msg)
  } finally {
    loadingBooking.value = false
  }
}

const formatTime = (dateStr) => {
  if (!dateStr) return '--:--'
  return new Date(dateStr).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  fetchSessions()
  fetchUserBookings()
})
</script>

<style scoped>
.transition-all {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>