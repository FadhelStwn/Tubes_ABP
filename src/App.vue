<script setup>
import Navbar from './components/navbar.vue'
import Footer from './components/footer.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <Navbar v-if="!$route.path.includes('dashboard')" />
  <router-view />
  <Footer v-if="!$route.path.includes('dashboard')" />
</template>