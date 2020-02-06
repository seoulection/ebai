import { createLocalVue, mount } from '@vue/test-utils'
import LoggedInNavigationLinks from '@/components/LoggedInNavigationLinks'
import NavigationBar from '@/components/NavigationBar'
import { mockRouter, resolvePromise } from '../helpers/helpers.js'
import { logoutUser } from '@/api/users'

jest.mock('@/api/users')

describe('NavigationBar.vue', () => {
  describe('emitting events', () => {
    it('emits a logoutClicked event when user clicks on logout link', async () => {
      const localVue = createLocalVue()
      const router = mockRouter(localVue)
      const wrapper = mount(NavigationBar, {
        localVue,
        router,
        propsData: {
          loggedIn: true
        }
      })

      logoutUser.mockResolvedValueOnce()
      const loggedInNavLinks = wrapper.find(LoggedInNavigationLinks)
      loggedInNavLinks.vm.logoutClicked()
      await resolvePromise()

      expect(wrapper.emitted().loggedOut).toBeTruthy()
    })
  })
})
