<template>
  <div class="flex min-h-screen bg-black selection:bg-green-400 selection:text-black">
    <DashboardSidebar />

    <main class="flex-grow p-10 text-white overflow-y-auto">
      <header class="mb-10">
        <h2 class="text-3xl font-black uppercase tracking-tighter text-white">My Bookings</h2>
        <p class="text-gray-500 text-sm mt-1">Manage your training sessions and track your history.</p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div class="bg-[#0f172a]/40 border border-blue-500/20 p-6 rounded-[2rem] shadow-xl">
          <p class="text-3xl font-black text-blue-400">{{ upcomingBookings.length }}</p>
          <p class="text-[10px] uppercase font-bold text-gray-500 tracking-widest mt-1">Upcoming Sessions</p>
        </div>
        <div class="bg-[#061a14]/40 border border-green-500/20 p-6 rounded-[2rem] shadow-xl">
          <p class="text-3xl font-black text-green-400">{{ pastBookings.length }}</p>
          <p class="text-[10px] uppercase font-bold text-gray-500 tracking-widest mt-1">History Sessions</p>
        </div>
        </div>

      <div v-if="loading" class="text-center py-20 text-green-400 font-black uppercase tracking-widest">
        Syncing with database...
      </div>

      <div v-else>
        <section class="mb-12">
          <h3 class="font-black uppercase text-xs tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-3">
            Upcoming Sessions <div class="h-[1px] flex-grow bg-gray-900"></div>
          </h3>
          
          <div class="space-y-4">
            <div v-for="booking in upcomingBookings" :key="booking.id" 
                 class="bg-[#0f1115] p-5 rounded-3xl border border-gray-900 hover:border-green-400/20 transition-all group flex items-center justify-between">
              <div class="flex items-center gap-5">
                <div class="w-12 h-12 bg-green-400 rounded-2xl flex items-center justify-center text-black font-black text-sm uppercase">
                  {{ (booking.trainer_name || 'T').charAt(0) }}
                </div>
                <div>
                  <h4 class="font-bold text-white group-hover:text-green-400 transition-colors uppercase">
                    {{ booking.trainer_name }}
                  </h4>
                  <div class="flex items-center gap-4 mt-1">
                    <span class="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-1">📅 {{ formatDate(booking.start_time) }}</span>
                    <span class="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-1">🕒 {{ formatTime(booking.start_time) }}</span>
                    <span class="text-[10px] text-green-400/80 font-bold uppercase flex items-center gap-1">💪 {{ booking.session_title }}</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-6">
                <div class="text-right">
                  <p class="text-[9px] text-green-500 font-bold uppercase tracking-tighter italic">● {{ booking.status }}</p>
                </div>
                <button 
                  v-if="booking.status === 'Pending'"
                  @click="handleCancel(booking.id)"
                  :disabled="isCancelling === booking.id"
                  class="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-all active:scale-95 disabled:opacity-50">
                  {{ isCancelling === booking.id ? 'Wait...' : 'Cancel' }}
                </button>
              </div>
            </div>

            <div v-if="upcomingBookings.length === 0" class="text-gray-600 text-xs font-bold uppercase py-10 text-center border border-dashed border-gray-900 rounded-3xl">
              No upcoming sessions found.
            </div>
          </div>
        </section>

        <section>
          <h3 class="font-black uppercase text-xs tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-3">
            Past & Cancelled Sessions <div class="h-[1px] flex-grow bg-gray-900"></div>
          </h3>
          
          <div class="space-y-4 opacity-70 hover:opacity-100 transition-opacity">
            <div v-for="past in pastBookings" :key="past.id" 
                 class="bg-[#0a0a0a] p-5 rounded-3xl border border-gray-900 flex items-center justify-between grayscale-[0.5] hover:grayscale-0 transition-all">
              <div class="flex items-center gap-5">
                <div class="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 font-black text-sm border border-gray-700 uppercase">
                  {{ (past.trainer_name || 'T').charAt(0) }}
                </div>
                <div>
                  <h4 class="font-bold text-gray-300 uppercase">{{ past.trainer_name }}</h4>
                  <p class="text-[10px] text-gray-600 font-bold uppercase mt-1">
                    {{ past.status }} on {{ formatDate(past.start_time) }} • {{ past.session_title }}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-6">
                <router-link to="/dashboard/find-trainers" class="bg-green-400/10 text-green-400 border border-green-400/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-green-400 hover:text-black transition-all">
                  Book Again
                </router-link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../../utils/api'
import DashboardSidebar from '../../components/DashboardSidebar.vue'

const bookings = ref([])
const loading = ref(true)
const isCancelling = ref(null)

const upcomingBookings = computed(() => {
  if (!Array.isArray(bookings.value)) return []
  return bookings.value.filter(b => b.status === 'Confirmed' || b.status === 'Pending')
})

const pastBookings = computed(() => {
  if (!Array.isArray(bookings.value)) return []
  return bookings.value.filter(b => b.status === 'Cancel' || b.status === 'Completed')
})

const fetchMyBookings = async () => {
  try {
    loading.value = true
    const response = await api.get('/bookings/my')
    const rawData = response.data.data || response.data
    bookings.value = Array.isArray(rawData) ? rawData : []
  } catch (error) {
    console.error("Fetch error:", error)
  } finally {
    loading.value = false
  }
}

const handleCancel = async (bookingId) => {
  if (!confirm("Are you sure?")) return
  isCancelling.value = bookingId
  try {
    await api.patch(`/bookings/${bookingId}/status`, { status: 'Cancel' })
    alert("Cancelled!")
    await fetchMyBookings() 
  } catch (error) {
    alert("Gagal: " + (error.response?.data?.message || "Error"))
  } finally {
    isCancelling.value = null
  }
}

const formatDate = (date) => date ? new Date(date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) : '-'
const formatTime = (date) => date ? new Date(date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-'

onMounted(fetchMyBookings)
</script>