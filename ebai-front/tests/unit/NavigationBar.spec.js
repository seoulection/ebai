import { shallowMount } from '@vue/test-utils'
import LoggedInNavigationLinks from '@/components/LoggedInNavigationLinks'
import LoggedOutNavigationLinks from '@/components/LoggedOutNavigationLinks'
import NavigationBar from '@/components/NavigationBar'

jest.mock('@/api/users.js')

describe('NavigationBar.vue', () => {
  describe('the component UI', () => {
    it('has the ebai header', () => {
      const wrapper = shallowMount(NavigationBar)

      expect(wrapper.find('h1').text()).toBe('Ebai')
    })

    it('displays the navigation links for a logged in user', () => {
      const wrapper = shallowMount(NavigationBar, {
        propsData: {
          loggedIn: true
        }
      })

      expect(wrapper.find(LoggedInNavigationLinks).exists()).toBe(true)
    })

    it('displays the navigation links for a logged out user', async () => {
      const wrapper = shallowMount(NavigationBar, {
        propsData: {
          loggedIn: false
        }
      })

      expect(wrapper.find(LoggedOutNavigationLinks).exists()).toBe(true)
    })
  })
})