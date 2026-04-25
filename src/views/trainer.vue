<script setup>
import { useTrainerStore } from '../stores/trainer'

const store = useTrainerStore()
const trainers = store.trainers
</script>

<template>
        <!-- ================= HERO ================= -->
    <section class="relative h-[60vh] flex items-center justify-center text-center text-white">

      <div 
        class="absolute inset-0 bg-cover bg-center bg-[position:10%_28%]"
        style="background-image: url('/src/assets/trainer-bg.jpg')"></div>

      <div class="absolute inset-0 bg-black/70"></div>

      <div class="relative z-10">
        <h1 class="text-4xl md:text-5xl font-bold">
          Personal Trainer GymBuddy
        </h1>
        <p class="text-gray-400 mt-2">Fitness Trainer / Personal Trainer</p>
      </div>

    </section>

  <div class="bg-black text-white min-h-screen">

    <section class="py-20">
  <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

    <!-- IMAGE -->
    <div>
      <img 
        src="/src/assets/trainer-conten.jpg"
        class="rounded-lg shadow-lg w-full object-cover h-[500px]"
      />
    </div>

    <!-- TEXT -->
    <div>

      <h2 class="text-3xl font-bold mb-6 leading-tight">
        Nge-gym lebih efektif bareng 
        <span class="text-green-400">Personal Trainer!</span>
      </h2>

      <p class="text-gray-400 mb-4 leading-relaxed">
        Setiap orang memiliki tujuan fitness yang berbeda, tapi tidak semua orang tahu
        cara yang tepat untuk mencapainya. Personal Trainer kami hadir untuk membantu
        mengarahkan setiap langkah latihanmu agar lebih terstruktur dan efektif.
      </p>

      <p class="text-gray-400 mb-4 leading-relaxed">
        Dengan pengalaman profesional dan terpercaya, trainer kami mampu
        menyusun program latihan yang sesuai dengan kebutuhanmu, sekaligus memberikan
        motivasi agar kamu tetap konsisten.
      </p>

      <p class="text-gray-400 mb-4 leading-relaxed">
        Setiap perkembangan latihanmu akan dipantau secara berkala, sehingga kamu bisa
        memahami progres tubuhmu dan membangun kepercayaan diri di setiap sesi latihan.
      </p>

      <p class="text-gray-400 leading-relaxed">
        Bersama GymBuddy, kamu bisa mencapai hasil yang lebih maksimal dalam waktu
        yang lebih efisien.
      </p>

    </div>

  </div>
</section>

    <!-- ===== TITLE ===== -->
    <section class="pt-32 pb-16 text-center">
      <h1 class="text-4xl font-bold">
        Temukan <span class="text-green-400">Personal Trainer</span> terbaik untukmu
      </h1>
      <p class="text-gray-400 mt-2">
        Temukan trainer terbaik sesuai kebutuhanmu
      </p>
    </section>

    <!-- ===== GRID TRAINER ===== -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        <!-- CARD -->
        <div 
          v-for="trainer in trainers" 
          :key="trainer.id"
          class="bg-zinc-900 rounded-lg overflow-hidden group hover:scale-105 transition"
        >

          <!-- IMAGE -->
          <div class="overflow-hidden">
            <img 
              :src="trainer.img"
              class="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
            />
          </div>

          <!-- CONTENT -->
          <div class="p-5 text-center">

            <h3 class="text-lg font-semibold">
              {{ trainer.name }}
            </h3>

            <p class="text-green-400 text-sm mb-4">
              {{ trainer.role }}
            </p>

            <router-link
            :to="`/trainer/${trainer.id}`"
              class="px-4 py-2 border border-green-400 text-green-400 
                     rounded-full text-sm hover:bg-green-400 hover:text-black transition"
            >
              View Profile
            </router-link>

          </div>

        </div>

      </div>
    </section>

  </div>
</template>