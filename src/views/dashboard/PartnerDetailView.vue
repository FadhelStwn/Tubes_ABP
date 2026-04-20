<template>
  <div class="flex min-h-screen bg-[#0a0b10] text-white selection:bg-green-400 selection:text-black">
    <DashboardSidebar />
    
    <main class="flex-grow p-10 overflow-y-auto">
      <button 
        @click="$router.back()" 
        class="mb-8 flex items-center gap-2 text-gray-600 hover:text-green-400 transition-all font-black uppercase text-[10px] tracking-[0.2em] group"
      >
        <span class="group-hover:-translate-x-1 transition-transform">⬅️</span> Back to Partners
      </button>

      <div class="bg-[#161920] rounded-[3rem] border border-gray-900 overflow-hidden shadow-2xl flex flex-col md:flex-row p-10 gap-16 relative">
        <div class="absolute inset-0 opacity-5 pointer-events-none" 
             style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 30px 30px;"></div>

        <div class="md:w-1/3 relative z-10">
          <div class="aspect-square rounded-[2.5rem] overflow-hidden border-4 border-gray-800 shadow-2xl group">
            <div v-if="!partner.image" class="w-full h-full bg-green-400 flex items-center justify-center text-black font-black text-6xl italic">
              {{ partner.initials }}
            </div>
            <img v-else :src="partner.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
          </div>
          
          <div class="mt-6 flex justify-center">
            <span class="bg-green-400/10 text-green-400 text-[10px] font-black px-4 py-2 rounded-xl border border-green-400/20 uppercase tracking-widest italic">
              🔥 {{ partner.level || 'Enthusiast' }}
            </span>
          </div>
        </div>

        <div class="md:w-2/3 flex flex-col justify-center relative z-10">
          <h1 class="text-5xl font-black mb-2 tracking-tighter italic uppercase text-white">
            About <span class="text-green-400">Partner</span>
          </h1>
          <div class="w-20 h-1.5 bg-green-400 mb-10 rounded-full"></div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 mb-12">
            <div class="flex flex-col border-l-2 border-gray-800 pl-4 hover:border-green-400 transition-colors">
              <span class="text-[9px] font-black uppercase text-gray-600 tracking-[0.2em] mb-1">Full Name</span>
              <span class="text-xl font-bold text-gray-200">{{ partner.name }}</span>
            </div>

            <div class="flex flex-col border-l-2 border-gray-800 pl-4 hover:border-green-400 transition-colors">
              <span class="text-[9px] font-black uppercase text-gray-600 tracking-[0.2em] mb-1">Email Address</span>
              <span class="text-lg font-bold text-gray-400">{{ partner.email }}</span>
            </div>

            <div class="flex flex-col border-l-2 border-gray-800 pl-4 hover:border-green-400 transition-colors">
              <span class="text-[9px] font-black uppercase text-gray-600 tracking-[0.2em] mb-1">Phone Number</span>
              <span class="text-lg font-bold text-gray-200">{{ partner.phone }}</span>
            </div>

            <div class="flex flex-col border-l-2 border-gray-800 pl-4 hover:border-green-400 transition-colors">
              <span class="text-[9px] font-black uppercase text-gray-600 tracking-[0.2em] mb-1">Location</span>
              <span class="text-lg font-bold text-gray-200">{{ partner.location }}</span>
            </div>

            <div class="flex flex-col border-l-2 border-gray-800 pl-4 hover:border-green-400 transition-colors">
              <span class="text-[9px] font-black uppercase text-gray-600 tracking-[0.2em] mb-1">Weight</span>
              <span class="text-xl font-black text-white italic">{{ partner.weight }} <span class="text-xs text-gray-600">KG</span></span>
            </div>

            <div class="flex flex-col border-l-2 border-gray-800 pl-4 hover:border-green-400 transition-colors">
              <span class="text-[9px] font-black uppercase text-gray-600 tracking-[0.2em] mb-1">Height</span>
              <span class="text-xl font-black text-white italic">{{ partner.height }} <span class="text-xs text-gray-600">CM</span></span>
            </div>
          </div>

          <div class="flex items-center gap-6">
            <button class="bg-green-400 text-black px-12 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-green-300 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-green-400/20">
              Connect Now
            </button>
            <p class="text-[10px] text-gray-600 font-bold italic max-w-[200px]">
              Ready to crush the goals together? Click to send a request.
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DashboardSidebar from '../../components/DashboardSidebar.vue'

const route = useRoute()
const partner = ref({
  name: '',
  initials: '',
  email: '',
  phone: '',
  location: '',
  weight: 0,
  height: 0,
  level: ''
})

onMounted(() => {
  const partnerId = route.params.id
  
  // Simulasi pengambilan data. Nantinya ini dari database/API.
  const dummyData = [
    { 
      id: 1, name: 'Alex Johnson', initials: 'AJ', 
      email: 'alex.j@gymbuddy.com', phone: '+62 812-3456-7890', 
      location: 'Downtown Gym', weight: 78, height: 182, level: 'Intermediate' 
    },
    { 
      id: 2, name: 'Sarah Chen', initials: 'SC', 
      email: 'sarah.c@gymbuddy.com', phone: '+62 812-9876-5432', 
      location: 'FitZone Studio', weight: 55, height: 165, level: 'Beginner' 
    }
  ]

  const found = dummyData.find(p => p.id == partnerId)
  if (found) {
    partner.value = found
  }
})
</script>