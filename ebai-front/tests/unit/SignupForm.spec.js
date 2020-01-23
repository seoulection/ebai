import { toBeInTheDocument } from '@testing-library/jest-dom'
import {render, wait} from '@testing-library/vue'
import SignupForm from '@/components/SignupForm'
import { createUser } from '@/api/users'

jest.mock('@/api/users.js')

describe('SignupForm.vue', () => {
  it('has a first name field', async () => {
    let data = {
        user: {
            first_name: "Hello",
            last_name: "Goodbye",
            email: "this@isnottaken.com",
            password: "Hello1234%"
        }
    }
    createUser.mockResolvedValueOnce(data)

    const { getByLabelText } = render(SignupForm)

    await wait(() => {
      const actual = getByLabelText(/First Name:/i)
      expect(actual).toBeInTheDocument()
    })
  })
  it('has an email field', async () => {
    let data = {
        user: {
            first_name: "Hello",
            last_name: "Goodbye",
            email: "this@isalsonottaken.com",
            password: "Hello1234%"
        }
    }
    createUser.mockResolvedValueOnce(data)

    const { getByLabelText } = render(SignupForm)

    await wait(() => {
      const actual = getByLabelText(/Email Address:/i)
      expect(actual).toBeInTheDocument()
    })
  })
})
