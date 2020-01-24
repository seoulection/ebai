import { mount, shallowMount } from '@vue/test-utils'
import SigninForm from '@/components/SigninForm'
import SigninModal from '@/components/SigninModal'

describe('SigninModal.vue', () => {
  it('emits the close event when clicking X', () => {
    const wrapper = shallowMount(SigninModal)

    wrapper.vm.close()

    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('remits the close event when clicking X', () => {
    const wrapper = mount(SigninModal)

    const signinForm = wrapper.find(SigninForm)
    signinForm.vm.$emit('loginSuccessful')

    expect(wrapper.emitted().close).toBeTruthy()
  })
})
