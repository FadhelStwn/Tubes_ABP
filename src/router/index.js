import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Trainer from '../views/Trainer.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/register.vue'
import TrainerDetail from '../views/TrainerDetail.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/trainer', component: Trainer },
  { path: '/login', component: Login},
  { path: '/register', component: Register},
  { path: '/trainer/:id', component: TrainerDetail },

]

export default createRouter({
  history: createWebHistory(),
  routes,
})