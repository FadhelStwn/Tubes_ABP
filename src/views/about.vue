<script setup>
import aboutImg from '../assets/about-conten.jpg'
</script>

<template>
  <div class="bg-black text-white">

    <!-- ================= HERO ================= -->
    <section class="relative h-[60vh] flex items-center justify-center text-center">

      <div 
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438')"
      ></div>

      <div class="absolute inset-0 bg-black/70"></div>

      <div class="relative z-10">
        <h1 class="text-4xl md:text-5xl font-bold">
          About GymBuddy
        </h1>
        <p class="text-gray-400 mt-2">About / Tentang Kami</p>
      </div>

    </section>

    <!-- ================= MASALAH & SOLUSI ================= -->
    <section class="py-20">
      <div class="max-w-6xl mx-auto px-6 text-center">

        <h2 class="text-3xl font-bold mb-6">
          Why <span class="text-green-400">GymBuddy</span> Exists
        </h2>

        <p class="text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Banyak orang memulai gym dengan semangat tinggi, tetapi berhenti di tengah jalan.
          Tanpa arahan yang tepat atau partner latihan, motivasi perlahan menghilang.
        </p>

        <p class="text-gray-400 mt-4 max-w-3xl mx-auto leading-relaxed">
          <span class="text-green-400 font-semibold">GymBuddy</span> hadir untuk menghubungkan
          kamu dengan trainer profesional dan partner latihan yang tepat, agar perjalanan fitness
          kamu tetap konsisten dan menyenangkan.
        </p>

      </div>
    </section>

    <!-- ================= BOOKING SYSTEM ================= -->
    <section class="bg-zinc-900 py-20">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        <!-- TEXT -->
        <div>
          <h2 class="text-3xl font-bold mb-4">
            Easy & Flexible Booking
          </h2>

          <p class="text-gray-400 mb-4">
            Semua trainer di GymBuddy telah melalui proses verifikasi dan memiliki
            sertifikasi profesional untuk memastikan kualitas latihan terbaik.
          </p>

          <p class="text-gray-400 mb-6">
            Kamu bisa memilih jadwal, trainer, dan program latihan yang sesuai
            dengan gaya hidupmu — fleksibel dan tanpa ribet.
          </p>

          <ul class="space-y-2 text-sm text-gray-300">
            <li>✔ Trainer berkompeten</li>
            <li>✔ Jadwal fleksibel</li>
            <li>✔ Booking mudah</li>
          </ul>
        </div>

        <!-- IMAGE -->
        <div>
          <img :src="aboutImg"
            class="rounded-lg brightness-50"/>
        </div>

      </div>
    </section>

    <!-- ================= COMMUNITY ================= -->
    <section class="py-20">
      <div class="max-w-6xl mx-auto px-6 text-center">

        <h2 class="text-3xl font-bold mb-6">
          The <span class="text-green-400">Buddy System</span>
        </h2>

        <p class="text-gray-400 max-w-3xl mx-auto mb-4">
          GymBuddy bukan hanya tentang latihan, tetapi tentang membangun koneksi.
          Kami percaya bahwa latihan bersama akan menciptakan motivasi yang lebih kuat.
        </p>

        <p class="text-gray-400 max-w-3xl mx-auto">
          Fitur pencarian kami dirancang untuk memberikan solusi untuk kamu yang malu memulai olahraga sendirian dan bisa mendukung satu sama lain.
        </p>

      </div>
    </section>

  </div>
</template>