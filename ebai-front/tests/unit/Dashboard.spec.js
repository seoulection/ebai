import { shallowMount } from '@vue/test-utils'
import Dashboard from '@/views/Dashboard'

describe('Dashboard.vue', () => {
  it('renders the user dashboard', () => {
    const isUserLoaded = jest.fn(() => {
      return true
    })
    const wrapper = shallowMount(Dashboard, {
      methods: {
        isUserLoaded
      }
    })
    const title = wrapper.find('.dashboard-title')

    expect(title.text()).toBe('This is the dashboard')
  })

  it('has a button to create new auction', () => {
    const isUserLoaded = jest.fn(() => {
      return true
    })
    const wrapper = shallowMount(Dashboard, {
      methods: {
        isUserLoaded
      }
    })
    const button = wrapper.find('button')

    expect(button.text()).toBe('Create new auction')
  })

  it('renders a blank page if user is not logged in', () => {
    const wrapper = shallowMount(Dashboard)
    const title = wrapper.find('.dashboard-title')
    const button = wrapper.find('button')

    expect(title.exists()).toBe(false)
    expect(button.exists()).toBe(false)
  })
})