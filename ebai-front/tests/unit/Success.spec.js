import { shallowMount } from '@vue/test-utils'
import Success from '@/views/Success'

describe('Success.vue', () => {
  it('renders the success message', () => {
    const wrapper = shallowMount(Success)

    expect(wrapper.text()).toBe("Signup was successful!")
  })
})