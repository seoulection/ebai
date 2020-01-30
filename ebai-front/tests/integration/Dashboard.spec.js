import { createLocalVue, mount } from '@vue/test-utils'
import { mockRouter } from '../helpers/helpers.js'
import Dashboard from '@/views/Dashboard'

describe('Dashboard.vue', () => {
  it('goes to create new auction when clicked', () => {
    const localVue = createLocalVue()
    const router = mockRouter(localVue)
    const wrapper = mount(Dashboard, {
      localVue,
      router,
    })
  
    wrapper.find('button').trigger('click')

    expect(wrapper.vm.$route.name).toBe('createAuction')
  })
})