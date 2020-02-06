import { createLocalVue, mount } from '@vue/test-utils'
import { createUser } from '@/api/users'
import SignupForm from '@/components/SignupForm'
import { mockRouter, resolvePromise } from '../helpers/helpers.js'

jest.mock('@/api/users.js')

describe('submitting the signup form', () => {
  describe('on successful submit', () => {
    it('createUser gets called with the correct payload', async () => {
      const data = {
        user: {
          first_name: 'Hello',
          last_name: 'World',
          email: 'hello@world.net',
          password: 'Hello1234%'
        }
      }
      const localVue = createLocalVue()
      const router = mockRouter(localVue)
      const wrapper = mount(SignupForm, {
        localVue,
        router
      })

      createUser.mockResolvedValueOnce(201)
      const firstNameInput = wrapper.find('#firstName')
      firstNameInput.setValue('Hello')
      const lastNameInput = wrapper.find('#lastName')
      lastNameInput.setValue('World')
      const emailInput = wrapper.find('#email')
      emailInput.setValue('hello@world.net')
      const passwordInput = wrapper.find('#password')
      passwordInput.setValue('Hello1234%')
      wrapper.find('form').trigger('submit.prevent')

      await resolvePromise()

      expect(createUser).toHaveBeenCalledWith(data)
    })

    it('redirects the user to the success page', async () => {
      const localVue = createLocalVue()
      const router = mockRouter(localVue)
      const wrapper = mount(SignupForm, {
        localVue,
        router
      })

      createUser.mockResolvedValueOnce(201)
      const firstNameInput = wrapper.find('#firstName')
      firstNameInput.setValue('Hello')
      const lastNameInput = wrapper.find('#lastName')
      lastNameInput.setValue('World')
      const emailInput = wrapper.find('#email')
      emailInput.setValue('hello@world.gov')
      const passwordInput = wrapper.find('#password')
      passwordInput.setValue('Hello1234%')
      wrapper.find('form').trigger('submit.prevent')

      await resolvePromise()
      
      expect(wrapper.vm.$route.name).toBe('success')
    })

    it('shows an error message for incorrect signup', async () => {
      const localVue = createLocalVue()
      const router = mockRouter(localVue)
      const wrapper = mount(SignupForm, {
        localVue,
        router
      })

      createUser.mockImplementation(() => {
        throw new Error('Email is already taken')
      })
      const firstNameInput = wrapper.find('#firstName')
      firstNameInput.setValue('Hello')
      const lastNameInput = wrapper.find('#lastName')
      lastNameInput.setValue('World')
      const emailInput = wrapper.find('#email')
      emailInput.setValue('hello@world.gov')
      const passwordInput = wrapper.find('#password')
      passwordInput.setValue('Hello1234%')
      wrapper.find('form').trigger('submit.prevent')

      await resolvePromise()
      
      expect(wrapper.find('#error').text()).toBe('Error: Email is already taken')
    })
  })
})