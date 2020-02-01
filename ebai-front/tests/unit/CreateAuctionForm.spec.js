import { mount } from '@vue/test-utils'
import CreateAuctionForm from '@/components/CreateAuctionForm'

describe('CreateAuctionForm.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(CreateAuctionForm)
  })

  it('has a form', () => {
    const form = wrapper.find('form')

    expect(form.exists()).toBe(true)
  })

  it('has a title labeled input', () => {
    const titleInput = wrapper.find('#title')

    expect(titleInput.exists()).toBe(true)
  })

  it('has a description labeled input', () => {
    const descriptionInput = wrapper.find('#description')

    expect(descriptionInput.exists()).toBe(true)
  })
  
  it('has a starting bid price labeled input', () => {
    const startingBidInput = wrapper.find('#starting-bid-price')

    expect(startingBidInput.exists()).toBe(true)
  })

  it('has a buy it now price labeled input', () => {
    const buyNowInput = wrapper.find('#buy-it-now-price')

    expect(buyNowInput.exists()).toBe(true)
  })

  it('has an end date labeled input', () => {
    const endDateInput = wrapper.find('#end-date')

    expect(endDateInput.exists()).toBe(true)
  })

  it('has a create button', () => {
    const button = wrapper.find('button')

    expect(button.exists()).toBe(true)
    expect(button.text()).toEqual('Create')
  })
})
