import { shallowMount } from '@vue/test-utils'
import Dashboard from '@/views/Dashboard'

describe('Dashboard.vue', () => {
  it('renders the user dashboard', () => {
    const wrapper = shallowMount(Dashboard)

    expect(wrapper.text()).toBe('This is the dashboard')
  })
})