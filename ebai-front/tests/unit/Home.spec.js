import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home'

describe('Home.vue', () => {
  it('renders the homepage message', () => {
    const wrapper = shallowMount(Home)

    expect(wrapper.text()).toBe('Coming soon')
  })

  it('renders the awesome logo', () => {
    const wrapper = shallowMount(Home)

    expect(wrapper.contains('img')).toBe(true)
  })
})