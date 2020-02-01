import { createLocalVue, mount } from '@vue/test-utils'
import { loginUser } from '@/api/users'
import SigninForm from '@/components/SigninForm'
import { mockRouter, resolvePromise } from '../helpers/helpers.js'

jest.mock('@/api/users.js')

describe('submitting the signup form', () => {
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    const router = mockRouter(localVue)
    wrapper = mount(SigninForm, {
      localVue,
      router
    })
  })

  function submitSigninForm(wrapper) {
    const emailInput = wrapper.find('#email')
    emailInput.setValue('hello@world.net')
    const passwordInput = wrapper.find('#password')
    passwordInput.setValue('Hello1234%')
    wrapper.find('form').trigger('submit.prevent')
  }

  const data = {
    user: {
      email: 'hello@world.net',
      password: 'Hello1234%'
    }
  }

  describe('on successful submit', () => {
    it('logs in a user', async () => {
      loginUser.mockResolvedValueOnce({data: data})
      submitSigninForm(wrapper)
      await resolvePromise()

      expect(loginUser).toHaveBeenCalledWith(data)
    })
  })

  describe('on unsuccessful submit', () => {
    it('throws an error for incorrect signin', async () => {
      loginUser.mockImplementation(() => {
        throw new Error('Invalid credentials')
      })
      submitSigninForm(wrapper)
      await resolvePromise()

      expect(wrapper.find('#error').text()).toBe('Invalid credentials')
    })
  })
})
