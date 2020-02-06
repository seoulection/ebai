import { createLocalVue, mount } from '@vue/test-utils'
import App from '@/App'
import LoggedInNavigationLinks from '@/components/LoggedInNavigationLinks'
import LoggedOutNavigationLinks from '@/components/LoggedOutNavigationLinks'
import NavigationBar from '@/components/NavigationBar'
import { mockRouter, resolvePromise } from '../helpers/helpers.js'
import { logoutUser } from '@/api/users.js'

jest.mock('@/api/users.js')

describe('App.vue', () => {
  describe('emitting events', () => {
    it('logs the user out', async () => {
      const localVue = createLocalVue()
      const router = mockRouter(localVue)
      const wrapper = mount(App, {
        localVue,
        router
      })

      wrapper.setData({ isLoggedIn: true })
      logoutUser.mockResolvedValueOnce()
      const navigationBar = wrapper.find(NavigationBar)
      navigationBar.vm.logout()
      await resolvePromise()

      expect(wrapper.vm.$data.isLoggedIn).toBe(false)
      expect(navigationBar.find(LoggedInNavigationLinks).exists()).toBe(false)
      expect(navigationBar.find(LoggedOutNavigationLinks).exists()).toBe(true)
    })

    it('shows a modal when login is clicked', () =>{
      const localVue = createLocalVue()
      const router = mockRouter(localVue)
      const wrapper = mount(App, {
        localVue,
        router
      })
      wrapper.setData({ isLoggedIn: false, isModalVisible: false })
      wrapper.find('a[class="loginLink"]').trigger('click')

      expect(wrapper.vm.$data.isModalVisible).toBe(true)
      expect(wrapper.find('button[class="signin-btn"]').text()).toBe("Login")
    })

    it('closes the modal when X is clicked', () =>{
      const localVue = createLocalVue()
      const router = mockRouter(localVue)
      const wrapper = mount(App, {
        localVue,
        router
      })
      wrapper.setData({ isLoggedIn: false, isModalVisible: true })
      wrapper.find('button[class="close-btn"]').trigger('click')

      expect(wrapper.vm.$data.isModalVisible).toBe(false)
      expect(wrapper.find('button[class="signin-btn"]').exists()).toBe(false)
    })
  })
})
