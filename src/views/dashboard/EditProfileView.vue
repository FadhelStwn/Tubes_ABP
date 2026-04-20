<template>
  <div class="flex min-h-screen bg-[#0a0b10] text-white">
    <DashboardSidebar />

    <main class="flex-grow p-8 overflow-y-auto">
      <div class="flex items-center gap-4 mb-8">
        <router-link to="/dashboard/profile" class="w-10 h-10 bg-[#161920] border border-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-800 transition-all">
          <span class="text-sm">⬅️</span>
        </router-link>
        <div>
          <h2 class="text-2xl font-black uppercase tracking-tighter">Edit Profile</h2>
          <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Update your personal information</p>
        </div>
      </div>

      <div class="max-w-4xl">
        <div class="bg-[#161920] rounded-[2.5rem] border border-gray-900 overflow-hidden shadow-2xl">
          <div class="h-32 bg-gradient-to-r from-green-400/20 to-blue-400/20 border-b border-gray-800/50"></div>

          <div class="p-10 -mt-16">
            <div class="flex flex-col md:flex-row items-end gap-6 mb-10">
              <div class="w-32 h-32 bg-green-400 rounded-[2.5rem] border-4 border-[#161920] flex items-center justify-center text-black font-black text-4xl shadow-xl">
                AJ
              </div>
              <div class="pb-2">
                <button class="bg-white text-black px-5 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-200 transition-all">
                  Change Photo
                </button>
                <p class="text-[9px] text-gray-600 font-bold uppercase mt-2 tracking-wider italic">JPG, PNG or WEBP. Max 2MB</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Full Name</label>
                <input type="text" v-model="profile.name" class="w-full bg-black/40 border border-gray-800 p-4 rounded-2xl focus:ring-1 focus:ring-green-400 outline-none transition text-sm">
              </div>

              <div class="space-y-2">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Email Address</label>
                <input type="email" v-model="profile.email" class="w-full bg-black/40 border border-gray-800 p-4 rounded-2xl focus:ring-1 focus:ring-green-400 outline-none transition text-sm">
              </div>

              <div class="space-y-2">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Phone Number</label>
                <input type="text" v-model="profile.phone" class="w-full bg-black/40 border border-gray-800 p-4 rounded-2xl focus:ring-1 focus:ring-green-400 outline-none transition text-sm">
              </div>

              <div class="space-y-2">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Location</label>
                <input type="text" v-model="profile.location" class="w-full bg-black/40 border border-gray-800 p-4 rounded-2xl focus:ring-1 focus:ring-green-400 outline-none transition text-sm">
              </div>

              <div class="space-y-2">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Weight (kg)</label>
                <input type="number" v-model="profile.weight" class="w-full bg-black/40 border border-gray-800 p-4 rounded-2xl focus:ring-1 focus:ring-green-400 outline-none transition text-sm">
              </div>

              <div class="space-y-2">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Height (cm)</label>
                <input type="number" v-model="profile.height" class="w-full bg-black/40 border border-gray-800 p-4 rounded-2xl focus:ring-1 focus:ring-green-400 outline-none transition text-sm">
              </div>
            </div>

            <div class="flex items-center gap-4 mt-12 pt-8 border-t border-gray-800/50">
              <button @click="saveProfile" class="bg-green-400 text-black px-10 py-3.5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-green-300 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-green-400/10">
                Save Changes
              </button>
              <router-link to="/dashboard/profile" class="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                Cancel
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DashboardSidebar from '../../components/DashboardSidebar.vue'

const router = useRouter()

const profile = ref({
  name: 'Alex Johnson',
  email: 'alex.johnson@gmail.com',
  phone: '+62 812-3456-7890',
  location: 'Jakarta Selatan',
  weight: 75,
  height: 180
})

const saveProfile = () => {
  // Nantinya proses simpan ke database di sini
  alert('Profile updated successfully!')
  router.push('/dashboard/profile')
}
</script>