import { createLocalVue, mount } from '@vue/test-utils'
import LoggedInNavigationLinks from '@/components/LoggedInNavigationLinks'
import { mockRouter } from '../helpers/helpers.js'

describe('LoggedInNavigationLinks.vue', () => {
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    const router = mockRouter(localVue)
    wrapper = mount(LoggedInNavigationLinks, {
      localVue,
      router
    })
  })

  describe('router links', () => {
    it('has the appropriate links for logged in users', () => {
      expect(wrapper.find('a[href="/"]').text()).toBe('Home')
      expect(wrapper.find('.logoutLink').text()).toBe('Logout')
    })
  })
  describe('logout', () => {
    it('emits the logoutClicked event', () => {
      wrapper.vm.logoutClicked()

      expect(wrapper.emitted().logoutClicked).toBeTruthy()
    })
  })
})