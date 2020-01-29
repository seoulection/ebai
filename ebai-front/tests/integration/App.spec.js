import { createLocalVue, mount } from '@vue/test-utils'
import App from '@/App'
import NavigationBar from '@/components/NavigationBar'
import { mockRouter, resolvePromise } from '../helpers/helpers.js'

describe('App.vue', () => {
  describe('emitting events', () => {
    it('logs the user out', async () => {
      const localVue = createLocalVue()
      const router = mockRouter(localVue)
      const wrapper = mount(App, {
        localVue,
        router
      })

      const navigationBar = wrapper.find(NavigationBar)
      navigationBar.vm.$emit('logoutClicked')
      await resolvePromise()
      // run a function based on the emitted event
      // function will make axios request to backend (mock)
      // response will be OK -> redirect to homepage
      console.log(wrapper)
      // expect(wrapper.vm.).toBe('home')
    })
  })
})