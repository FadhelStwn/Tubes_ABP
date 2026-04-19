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
        <p class="text-gray-400 mt-2">Home / About</p>
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
            <li>✔ Trainer bersertifikasi</li>
            <li>✔ Jadwal fleksibel</li>
            <li>✔ Booking mudah</li>
          </ul>
        </div>

        <!-- IMAGE -->
        <div>
          <img 
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
            class="rounded-lg"
          />
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
          Fitur pencarian partner kami dirancang untuk menciptakan lingkungan yang aman,
          positif, dan saling mendukung.
        </p>

      </div>
    </section>

    <!-- ================= TRAINERS ================= -->
    <section class="bg-zinc-900 py-20">
      <div class="max-w-6xl mx-auto px-6">

        <h2 class="text-3xl font-bold text-center mb-12">
          Meet Our Trainers
        </h2>

        <div class="grid md:grid-cols-3 gap-8">

          <!-- CARD 1 -->
          <div class="bg-black p-6 rounded-lg text-center">
            <img 
              src="https://images.unsplash.com/photo-1594737625785-c9e27c0c3b5e"
              class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 class="font-semibold text-lg">Alex Carter</h3>
            <p class="text-green-400 text-sm">Strength Coach</p>
            <p class="text-gray-400 text-sm mt-3 italic">
              "Consistency beats intensity."
            </p>
          </div>

          <!-- CARD 2 -->
          <div class="bg-black p-6 rounded-lg text-center">
            <img 
              src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74"
              class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 class="font-semibold text-lg">Sarah Lee</h3>
            <p class="text-green-400 text-sm">Fat Loss Expert</p>
            <p class="text-gray-400 text-sm mt-3 italic">
              "Stay disciplined, results will follow."
            </p>
          </div>

          <!-- CARD 3 -->
          <div class="bg-black p-6 rounded-lg text-center">
            <img 
              src="https://images.unsplash.com/photo-1526401485004-2fa806b7f9b4"
              class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 class="font-semibold text-lg">Michael Tan</h3>
            <p class="text-green-400 text-sm">Yoga Specialist</p>
            <p class="text-gray-400 text-sm mt-3 italic">
              "Balance your body and mind."
            </p>
          </div>

        </div>

      </div>
    </section>

  </div>
</template>