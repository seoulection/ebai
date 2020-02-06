import { createLocalVue, mount } from '@vue/test-utils'
import { loginUser } from '@/api/users'
import SigninForm from '@/components/SigninForm'
import { mockRouter, resolvePromise } from '../helpers/helpers.js'

jest.mock('@/api/users.js')

describe('submitting the signup form', () => {
  const data = {
    user: {
      email: 'hello@world.net',
      password: 'Hello1234%'
    }
  }

  describe('on successful submit', () => {
    it('logs in a user', async () => {
      const localVue = createLocalVue()
      const router = mockRouter(localVue)
      const wrapper = mount(SigninForm, {
        localVue,
        router
      })

      loginUser.mockResolvedValueOnce({data: data})
      const emailInput = wrapper.find('#email')
      emailInput.setValue('hello@world.net')
      const passwordInput = wrapper.find('#password')
      passwordInput.setValue('Hello1234%')
      wrapper.find('form').trigger('submit.prevent')

      await resolvePromise()

      expect(loginUser).toHaveBeenCalledWith(data)
    })

    it('reroutes to the dashboard on successful login', async () => {
      const localVue = createLocalVue()
      const router = mockRouter(localVue)
      const wrapper = mount(SigninForm, {
        localVue,
        router
      })

      loginUser.mockResolvedValueOnce(data)
      const emailInput = wrapper.find('#email')
      emailInput.setValue('hello@world.net')
      const passwordInput = wrapper.find('#password')
      passwordInput.setValue('Hello1234%')
      wrapper.find('form').trigger('submit.prevent')

      await resolvePromise()

      expect(wrapper.vm.$route.name).toBe('dashboard')
      expect(wrapper.emitted().loginSuccessful).toBeTruthy()
    })
  })

  describe('on unsuccessful submit', () => {
    it('throws an error for incorrect signin', async () => {
      const localVue = createLocalVue()
      const router = mockRouter(localVue)
      const wrapper = mount(SigninForm, {
        localVue,
        router
      })

      loginUser.mockImplementation(() => {
        throw new Error('Invalid credentials')
      })

      const emailInput = wrapper.find('#email')
      emailInput.setValue('hello@world.net')
      const passwordInput = wrapper.find('#password')
      passwordInput.setValue('Hello1234%')
      wrapper.find('form').trigger('submit.prevent')

      await resolvePromise()

      expect(wrapper.find('#error').text()).toBe('Invalid credentials')
    })
  })
})