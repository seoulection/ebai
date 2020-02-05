import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import App from '@/App'
import LoggedInNavigationLinks from '@/components/LoggedInNavigationLinks'
import LoggedOutNavigationLinks from '@/components/LoggedOutNavigationLinks'
import NavigationBar from '@/components/NavigationBar'
import { mockRouter, resolvePromise } from '../helpers/helpers.js'
import { logoutUser } from '@/api/users.js'
import store from '@/store'

jest.mock('@/api/users.js')

describe('App.vue', () => {
  describe('emitting events', () => {
    let wrapper

    beforeEach(() => {
      const localVue = createLocalVue()
      const router = mockRouter(localVue)
      wrapper = mount(App, {
        localVue,
        store,
        router
      })
    })

    it('logs the user out', async () => {
      logoutUser.mockResolvedValueOnce()
      const navigationBar = wrapper.find(NavigationBar)
      navigationBar.vm.logout()
      await resolvePromise()

      expect(navigationBar.find(LoggedInNavigationLinks).exists()).toBe(false)
      expect(navigationBar.find(LoggedOutNavigationLinks).exists()).toBe(true)
    })

    it('shows a modal when login is clicked', () =>{
      const localVue = createLocalVue()
      const router = mockRouter(localVue)
      wrapper = mount(App, {
        localVue,
        store,
        router
      })
      wrapper.setData({ isLoggedIn: false, isModalVisible: false })
      wrapper.find('a[class="loginLink"]').trigger('click')

      expect(wrapper.vm.$data.isModalVisible).toBe(true)
      expect(wrapper.find('button[class="signin-btn"]').text()).toBe("Login")
    })

    it('closes the modal when X is clicked', () =>{
      wrapper.setData({ isLoggedIn: false, isModalVisible: true })
      wrapper.find('button[class="close-btn"]').trigger('click')

      expect(wrapper.vm.$data.isModalVisible).toBe(false)
      expect(wrapper.find('button[class="signin-btn"]').exists()).toBe(false)
    })
  })
})
