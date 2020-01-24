import { mount, shallowMount } from '@vue/test-utils'
import SignupForm from '@/components/SignupForm'

describe('SignupForm.vue', () => {
  let wrapper = shallowMount(SignupForm)

  it('has a first name field', () => {
    expect(wrapper.find('label[for="firstName"]').text()).toBe('First Name*:')
    expect(wrapper.find('input[id="firstName"]').exists()).toBe(true)
  })

  it('has a last name field', () => {
    expect(wrapper.find('label[for="lastName"]').text()).toBe('Last Name*:')
    expect(wrapper.find('input[id="lastName"]').exists()).toBe(true)
  })

  it('has an email field', () => {
    expect(wrapper.find('label[for="email"]').text()).toBe('Email Address*:')
    expect(wrapper.find('input[id="email"]').exists()).toBe(true)
  })

  it('has a password field', () => {
    expect(wrapper.find('span[class="info"]').text()).toContain('Password must contain letters, numbers, and at least one special character')
    expect(wrapper.find('label[for="lastName"]').text()).toBe('Last Name*:')
    expect(wrapper.find('input[id="lastName"]').exists()).toBe(true)
  })

  it('has a register button', () => {
    expect(wrapper.find('button[type="submit"]').text()).toBe('Register')
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('renders an error message', () => {
    const wrapper = mount(SignupForm)

    wrapper.setData({ error: 'This will be rendered' })
    expect(wrapper.find('h3[id="error"]').text()).toBe('This will be rendered')
  })
})