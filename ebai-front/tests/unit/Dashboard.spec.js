import { shallowMount } from '@vue/test-utils'
import Dashboard from '@/views/Dashboard'

describe('Dashboard.vue', () => {
  it('renders the user dashboard', () => {
    const wrapper = shallowMount(Dashboard)
    const title = wrapper.find('.dashboard-title')

    expect(title.text()).toBe('This is the dashboard')
  })

  it('has a button to create new auction', () => {
    const wrapper = shallowMount(Dashboard)
    const button = wrapper.find('button')

    expect(button.text()).toBe('Create new auction')
  })
})