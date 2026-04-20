<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header class="fixed top-4 left-0 w-full z-50">

    <div class="max-w-6xl mx-auto px-6">
      <nav
        class="flex items-center justify-between
               px-6 py-3
               bg-white/10 backdrop-blur-md
               border border-white/20
               rounded-full shadow-md"
      >

        <!-- LOGO -->
        <h1 class="text-white font-semibold text-lg tracking-wide">
          GYMBUDDY
        </h1>

        <!-- RIGHT SIDE -->
        <div class="flex items-center gap-2">

          <!-- MENU -->
          <ul class="flex gap-8 text-white text-sm mr-4">

            <li>
              <router-link
                to="/"
                :class="route.path === '/' 
                  ? 'text-green-400 font-semibold' 
                  : 'hover:text-gray-300 transition'"
              >
                Beranda
              </router-link>
            </li>

            <li>
              <router-link
                to="/about"
                :class="route.path === '/about' 
                  ? 'text-green-400 font-semibold' 
                  : 'hover:text-gray-300 transition'"
              >
                Tentang Kami
              </router-link>
            </li>

            <li>
              <router-link
                to="/trainer"
                :class="route.path === '/trainer' 
                  ? 'text-green-400 font-semibold' 
                  : 'hover:text-gray-300 transition'"
              >
                Personal Trainer
              </router-link>
            </li>

          </ul>

          <!-- LOGIN BUTTON -->
          <router-link 
            to="/login"
            :class="route.path === '/LoginView'"
            class="px-4 py-1 border border-white rounded-full text-white text-sm hover:bg-white hover:text-black transition inline-block text-center"
          >
              Log in
            </router-link>

        </div>

      </nav>
    </div>

  </header>
</template>