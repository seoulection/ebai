import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Success from '@/views/Success'
import Users from '@/views/Users'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/signup/success',
    name: 'success',
    component: Success
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
