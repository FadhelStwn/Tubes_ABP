<template>
  <div class="flex min-h-screen bg-black selection:bg-green-400 selection:text-black">
    <DashboardSidebar />

    <main class="flex-grow p-10 text-white overflow-y-auto">
      <header class="mb-10">
        <h2 class="text-3xl font-black uppercase tracking-tighter text-white">My Bookings</h2>
        <p class="text-gray-500 text-sm mt-1">Manage your training sessions and track your history.</p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div class="bg-[#0f172a]/40 border border-blue-500/20 p-6 rounded-[2rem] shadow-xl">
          <p class="text-3xl font-black text-blue-400">3</p>
          <p class="text-[10px] uppercase font-bold text-gray-500 tracking-widest mt-1">Upcoming Sessions</p>
        </div>
        <div class="bg-[#061a14]/40 border border-green-500/20 p-6 rounded-[2rem] shadow-xl">
          <p class="text-3xl font-black text-green-400">2</p>
          <p class="text-[10px] uppercase font-bold text-gray-500 tracking-widest mt-1">Completed Sessions</p>
        </div>
        <div class="bg-[#1c130d]/40 border border-orange-500/20 p-6 rounded-[2rem] shadow-xl">
          <p class="text-3xl font-black text-orange-400">$135</p>
          <p class="text-[10px] uppercase font-bold text-gray-500 tracking-widest mt-1">Total Spent</p>
        </div>
      </div>

      <section class="mb-12">
        <h3 class="font-black uppercase text-xs tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-3">
          Upcoming Sessions <div class="h-[1px] flex-grow bg-gray-900"></div>
        </h3>
        
        <div class="space-y-4">
          <div v-for="booking in upcomingBookings" :key="booking.id" 
               class="bg-[#0f1115] p-5 rounded-3xl border border-gray-900 hover:border-green-400/20 transition-all group flex items-center justify-between">
            <div class="flex items-center gap-5">
              <div class="w-12 h-12 bg-green-400 rounded-2xl flex items-center justify-center text-black font-black text-sm">
                {{ booking.initials }}
              </div>
              <div>
                <h4 class="font-bold text-white group-hover:text-green-400 transition-colors">{{ booking.trainerName }}</h4>
                <div class="flex items-center gap-4 mt-1">
                  <span class="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-1">📅 {{ booking.date }}</span>
                  <span class="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-1">🕒 {{ booking.time }}</span>
                  <span class="text-[10px] text-green-400/80 font-bold uppercase flex items-center gap-1">💪 {{ booking.type }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-6">
              <div class="text-right">
                <p class="text-lg font-black text-white">${{ booking.price }}</p>
                <p class="text-[9px] text-green-500 font-bold uppercase tracking-tighter italic">● Confirmed</p>
              </div>
              <button class="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-all active:scale-95">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="font-black uppercase text-xs tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-3">
          Past Sessions <div class="h-[1px] flex-grow bg-gray-900"></div>
        </h3>
        
        <div class="space-y-4 opacity-70 hover:opacity-100 transition-opacity">
          <div v-for="past in pastBookings" :key="past.id" 
               class="bg-[#0a0a0a] p-5 rounded-3xl border border-gray-900 flex items-center justify-between grayscale-[0.5] hover:grayscale-0 transition-all">
            <div class="flex items-center gap-5">
              <div class="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 font-black text-sm border border-gray-700">
                {{ past.initials }}
              </div>
              <div>
                <h4 class="font-bold text-gray-300">{{ past.trainerName }}</h4>
                <p class="text-[10px] text-gray-600 font-bold uppercase mt-1">Completed on {{ past.date }} • {{ past.type }}</p>
              </div>
            </div>
            <div class="flex items-center gap-6">
              <p class="text-lg font-black text-gray-600">${{ past.price }}</p>
              <button class="bg-green-400/10 text-green-400 border border-green-400/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-green-400 hover:text-black transition-all">
                Book Again
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import DashboardSidebar from '../../components/DashboardSidebar.vue'

const upcomingBookings = [
  { id: 1, trainerName: 'David Martinez', initials: 'DM', date: '2026-04-15', time: '09:00 AM', type: 'Strength Training', price: 50 },
  { id: 2, trainerName: 'Lisa Anderson', initials: 'LA', date: '2026-04-16', time: '11:00 AM', type: 'HIIT Workout', price: 45 },
  { id: 3, trainerName: 'Chris Taylor', initials: 'CT', date: '2026-04-17', time: '02:00 PM', type: 'Weight Loss', price: 40 }
]

const pastBookings = [
  { id: 4, trainerName: 'David Martinez', initials: 'DM', date: '2026-04-12', type: 'Strength Training', price: 50 },
  { id: 5, trainerName: 'Nina Patel', initials: 'NP', date: '2026-04-10', type: 'Yoga & Flexibility', price: 55 }
]
</script>