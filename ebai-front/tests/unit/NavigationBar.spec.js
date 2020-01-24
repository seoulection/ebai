import { shallowMount } from '@vue/test-utils'
import NavigationBar from '@/components/NavigationBar'

describe('NavigationBar.vue', () => {
  it('has the ebai header', async () => {
    const wrapper = shallowMount(NavigationBar, {
      stubs: ['router-link']
    })

    expect(wrapper.find('h1').text()).toBe('Ebai')
  })

  it('it has navigation links', () => {
    const wrapper = shallowMount(NavigationBar, {
      stubs: ['router-link']
    })

    expect(wrapper.find('[to="/"]').text()).toBe('Home')
    expect(wrapper.find('[to="/signup"]').text()).toBe('Register')
    expect(wrapper.find('[to="/users"]').text()).toBe('Show All Users')
  }) 
})