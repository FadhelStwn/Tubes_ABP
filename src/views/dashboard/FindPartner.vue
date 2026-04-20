<script setup>
import { ref, computed } from 'vue'

const searchTerm = ref('')
const goalFilter = ref('all')
const connectedFilter = ref('all')

const partners = ref([
  {
    id: 1,
    name: "Alex Johnson",
    image: "AJ",
    goal: "Muscle Gain",
    experience: "Intermediate",
    location: "Downtown Gym",
    schedule: "Mon, Wed, Fri - Morning",
    connected: false,
  },
  {
    id: 2,
    name: "Sarah Chen",
    image: "SC",
    goal: "Weight Loss",
    experience: "Beginner",
    location: "FitZone Studio",
    schedule: "Tue, Thu - Evening",
    connected: false,
  },
  {
    id: 3,
    name: "Michael Brown",
    image: "MB",
    goal: "Strength Training",
    experience: "Advanced",
    location: "PowerHouse Gym",
    schedule: "Mon, Tue, Thu - Morning",
    connected: true,
  },
]) 
const filteredPartners = computed(() => {
  return partners.value.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      p.goal.toLowerCase().includes(searchTerm.value.toLowerCase())

    const matchGoal =
      goalFilter.value === 'all' || p.goal === goalFilter.value

    const matchStatus =
      connectedFilter.value === 'all' ||
      (connectedFilter.value === 'connected' && p.connected) ||
      (connectedFilter.value === 'available' && !p.connected)

    return matchSearch && matchGoal && matchStatus
  })
})

const connectedCount = computed(() =>
  partners.value.filter(p => p.connected).length
)

import DashboardSidebar from '../../components/DashboardSidebar.vue'
</script> 

<template>
  <div class="p-10 text-white bg-black min-h-screen">

    <!-- TITLE -->
    <h1 class="text-4xl font-bold mb-2">
      FIND GYM PARTNERS
    </h1>
    <p class="text-gray-600 mb-8">
      Connect with like-minded fitness enthusiasts
    </p>

    <!-- STATS -->
    <div class="grid md:grid-cols-2 gap-6 mb-10">

      <div class="p-6 rounded-xl bg-green-400/10 border border-green-400/20">
        <h2 class="text-3xl font-bold text-green-400">
          {{ connectedCount }}
        </h2>
        <p class="text-gray-600">Connected Partners</p>
      </div>

      <div class="p-6 rounded-xl bg-green-400/10 border border-green-400/20">
        <h2 class="text-3xl font-bold text-green-400">
          {{ partners.length - connectedCount }}
        </h2>
        <p class="text-gray-600">Available</p>
      </div>

    </div>

    <!-- FILTER -->
    <div class="grid md:grid-cols-3 gap-4 mb-10">

      <input
        v-model="searchTerm"
        placeholder="Search..."
        class="p-3 rounded bg-zinc-900 border border-gray-700"
      />

      <select v-model="goalFilter" class="p-3 rounded bg-zinc-900 border border-gray-700">
        <option value="all">All Goals</option>
        <option>Muscle Gain</option>
        <option>Weight Loss</option>
      </select>

      <select v-model="connectedFilter" class="p-3 rounded bg-zinc-900 border border-gray-700">
        <option value="all">All</option>
        <option value="connected">Connected</option>
        <option value="available">Available</option>
      </select>

    </div>

    <!-- GRID -->
    <div class="grid md:grid-cols-2 gap-6">

      <div
        v-for="partner in filteredPartners"
        :key="partner.id"
        class="p-6 rounded-xl bg-zinc-900 border border-gray-800 hover:border-green-400/50 transition"
      >

        <!-- HEADER -->
        <div class="flex gap-4 mb-4">
          <div class="w-14 h-14 bg-green-400 text-black flex items-center justify-center font-bold rounded-lg">
            {{ partner.image }}
          </div>

          <div>
            <h3 class="text-xl font-bold">{{ partner.name }}</h3>
            <p class="text-green-400 text-sm">{{ partner.experience }}</p>
          </div>
        </div>

        <!-- INFO -->
        <div class="text-sm space-y-1 text-gray-600 mb-4">
          <p><span class="text-white">Goal:</span> {{ partner.goal }}</p>
          <p>{{ partner.location }}</p>
          <p>{{ partner.schedule }}</p>
        </div>

        <!-- BUTTON -->
        <button
          class="w-full py-2 rounded font-semibold transition"
          :class="partner.connected
            ? 'bg-zinc-800 text-gray-400'
            : 'bg-green-400 text-black hover:bg-green-500'"
        >
          {{ partner.connected ? 'View Profile' : 'Connect' }}
        </button>

      </div>

    </div>

  </div>
</template>
