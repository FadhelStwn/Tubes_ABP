<script setup>
import Navbar from './components/navbar.vue'
import Footer from './components/footer.vue'
import TrainerSidebar from './components/TrainerSidebar.vue' // Import sidebar baru
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// 1. Cek apakah ini area Dashboard (Member atau Trainer)
const isDashboardArea = computed(() => {
  return route.path.startsWith('/dashboard') || route.path.startsWith('/trainer-panel')
})

// 2. Cek spesifik Trainer Panel
const isTrainerPanel = computed(() => route.path.startsWith('/trainer-panel'))

// 3. Cek spesifik Member Panel
const isMemberPanel = computed(() => route.path.startsWith('/dashboard'))
</script>

<template>
  <Navbar v-if="!isDashboardArea" />

  <div :class="{ 'flex min-h-screen bg-[#0a0b10]': isDashboardArea }">
    <TrainerSidebar v-if="isTrainerPanel" />
    <DashboardSidebar v-else-if="isMemberPanel" />

    <div :class="{ 'flex-grow w-full overflow-y-auto': isDashboardArea }">
      <router-view />
    </div>
  </div>

  <Footer v-if="!isDashboardArea" />
</template>