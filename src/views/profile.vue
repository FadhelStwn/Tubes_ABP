<script setup>
const user = {
  name: "Alex Johnson",
  email: "alex.johnson@gmail.com",
  phone: "+62 812-3456-7890",
  location: "Jakarta Selatan",
  isPremium: true,
  premiumUntil: "January 2027"
}

const stats = [
  { label: "Total Sessions", value: "42" },
  { label: "Hours Trained", value: "84" },
  { label: "Gym Partners", value: "8" },
  { label: "Achievements", value: "15" }
]
</script>

<template>
  <div class="bg-black text-white min-h-screen py-20">
    
    <!-- CONTAINER (INI YANG KAMU MAU KONSISTEN) -->
    <div class="max-w-6xl mx-auto px-6 space-y-8">

      <!-- ===== PROFILE CARD ===== -->
      <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">

        <!-- AVATAR -->
        <div class="w-28 h-28 rounded-xl bg-green-500 flex items-center justify-center text-3xl font-bold">
          AJ
        </div>

        <!-- INFO -->
        <div class="flex-1 text-center md:text-left">

          <div class="flex flex-col md:flex-row md:items-center gap-3 mb-3">
            <h1 class="text-3xl font-bold">{{ user.name }}</h1>

            <span 
              v-if="user.isPremium"
              class="text-xs px-3 py-1 bg-green-500/20 text-green-400 rounded-full"
            >
              PREMIUM
            </span>
          </div>

          <div class="space-y-1 text-gray-400 text-sm">
            <p>{{ user.email }}</p>
            <p>{{ user.phone }}</p>
            <p>{{ user.location }}</p>
          </div>

          <div class="mt-4 flex flex-col md:flex-row md:items-center gap-3">
            <button class="px-5 py-2 bg-green-500 hover:bg-green-400 text-black rounded-lg text-sm font-semibold transition">
              Edit Profile
            </button>

            <p class="text-sm text-gray-400">
              Premium sampai 
              <span class="text-green-400 font-medium">
                {{ user.premiumUntil }}
              </span>
            </p>
          </div>

        </div>
      </div>

      <!-- ===== STATS ===== -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">

        <div 
          v-for="stat in stats" 
          :key="stat.label"
          class="bg-zinc-900 border border-zinc-800 p-6 rounded-xl text-center"
        >
          <h2 class="text-2xl font-bold mb-1">
            {{ stat.value }}
          </h2>
          <p class="text-gray-400 text-sm">
            {{ stat.label }}
          </p>
        </div>

      </div>

      <!-- ===== TABS ===== -->
      <div class="border-b border-zinc-800 flex gap-6 text-sm">
        <button class="pb-3 text-green-400 border-b-2 border-green-400">
          Overview
        </button>
        <button class="pb-3 text-gray-400 hover:text-white">
          Booking History
        </button>
        <button class="pb-3 text-gray-400 hover:text-white">
          Workouts
        </button>
      </div>

      <!-- ===== CONTENT ===== -->
      <div class="grid md:grid-cols-2 gap-6">

        <div class="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
          <h2 class="font-bold mb-4">Recent Bookings</h2>
          <p class="text-gray-400 text-sm">Belum ada data</p>
        </div>

        <div class="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
          <h2 class="font-bold mb-4">Recent Workouts</h2>
          <p class="text-gray-400 text-sm">Belum ada data</p>
        </div>

      </div>

    </div>
  </div>
</template>