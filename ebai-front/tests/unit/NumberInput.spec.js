import { mount } from '@vue/test-utils'
import NumberInput from '@/components/NumberInput'

describe('NumberInput.vue', () => {
  it('has a label', () => {
    const wrapper = mount(NumberInput, {
      propsData: {
        labelText: "Amount",
        required: false,
        id: "amount"
      }
    })
    const label = wrapper.find('#amount')

    expect(label.text()).toBe('Amount:')
  })

  it('can be required', () => {
    const wrapper = mount(NumberInput, {
      propsData: {
        labelText: "Age",
        required: true,
        id: "age"
      }
    }) 

    const label = wrapper.find('#age')

    expect(label.text()).toBe('Age (required):')
  })


  it('can have a placeholder', () => {
    const wrapper = mount(NumberInput, {
      propsData: {
        labelText: "Hey",
        required: true,
        placeholder: 'Input a number',
        id: "name"
      }
    }) 

    const input = wrapper.find('input')

    expect(input.attributes().placeholder).toEqual('Input a number')
  })
})