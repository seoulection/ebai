import { createLocalVue, mount } from '@vue/test-utils'
import LoggedOutNavigationLinks from '@/components/LoggedOutNavigationLinks'
import EventBus from '@/eventBus.js'
import { mockRouter } from '../helpers/helpers.js'

describe('LoggedOutNavigationLinks.vue', () => {
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    const router = mockRouter(localVue)
    wrapper = mount(LoggedOutNavigationLinks, {
      localVue,
      router
    })
  })

  describe('router links', () => {
    it('has the appropriate links for logged out users', () => {
      expect(wrapper.find('a[href="/"]').text()).toBe('Home')
      expect(wrapper.find('a[href="/signup"]').text()).toBe('Register')
      expect(wrapper.find('.loginLink').text()).toBe('Login')
    })
  })
  describe('login', () => {
    it('emits the login-clicked event', () => {
      EventBus.$on('loginClicked', () => {
        wrapper.vm.$emit('loginClicked')
      })

      wrapper.vm.loginClicked()

      expect(wrapper.emitted().loginClicked).toBeTruthy()
    })
  })
})