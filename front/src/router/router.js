import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import UpdateProfil from '../views/UpdateProfil.vue'
import ProfilUser from '../views/ProfilUser.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login},
  { path: '/signup', component: Signup},
  { path: '/updateprofil', component: UpdateProfil},
  { path: '/profilUser/:id', component: ProfilUser }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
