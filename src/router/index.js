import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Trainer from '../views/Trainer.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/register.vue'
import TrainerDetail from '../views/TrainerDetail.vue'

// Dashboard views
import DashboardView from '../views/dashboard/DashboardView.vue'
import FindTrainers from '../views/dashboard/FindTrainers.vue'
import MyBookings from '../views/dashboard/MyBookings.vue'
import PricingView from '../views/dashboard/PricingView.vue'
import progres from '../views/dashboard/Progres.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/trainer', component: Trainer },
  { path: '/login', component: Login},
  { path: '/register', component: Register},
  { path: '/trainer/:id', component: TrainerDetail },

  // Dashboard routes
  { path: '/dashboard', component: DashboardView },
  { path: '/dashboard/find-trainers', component: FindTrainers },
  { path: '/dashboard/my-bookings', component: MyBookings },
  { path: '/dashboard/pricingview', component: PricingView},
  { path: '/dashboard/progres', component: progres },
  { path: '/dashboard/profile', component: () => import('../views/dashboard/profile.vue') },
  { path: '/dashboard/profile/edit/:id', component: () => import('../views/dashboard/EditProfileView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// --- BAGIAN SATPAM (Navigation Guard) ---
// Ini ditaruh tepat sebelum "export default router"
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')

  // Cek apakah halaman yang dituju adalah bagian dari dashboard
  if (to.path.startsWith('/dashboard') && !isAuthenticated) {
    alert("Maaf, silakan login terlebih dahulu!")
    next('/login')
  } 
  // Jika sudah login, dilarang balik ke halaman login/register
  else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    next('/dashboard')
  }
  else {
    next()
  }
})

// PERBAIKAN: Export variabel 'router' yang sudah dipasangi satpam
export default router