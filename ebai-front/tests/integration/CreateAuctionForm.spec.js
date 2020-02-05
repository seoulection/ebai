import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createLocalVue, mount } from '@vue/test-utils'
import CreateAuctionForm from '@/components/CreateAuctionForm'
import { mockRouter, resolvePromise } from '../helpers/helpers.js'

describe('CreateAuctionForm.vue', () => {
  const mock = new MockAdapter(axios)
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

  it('calls the setAuctionImage', () => {
    const setAuctionImage = jest.fn()
    const localVue = createLocalVue()
    const router = mockRouter(localVue)
    wrapper = mount(CreateAuctionForm, {
      localVue,
      router,
      methods: {
        setAuctionImage
      }
    })

    const file = new File(['asdfad'], 'image.png', { type: 'image/png' })
    const imageInput = wrapper.find('#auctionImage')
    imageInput.files = [file]
    imageInput.trigger('change')

    expect(setAuctionImage).toHaveBeenCalledTimes(1)
  })

  it('submits the form and redirects to the auction page', async () => {
    const data = {
      title: 'The Best Title',
      description: 'The Best Description',
      image: null,
      current_bid_price: 500,
      buy_it_now_price: 1000,
      end_date: '2020-05-09'
    }

    let formData = new FormData()
    Object.entries(data).forEach(
      ([key, value]) => formData.append(key, value)
    )

    const response = {
      id: 1
    }

    mock.onPost('http://localhost:3000/auctions').reply(201, response)
    submitAuctionForm(wrapper)
    await resolvePromise()

    expect(wrapper.vm.$route.name).toBe('auction')
    expect(wrapper.vm.$route.path).toBe('/auctions/1')
  })

  it('displays an error message for an invalid submission', async () => {
    const error = {
      "email": ["has already been taken"]
    }
    mock.onPost('http://localhost:3000/auctions').reply(422, error)
    submitAuctionForm(wrapper)
    await resolvePromise()

    expect(wrapper.find('.error').text()).toEqual('Error: Auction cannot be saved. Please try again!')
  })

  it('throws an error when buy it now price is less than starting bid price', async () => {
    wrapper.find('#title').setValue('The Best Title')
    wrapper.find('#description').setValue('The Best Description')
    wrapper.find('#auctionImage').setValue(null)
    wrapper.find('#starting-bid-price').setValue(5)
    wrapper.find('#buy-it-now-price').setValue(2)
    wrapper.find('#end-date').setValue('2020-05-09')
    wrapper.find('button').trigger('submit.prevent')

    await resolvePromise()

    expect(wrapper.find('.error').text()).toEqual('Buy it now price must be larger than starting bid price.')
  })
})
