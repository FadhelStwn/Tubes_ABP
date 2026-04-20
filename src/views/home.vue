<template>
  <div class="relative min-h-screen">

    <!-- Background -->
    <div 
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('https://images.unsplash.com/photo-1554284126-aa88f22d8b74')"
    ></div>

    <div class="absolute inset-0 bg-black/70"></div>

    <!-- Content -->
    <div class="relative z-10 flex items-center h-screen">

      <!-- CONTAINER (INI KUNCI PROFESIONAL) -->
      <div class="max-w-6xl mx-auto px-6 w-full">

        <div class="max-w-2xl text-white">

          <h1 class="text-5xl font-bold leading-tight">
            WORKING OUT IS EASIER <br />
            WHEN YOU’RE NOT ALONE
          </h1>

          <p class="mt-4 text-gray-300">
            Temukan partner, jaga konsistensi.
          </p>

          <button 
            class="mt-6 bg-green-500 px-6 py-3 rounded-full
                   font-semibold hover:bg-green-600 transition">
            Gabung Sekarang
          </button>

        </div>

      </div>

    </div>

  </div>

  <section class="bg-black text-white py-24">
  <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

    <!-- TEXT -->
    <div>
      <h2 class="text-3xl font-bold mb-4">
        WELCOME TO <span class="text-green-400">GYMBUDDY</span>
      </h2>

      <p class="text-gray-400 mb-6">
        Platform untuk menemukan partner gym dan meningkatkan konsistensi latihan.
        Kami membantu kamu tetap termotivasi dengan partner yang tepat.
      </p>

      <button class="bg-green-500 px-5 py-2 rounded hover:bg-green-600 transition">
        Read More
      </button>
    </div>

    <!-- IMAGE -->
    <div class="relative">
      <img
        src="/src/assets/home-content.jpg"
        class="rounded-lg"
      />

      <!-- FRAME EFFECT -->
      <div class="absolute -top-4 -right-4 w-full h-full border-4 border-green-400"></div>
    </div>

  </div>
</section>

<!-- ===== SECTION PROGRAMS ===== -->
<section class="bg-zinc-900 text-white py-24">
  <div class="max-w-6xl mx-auto px-6">

    <!-- TITLE -->
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold">
        OUR <span class="text-green-400">PROGRAMS</span>
      </h2>

      <p class="text-gray-400 mt-2">
        Pilih program yang sesuai dengan tujuan latihan kamu
      </p>
    </div>

    <!-- CARDS -->
    <div class="grid md:grid-cols-3 gap-6">

      <!-- CARD 1 -->
      <div class="relative group overflow-hidden rounded-lg">
        <img src="https://images.unsplash.com/photo-1599058917765-a780eda07a3e"
          class="w-full h-64 object-cover group-hover:scale-110 transition duration-500" />

        <div class="absolute inset-0 bg-black/60 flex items-end p-4">
          <h3 class="text-lg font-bold">Strength Training</h3>
        </div>
      </div>

      <!-- CARD 2 -->
      <div class="relative group overflow-hidden rounded-lg">
        <img src="https://images.unsplash.com/photo-1517963879433-6ad2b056d712"
          class="w-full h-64 object-cover group-hover:scale-110 transition duration-500" />

        <div class="absolute inset-0 bg-black/60 flex items-end p-4">
          <h3 class="text-lg font-bold">Personal Trainer</h3>
        </div>
      </div>

      <!-- CARD 3 -->
      <div class="relative group overflow-hidden rounded-lg">
        <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b"
          class="w-full h-64 object-cover group-hover:scale-110 transition duration-500" />

        <div class="absolute inset-0 bg-black/60 flex items-end p-4">
          <h3 class="text-lg font-bold">Cardio & Fitness</h3>
        </div>
      </div>

    </div>

  </div>
</section>
</template>