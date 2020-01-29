import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import NavigationBar from '@/components/NavigationBar'
import { mockRouter } from '../helpers/helpers.js'

describe('NavigationBar.vue', () => {
  describe('emitting events', () => {
    it('emits a loginClicked event to open modal', () => {
      const wrapper = shallowMount(NavigationBar)

      wrapper.find('a[class="loginLink"]').trigger('click')
      expect(wrapper.emitted().loginClicked).toBeTruthy()
    })

    it('emits a logoutClicked event when user clicks on logout link', () => {
      const localVue = createLocalVue()
      const router = mockRouter(localVue)
      const wrapper = mount(NavigationBar, {
        stubs: ['router-link'],
        localVue,
        router,
        propsData: {
          loggedIn: true
        }
      })

      wrapper.find('[class="logoutLink"]').trigger('click')
      expect(wrapper.emitted().logoutClicked).toBeTruthy()
    })
  })
})