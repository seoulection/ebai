import { routes } from '@/router/index'
import VueRouter from 'vue-router'

export const mockRouter = (localVue) => {
  localVue.use(VueRouter)
  return new VueRouter({
    mode: 'abstract',
    routes: routes
  })
}

export const resolvePromise = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
}