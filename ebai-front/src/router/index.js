import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard'
import Home from '@/views/Home'
import Signup from '@/views/Signup'
import Success from '@/views/Success'
import Users from '@/views/Users'
import Auction from '@/views/Auction'
import CreateAuction from '@/views/CreateAuction'
import EditAuction from '@/views/EditAuction'

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
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/auctions/new',
    name: 'createAuction',
    component: CreateAuction
  },
  {
    path: '/auctions/:id/edit',
    name: 'editAuction',
    component: EditAuction
  },
  {
    path: '/auctions/:id',
    name: 'auction',
    component: Auction
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
