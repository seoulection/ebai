import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import NavigationBar from '@/components/NavigationBar'
import { mockRouter } from '../helpers/helpers.js'

describe('NavigationBar.vue', () => {
  describe('the component UI', () => {
    it('has the ebai header', async () => {
      const wrapper = shallowMount(NavigationBar, {
        stubs: ['router-link']
      })

      expect(wrapper.find('h1').text()).toBe('Ebai')
    })

    it('renders all navigation links except the logout link when user is logged out', () => {
      const wrapper = shallowMount(NavigationBar, {
        stubs: ['router-link'],
        propsData: {
          loggedIn: false
        }
      })

      expect(wrapper.find('[to="/"]').text()).toBe('Home')
      expect(wrapper.find('[to="/signup"]').text()).toBe('Register')
      expect(wrapper.find('[to="/users"]').text()).toBe('Show All Users')
      expect(wrapper.find('[class="loginLink"]').text()).toBe('Login')
      expect(wrapper.find('[class="logoutLink"]').exists()).toBe(false)
    }) 

    it('renders some navigation links when user is logged in', () => {
      const wrapper = shallowMount(NavigationBar, {
        stubs: ['router-link'],
        propsData: {
          loggedIn: true
        }
      })
      expect(wrapper.find('[to="/"]').text()).toBe('Home')
      expect(wrapper.find('[to="/users"]').text()).toBe('Show All Users')
      expect(wrapper.find('[class="logoutLink"]').text()).toBe('Logout')
      expect(wrapper.find('[to="/signup"]').exists()).toBe(false)
      expect(wrapper.find('[class="loginLink"]').exists()).toBe(false)
    }) 
  })

  describe('clicking links', () => {
    it('redirects to the homepage', () => {
      const localVue = createLocalVue()
      const router = mockRouter(localVue)
      const wrapper = mount(NavigationBar, {
        localVue,
        router
      })

      wrapper.find('a[href="/"]').trigger('click')
      expect(wrapper.vm.$route.name).toBe('home')
    })

    it('redirects to the register page', () => {
      const localVue = createLocalVue()
      const router = mockRouter(localVue)
      const wrapper = mount(NavigationBar, {
        localVue,
        router
      })

      wrapper.find('a[href="/signup"]').trigger('click')
      expect(wrapper.vm.$route.name).toBe('signup')
    })
  })
})
