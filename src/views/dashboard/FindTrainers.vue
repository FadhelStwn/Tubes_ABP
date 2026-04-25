<template>
  <div class="flex min-h-screen bg-black">
    <DashboardSidebar />

    <main class="flex-grow p-10 text-white overflow-y-auto">
      <header class="mb-10">
        <h2 class="text-3xl font-black uppercase tracking-tighter text-white">Find Trainers</h2>
        <p class="text-gray-500 text-sm mt-1">Pilih jadwal latihan yang tersedia secara gratis.</p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div class="relative">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Cari nama atau spesialisasi..." 
            class="w-full bg-[#111111] border border-gray-800 p-3 rounded-xl text-sm focus:ring-1 focus:ring-green-400 outline-none transition text-white">
        </div>
        
        <select v-model="selectedSpecialty" class="bg-[#111111] border border-gray-800 p-3 rounded-xl text-sm text-gray-400 outline-none focus:ring-1 focus:ring-green-400">
          <option value="">Semua Spesialisasi</option>
          <option value="Strength">Strength & Conditioning</option>
          <option value="Yoga">Yoga & Flexibility</option>
          <option value="HIIT">HIIT & Cardio</option>
          <option value="Hypertrophy">Hypertrophy</option>
        </select>

        <select v-model="selectedLocation" class="bg-[#111111] border border-gray-800 p-3 rounded-xl text-sm text-gray-400 outline-none focus:ring-1 focus:ring-green-400">
          <option value="">Semua Lokasi</option>
          <option value="Purworejo">Purworejo</option>
          <option value="Banyumas">Banyumas</option>
          <option value="Tegal">Tegal</option>
        </select>
      </div>

      <div v-if="loading" class="text-center py-20 text-green-400 font-bold animate-pulse">
        Loading Trainers...
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div v-for="trainer in filteredTrainers" :key="trainer.id_booking || trainer.session_id" 
             class="bg-[#0f1115] p-6 rounded-[2rem] border border-gray-900 hover:border-green-400/30 transition-all group shadow-xl">
          
          <div class="flex justify-between items-start mb-6">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 bg-green-400 rounded-2xl flex items-center justify-center text-black font-black text-xl shadow-lg shadow-green-400/20 uppercase">
                {{ (trainer.nama || trainer.trainer_name || 'T').charAt(0) }}
              </div>
              <div>
                <h4 class="font-bold text-lg group-hover:text-green-400 transition-colors uppercase">
                  {{ trainer.nama || trainer.trainer_name || 'Unnamed Trainer' }}
                </h4>
                <p class="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  {{ trainer.nama_sesi || trainer.title || 'General Session' }} 
                </p>
              </div>
            </div>
            
            <div class="text-right">
              <span class="px-3 py-1 bg-green-400/10 text-green-400 text-[10px] font-bold rounded-full uppercase">Free Access</span>
            </div>
          </div>

          <div class="space-y-2 mb-6 border-t border-gray-800/50 pt-4">
            <p class="text-xs text-gray-400 flex items-center gap-2">
              <span class="text-green-400">📍</span> {{ trainer.kota || trainer.location_name || 'King GYM' }}
            </p>
            <p class="text-xs text-gray-400 flex items-center gap-2">
              <span class="text-green-400">👥</span> {{ trainer.confirmed_bookings || 0 }} Members Joined
            </p>
            <p class="text-xs text-gray-400 flex items-center gap-2">
              <span class="text-green-400">🕒</span> {{ formatDateTime(trainer.start_time || trainer.jam_mulai) }}
            </p>
          </div>

          <button @click="handleBooking(trainer.id_sesi || trainer.session_id)"
                  class="w-full py-3 bg-green-400 text-black font-black uppercase text-xs tracking-widest rounded-xl hover:bg-green-300 transition-all active:scale-[0.98]">
            Join This Session
          </button>
        </div>

        <div v-if="filteredTrainers.length === 0" class="col-span-full text-center py-20 text-gray-600">
          Tidak ada trainer atau jadwal yang tersedia saat ini.
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../../utils/api'
import DashboardSidebar from '../../components/DashboardSidebar.vue'

const trainers = ref([])
const loading = ref(true)

const searchQuery = ref('')
const selectedSpecialty = ref('')
const selectedLocation = ref('')

const fetchTrainers = async () => {
  try {
    loading.value = true
    const response = await api.get('/views/upcoming-sessions') 
    
    // Penanganan fleksibel untuk berbagai format response backend
    const resData = response.data;
    trainers.value = Array.isArray(resData) ? resData : (resData.data || []);
    
    console.log("Data diterima:", trainers.value); // Cek kolom di Console F12
  } catch (error) {
    console.error("Fetch error:", error)
  } finally {
    loading.value = false
  }
}

const filteredTrainers = computed(() => {
  return trainers.value.filter(item => {
    // Mencocokkan kolom nama (dari user) atau trainer_name (alias)
    const name = (item.nama || item.trainer_name || '').toLowerCase();
    const sessionName = (item.nama_sesi || item.title || '').toLowerCase();
    const city = (item.kota || item.location_name || '').toLowerCase();

    const matchesSearch = name.includes(searchQuery.value.toLowerCase()) || 
                          sessionName.includes(searchQuery.value.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty.value === '' || 
                             sessionName.includes(selectedSpecialty.value.toLowerCase());

    const matchesLocation = selectedLocation.value === '' || 
                            city.includes(selectedLocation.value.toLowerCase());

    return matchesSearch && matchesSpecialty && matchesLocation;
  });
});

const handleBooking = async (sessionId) => {
  if (!sessionId) {
    alert("ID Sesi tidak ditemukan!");
    return;
  }
  try {
    await api.post('/bookings', { session_id: sessionId })
    alert("Berhasil bergabung dengan sesi latihan!")
  } catch (error) {
    alert("Gagal: " + (error.response?.data?.message || "Terjadi kesalahan"))
  }
}

const formatDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return 'TBA';
  // Jika formatnya hanya jam (HH:mm:ss), kita buatkan tanggal hari ini
  if (dateTimeStr.length <= 8) {
     return `Today, ${dateTimeStr.substring(0, 5)}`;
  }
  return new Date(dateTimeStr).toLocaleString('id-ID', {
    weekday: 'short', 
    day: 'numeric', 
    month: 'short', 
    hour: '2-digit', 
    minute: '2-digit'
  })
}

onMounted(fetchTrainers)
</script>