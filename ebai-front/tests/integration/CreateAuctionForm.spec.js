import { createLocalVue, mount } from '@vue/test-utils'
import CreateAuctionForm from '@/components/CreateAuctionForm'
import { createAuction } from '@/api/auctions'
import { mockRouter, resolvePromise } from '../helpers/helpers.js'

jest.mock('@/api/auctions')

describe('CreateAuctionForm.vue', () => {
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    const router = mockRouter(localVue)
    wrapper = mount(CreateAuctionForm, {
      localVue,
      router
    })
  })

  function submitAuctionForm(wrapper) {
    wrapper.find('#title').setValue('The Best Title')
    wrapper.find('#description').setValue('The Best Description')
    wrapper.find('#starting-bid-price').setValue(5)
    wrapper.find('#buy-it-now-price').setValue(10)
    wrapper.find('#end-date').setValue('2020-05-09')
    wrapper.find('button').trigger('submit.prevent')
  }

  it('submits the form and redirects to the auction page', async () => {
    const data = {
      auction: {
        title: 'The Best Title',
        description: 'The Best Description',
        current_bid_price: 500,
        buy_it_now_price: 1000,
        end_date: '2020-05-09'
      }
    }
    const response = {
      data: {
        id: 1
      }
    }
    createAuction.mockResolvedValueOnce(response)
    submitAuctionForm(wrapper)
    await resolvePromise()

    expect(createAuction).toHaveBeenCalledWith(data)
    expect(wrapper.vm.$route.name).toBe('auction')
  })

  it('displays an error message for an invalid submission', async () => {
    createAuction.mockRejectedValueOnce(new Error('Auction cannot be saved. Please try again!'))
    submitAuctionForm(wrapper)
    await resolvePromise()

    expect(wrapper.find('.error').text()).toEqual('Error: Auction cannot be saved. Please try again!')
  })

  it('throws an error when buy it now price is less than starting bid price', async () => {
    wrapper.find('#title').setValue('The Best Title')
    wrapper.find('#description').setValue('The Best Description')
    wrapper.find('#starting-bid-price').setValue(5)
    wrapper.find('#buy-it-now-price').setValue(2)
    wrapper.find('#end-date').setValue('2020-05-09')
    wrapper.find('button').trigger('submit.prevent')

    await resolvePromise()

    expect(wrapper.find('.error').text()).toEqual('Buy it now price must be larger than starting bid price.')

  })
})
