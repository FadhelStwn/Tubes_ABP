<template>
  <main class="flex-grow p-8 text-white overflow-y-auto bg-[#0a0b10] min-h-screen">
    <header class="mb-8 flex justify-between items-center">
      <div>
        <h2 class="text-3xl font-black uppercase tracking-tighter italic">Manage Sessions</h2>
        <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Atur dan pantau jadwal latihan kamu</p>
      </div>
      <button 
        @click="openCreateModal" 
        class="bg-green-400 hover:bg-green-500 text-black px-6 py-3 rounded-xl text-[10px] font-black uppercase transition-all shadow-lg shadow-green-400/10"
      >
        + Tambah Sesi Baru
      </button>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="bg-[#161920] p-6 rounded-[1.5rem] border border-gray-900 shadow-xl">
        <p class="text-2xl font-black italic">{{ sessions.length }}</p>
        <p class="text-[9px] font-black text-gray-600 uppercase tracking-widest">Total Sesi Anda</p>
      </div>

      <div class="bg-[#161920] p-6 rounded-[1.5rem] border border-gray-900 shadow-xl">
        <p class="text-2xl font-black italic">{{ upcomingCount }}</p>
        <p class="text-[9px] font-black text-gray-600 uppercase tracking-widest">Sesi Mendatang</p>
      </div>

      <div class="bg-[#161920] p-6 rounded-[1.5rem] border border-gray-900 shadow-xl">
        <p class="text-2xl font-black italic">{{ totalCapacity }}</p>
        <p class="text-[9px] font-black text-gray-600 uppercase tracking-widest">Total Slot Member</p>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-pulse text-green-400 font-black uppercase text-xs tracking-widest">Loading Data...</div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="session in sessions" :key="session.id" class="bg-[#161920] border border-gray-900 p-6 rounded-[2rem] hover:border-green-400/30 transition-all group shadow-2xl">
        <div class="flex justify-between items-start mb-4">
          <span class="px-3 py-1 bg-green-400/10 text-green-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-400/20">
            Rp {{ session.price?.toLocaleString() }}
          </span>
          <span class="text-[10px] text-gray-700 font-mono italic">#{{ session.id }}</span>
        </div>

        <h3 class="text-md font-black mb-1 uppercase italic group-hover:text-green-400 transition-colors tracking-tight">{{ session.title }}</h3>
        <p class="text-gray-500 text-[10px] mb-6 line-clamp-2 font-medium leading-relaxed">{{ session.description || 'Tidak ada deskripsi sesi.' }}</p>

        <div class="space-y-2 mb-8">
          <div class="flex items-center text-[10px] text-gray-400 gap-2">
            <span class="text-green-400 opacity-50">📅</span> {{ formatDate(session.start_time) }}
          </div>
          <div class="flex items-center text-[10px] text-gray-400 gap-2">
            <span class="text-green-400 opacity-50">⏰</span> {{ formatTime(session.start_time) }} - {{ formatTime(session.end_time) }}
          </div>
        </div>

        <div class="flex gap-2 pt-6 border-t border-gray-800">
          <button @click="openEditModal(session)" class="flex-1 py-3 bg-white/5 border border-gray-800 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Edit</button>
          <button v-if="isAdmin" @click="deleteSession(session.id)" class="px-4 py-3 bg-red-500/10 text-red-500 rounded-xl text-[9px] font-black uppercase border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">Hapus</button>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div class="bg-[#161920] border border-gray-900 w-full max-w-lg rounded-[2rem] p-8 shadow-2xl">
        <h2 class="text-xl font-black uppercase italic mb-6 tracking-tighter">{{ isEdit ? 'Update Session' : 'Create Session' }}</h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="text-[9px] font-black uppercase text-gray-600 mb-2 block tracking-widest">Judul Sesi</label>
            <input v-model="form.title" type="text" class="w-full bg-black/40 border border-gray-900 rounded-xl px-4 py-3 text-xs focus:border-green-400 outline-none transition-all" required>
          </div>
          <div>
            <label class="text-[9px] font-black uppercase text-gray-600 mb-2 block tracking-widest">Deskripsi</label>
            <textarea v-model="form.description" class="w-full bg-black/40 border border-gray-900 rounded-xl px-4 py-3 text-xs focus:border-green-400 outline-none transition-all h-24" required></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <input v-model="form.start_time" type="datetime-local" class="bg-black/40 border border-gray-900 rounded-xl px-4 py-3 text-xs focus:border-green-400 outline-none">
            <input v-model="form.end_time" type="datetime-local" class="bg-black/40 border border-gray-900 rounded-xl px-4 py-3 text-xs focus:border-green-400 outline-none">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <input v-model="form.capacity" type="number" placeholder="Kapasitas" class="bg-black/40 border border-gray-900 rounded-xl px-4 py-3 text-xs focus:border-green-400 outline-none">
            <input v-model="form.price" type="number" placeholder="Harga" class="bg-black/40 border border-gray-900 rounded-xl px-4 py-3 text-xs focus:border-green-400 outline-none">
          </div>

          <div class="flex gap-3 mt-8">
            <button type="button" @click="showModal = false" class="flex-1 py-4 bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-gray-800">Cancel</button>
            <button type="submit" class="flex-1 py-4 bg-green-400 text-black rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-green-500">
              {{ isEdit ? 'Simpan Perubahan' : 'Publish Sesi' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../../utils/api'

// --- STATE ---
const sessions = ref([])
const loading = ref(true)
const loadingSubmit = ref(false)
const showModal = ref(false)
const isEdit = ref(false)
const currentId = ref(null)

// --- DATA USER & ROLE ---
const userData = JSON.parse(localStorage.getItem('user') || '{}')
const isAdmin = computed(() => userData.role?.toLowerCase() === 'admin')

// --- FORM DATA (Sesuai Controller baris 24) ---
const form = ref({
  title: '',
  description: '', 
  start_time: '',
  end_time: '',
  capacity: 10,
  price: 0,
  location_id: 1
})

// --- LOGIKA STATS (Sesuai request lu) ---
const upcomingCount = computed(() => {
  const now = new Date()
  return sessions.value.filter(s => new Date(s.start_time) > now).length
})

const totalCapacity = computed(() => {
  return sessions.value.reduce((acc, curr) => acc + (Number(curr.capacity) || 0), 0)
})

// --- METHODS ---
const fetchData = async () => {
  loading.value = true
  try {
    const res = await api.get('/sessions')
    sessions.value = res.data.data || []
  } catch (err) {
    console.error("Fetch Error:", err)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  loadingSubmit.value = true
  const start = form.value.start_time.replace('T', ' ') + ':00'
  const end = form.value.end_time.replace('T', ' ') + ':00'

  try {
    if (isEdit.value) {
      // PUT: Hanya update title, start, end, price (Controller baris 63)
      const payloadUpdate = {
        title: form.value.title,
        start_time: start,
        end_time: end,
        price: Number(form.value.price)
      }
      await api.put(`/sessions/${currentId.value}`, payloadUpdate)
    } else {
      // POST: Kirim semua field termasuk description (Controller baris 24)
      const payloadCreate = {
        trainer_id: Number(userData.id), 
        location_id: Number(form.value.location_id),
        title: form.value.title,
        description: form.value.description, 
        start_time: start,
        end_time: end,
        capacity: Number(form.value.capacity),
        price: Number(form.value.price)
      }
      await api.post('/sessions', payloadCreate)
    }
    showModal.value = false
    fetchData()
    alert('Session successfully processed!')
  } catch (err) {
    alert("Gagal: " + (err.response?.data?.message || "Cek koneksi atau role lu"))
  } finally {
    loadingSubmit.value = false
  }
}

const deleteSession = async (id) => {
  if (!isAdmin.value) return 
  if (!confirm('Yakin ingin menghapus sesi ini? Hanya Admin yang diizinkan sesuai aturan backend.')) return
  try {
    await api.delete(`/sessions/${id}`)
    fetchData()
    alert('Session deleted successfully.')
  } catch (err) {
    alert("Gagal: " + (err.response?.data?.message || "Hanya Admin yang bisa."))
  }
}

const openEditModal = (session) => {
  isEdit.value = true
  currentId.value = session.id
  const s = session.start_time ? new Date(session.start_time).toISOString().slice(0, 16) : ''
  const e = session.end_time ? new Date(session.end_time).toISOString().slice(0, 16) : ''
  form.value = { ...session, start_time: s, end_time: e }
  showModal.value = true
}

const openCreateModal = () => {
  isEdit.value = false
  form.value = { title: '', description: '', start_time: '', end_time: '', capacity: 10, price: 0, location_id: 1 }
  showModal.value = true
}

onMounted(fetchData)

// Formatters
const formatTime = (d) => d ? new Date(d).toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'}) : '--'
const formatDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', {day:'numeric', month:'short'}) : '--'
</script>

<style scoped>
/* Tambahkan custom font atau styling tambahan di sini jika perlu */
</style>