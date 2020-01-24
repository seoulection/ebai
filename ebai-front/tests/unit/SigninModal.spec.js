import { shallowMount, mount } from '@vue/test-utils'
import SigninForm from '@/components/SigninForm'
import SigninModal from '@/components/SigninModal'

describe('SigninModal.vue', () => {
  it('has a login h2', () => {
    const wrapper = shallowMount(SigninModal)

    expect(wrapper.find('h2').text()).toBe('Login')
  })

  it('has a close button', () => {
    const wrapper = shallowMount(SigninModal)

    expect(wrapper.find('button[class="close-btn"]').text()).toBe('X')
  }) 

  it('has a signin form in the modal body', () => {
    const wrapper = mount(SigninModal)
    const modalBody = wrapper.find('div[class="modal-body"]')

    expect(modalBody.contains(SigninForm)).toBe(true)
  }) 
})
