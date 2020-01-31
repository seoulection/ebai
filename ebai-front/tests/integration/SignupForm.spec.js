import { createLocalVue, mount } from '@vue/test-utils'
import { createUser } from '@/api/users'
import SignupForm from '@/components/SignupForm'
import { mockRouter, resolvePromise } from '../helpers/helpers.js'

jest.mock('@/api/users.js')

describe('submitting the signup form', () => {
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    const router = mockRouter(localVue)
    wrapper = mount(SignupForm, {
      localVue,
      router
    })
  })

  function fillOutForm(wrapper) {
    wrapper.find('#firstName').setValue('Hello')
    wrapper.find('#lastName').setValue('World')
    wrapper.find('#email').setValue('hello@world.net')
    wrapper.find('#password').setValue('Hello1234%')
    wrapper.find('form').trigger('submit.prevent')
  }

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

      createUser.mockResolvedValueOnce(201)
      fillOutForm(wrapper)
      await resolvePromise()

      expect(createUser).toHaveBeenCalledWith(data)
    })

    it('redirects the user to the success page', async () => {
      createUser.mockResolvedValueOnce(201)
      fillOutForm(wrapper)
      await resolvePromise()
      
      expect(wrapper.vm.$route.name).toBe('success')
    })

    it('shows an error message for incorrect signup', async () => {
      createUser.mockRejectedValueOnce(new Error('Email is already taken'))

      fillOutForm(wrapper)
      await resolvePromise()
      
      expect(wrapper.find('#error').text()).toBe('Error: Email is already taken')
    })
  })
})