import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Trainer from '../views/Trainer.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/trainer', component: Trainer },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})