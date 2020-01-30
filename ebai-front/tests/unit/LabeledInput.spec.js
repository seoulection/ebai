import { mount } from '@vue/test-utils'
import LabeledInput from '@/components/LabeledInput'

describe('LabeledInput.vue', () => {
  it('has a label', () => {
    const wrapper = mount(LabeledInput, {
      propsData: {
        labelText: "Wrestling Name",
        inputType: "text",
        required: false,
        id: "name"
      }
    })
    const label = wrapper.find('#name')

    expect(label.text()).toBe('Wrestling Name:')
  })

  it('can be required', () => {
    const wrapper = mount(LabeledInput, {
      propsData: {
        labelText: "DJ Name",
        inputType: "text",
        required: true,
        id: "name"
      }
    }) 

    const label = wrapper.find('#name')

    expect(label.text()).toBe('DJ Name (required):')
  })

  it('can have different input types', () => {
    const wrapper = mount(LabeledInput, {
      propsData: {
        labelText: "DJ Name",
        inputType: "password",
        required: true,
        id: "name"
      }
    }) 

    const input = wrapper.find('input')

    expect(input.attributes().type).toBe('password')
  })
})