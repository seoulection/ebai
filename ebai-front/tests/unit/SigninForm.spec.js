import { shallowMount } from '@vue/test-utils'
import SigninForm from '@/components/SigninForm'

describe('SigninForm.vue', () => {
  let wrapper = shallowMount(SigninForm)

  it('has an email label', () => {
    const emailLabel = wrapper.find('[for="email"]')

    expect(emailLabel.text()).toBe('Email Address*:')
  })

  it('has a password label', () => {
    const passwordLabel = wrapper.find('[for="password"]')

    expect(passwordLabel.text()).toBe('Password*:')
  })

  it('has an email input', () => {
    const emailInput = wrapper.find('input[id="email"]')

    expect(emailInput.exists()).toBe(true)
  })

  it('has a password input', () => {
    const passwordInput = wrapper.find('input[id="password"]')

    expect(passwordInput.exists()).toBe(true)
  })

  it('has a login button', () => {
    const loginButton = wrapper.find('button[type="submit"]')

    expect(loginButton.text()).toBe('Login')
    expect(loginButton.exists()).toBe(true)
  })
})