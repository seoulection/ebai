import { shallowMount } from '@vue/test-utils'
import NavigationBar from '@/components/NavigationBar'

describe('NavigationBar.vue', () => {
  it('has the ebai header', async () => {
    const wrapper = shallowMount(NavigationBar, {
      stubs: ['router-link']
    })

    expect(wrapper.find('h1').text()).toBe('Ebai')
  })

  it('renders all navigation links when user is logged out', () => {
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
    expect(wrapper.find('[to="/signup"]').exists()).toBe(false)
    expect(wrapper.find('[class="loginLink"]').exists()).toBe(false)
  }) 
})
