<template>
  <footer class="bg-[#121212] text-gray-400 pt-16 pb-8">

    <div class="max-w-6xl mx-auto px-6">

      <!-- TOP GRID -->
      <div class="grid md:grid-cols-4 gap-10 mb-10">

        <!-- BRAND -->
        <div>
          <h2 class="text-white text-lg font-bold mb-4">
            GYMBUDDY
          </h2>
          <p class="text-sm">
            Temukan partner gym dan tingkatkan konsistensi latihan kamu.
          </p>
        </div>

        <!-- MENU -->
        <div>
          <h3 class="text-white font-semibold mb-4">Menu</h3>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/" class="hover:text-white">Home</router-link></li>
            <li><router-link to="/about" class="hover:text-white">About</router-link></li>
          </ul>
        </div>

        <!-- SERVICES -->
        <div>
          <h3 class="text-white font-semibold mb-4">Services</h3>
          <ul class="space-y-2 text-sm">
            <li>Find Gym Partner</li>
            <li>Personal Trainer</li>
            <li>Workout Program</li>
          </ul>
        </div>

        <!-- CONTACT -->
        <div>
          <h3 class="text-white font-semibold mb-4">Contact</h3>
          <ul class="space-y-2 text-sm">
            <li>Email: gymbuddy@email.com</li>
            <li>Phone: +62 812 3456 7890</li>
          </ul>
        </div>

      </div>

      <!-- BOTTOM -->
      <div class="border-t border-white/10 pt-6 text-center text-sm">
        © 2026 GymBuddy. All rights reserved.
      </div>

    </div>

  </footer>
</template>