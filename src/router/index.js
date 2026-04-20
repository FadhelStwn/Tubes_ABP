import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Trainer from '../views/Trainer.vue'
import TrainerDetail from '../views/TrainerDetail.vue'
import Profile from '../views/Profile.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/trainer', component: Trainer },
  { path: '/trainer/:id', component: TrainerDetail },
  { path: '/profile', component: Profile }
]

export default createRouter({
  history: createWebHistory(),
  routes,
})