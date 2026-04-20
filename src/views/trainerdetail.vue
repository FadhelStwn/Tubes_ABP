<script setup>
import { useRoute } from 'vue-router'
import { useTrainerStore } from '../stores/trainer'

const route = useRoute()
const store = useTrainerStore()

const trainer = store.getTrainerById(route.params.id)
</script>

<template>
  <div class="bg-black text-white min-h-screen pt-32">

    <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

      <!-- FOTO -->
      <div>
        <img 
          :src="trainer.img"
          class="rounded-lg shadow-lg w-full object-cover h-[500px] hover:scale-105 transition duration-500"
        />
      </div>

      <!-- INFO -->
      <div>
        
        <h1 class="text-4xl font-bold mb-4">
          About <span class="text-green-400">Trainer</span>
        </h1>
        <div class="w-40 h-1 bg-green-400 mb-4"></div>

        <p class="text-gray-400 mb-6">
          Trainer profesional yang siap membantu kamu mencapai tujuan fitness
          dengan metode latihan yang tepat dan terarah.
        </p>

        <!-- DETAIL -->
        <div class="space-y-3 text-sm">

            <p><span class="text-gray-400">Nama:</span> {{ trainer.name }}</p>

            <p><span class="text-gray-400">Spesialis:</span> {{ trainer.role }}</p>

            <p><span class="text-gray-400">Pengalaman:</span> {{ trainer.experience }}</p>

            <p><span class="text-gray-400">Lokasi:</span> {{ trainer.address }}</p>

            <p><span class="text-gray-400">Email:</span> {{ trainer.email }}</p>

            <p><span class="text-gray-400">No HP:</span> {{ trainer.phone }}</p>

        </div>

        <!-- STATS -->
         
        <div class="mt-6">
          <p class="text-green-400 font-semibold text-lg">
            {{ trainer.totalClients }}+ Client ditangani
          </p>
        </div>

        <!-- BUTTON -->
        <button 
          class="mt-6 bg-green-500 px-6 py-3 rounded-full text-black font-semibold hover:bg-green-400 transition"
        >
          Booking Sekarang
        </button>

      </div>

    </div>

  </div>
</template>