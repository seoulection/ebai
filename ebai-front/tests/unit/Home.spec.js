import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home'

describe('Home.vue', () => {
  it('renders the homepage message', () => {
    const wrapper = shallowMount(Home)

    expect(wrapper.text()).toBe('On sale now!')
  })
})
