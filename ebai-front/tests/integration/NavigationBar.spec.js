import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import NavigationBar from '@/components/NavigationBar'
import { mockRouter } from '../helpers/helpers.js'

describe('NavigationBar.vue', () => {
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

    it('emits a loginClicked event to open modal', () => {
      const wrapper = shallowMount(NavigationBar)

      wrapper.find('a[class="loginLink"]').trigger('click')
      expect(wrapper.emitted().loginClicked).toBeTruthy()
    })
  })
})