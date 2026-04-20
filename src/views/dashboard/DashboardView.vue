<template>
  <div class="flex min-h-screen bg-black">
    <DashboardSidebar />

    <main class="flex-grow p-10 text-white">
      <header class="mb-10">
        <h2 class="text-3xl font-bold uppercase text-white">Dashboard</h2>
        <p class="text-gray-400 mt-1">Welcome back! <span class="text-green-400">Keep it up.</span></p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-[#111111] p-6 rounded-3xl border border-gray-900">
          <p class="text-xs uppercase text-gray-500">Active Sessions</p>
          <p class="text-5xl font-black text-white mt-4">3</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import DashboardSidebar from '../../components/DashboardSidebar.vue'
</script>