import { render } from '@testing-library/vue'
import SignupForm from '@/components/SignupForm'

describe('SignupForm.vue', () => {
  it('has a first name field', async () => {
    const { getByLabelText } = render(SignupForm)
    const firstNameInput = getByLabelText(/First Name/i)

    expect(firstNameInput).toBeInTheDocument()
  })

  it('has a last name field', () => {
    const { getByLabelText } = render(SignupForm)
    const lastNameInput = getByLabelText(/Last Name/i)

    expect(lastNameInput).toBeInTheDocument()
  })

  it('has an email field', () => {
    const { getByLabelText } = render(SignupForm)
    const emailInput = getByLabelText(/Email Address/i)

    expect(emailInput).toBeInTheDocument()
  })

  it('has a password field', () => {
    const { getByLabelText } = render(SignupForm)
    const passwordInput = getByLabelText(/Password/i)

    expect(passwordInput).toBeInTheDocument()
  })

  it('has a create an account header', () => {
    const { getByText } = render(SignupForm)
    const header = getByText(/Create an account/i)

    expect(header).toBeInTheDocument()
  })

  it('has a submit button', () => {
    const { getByText } = render(SignupForm)
    const button = getByText(/Register/i)

    expect(button).toBeInTheDocument()
  })
})
