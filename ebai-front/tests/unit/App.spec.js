import { createLocalVue, mount } from '@vue/test-utils'
import App from '@/App'
import SigninModal from '@/components/SigninModal'
import NavigationBar from '@/components/NavigationBar'
import { mockRouter } from '../helpers/helpers.js'

describe('App.vue', () => {
  let wrapper
  const checkLoginStatus = jest.fn()

  beforeEach(() => {
    const localVue = createLocalVue()
    const router = mockRouter(localVue)
    wrapper = mount(App, {
      localVue,
      router,
      methods: {
        checkLoginStatus
      }
    })
  })

  it('contains a navigation bar', () => {
    expect(wrapper.find(NavigationBar).exists()).toBe(true)
  })

  it('contains the overlapping modal', () => {
    wrapper.setData({ isModalVisible: true })
    expect(wrapper.find(SigninModal).exists()).toBe(true)
  })
})