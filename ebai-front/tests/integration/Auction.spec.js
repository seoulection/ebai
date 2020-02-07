import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createLocalVue, mount } from '@vue/test-utils'
import Auction from '@/views/Auction'
import { mockRouter, resolvePromise } from '../helpers/helpers'
import store from '@/store'

jest.mock('@/api/auctions')
jest.mock('@/api/bids')

describe('Auction.vue', () => {
  let mock = new MockAdapter(axios)
  let wrapper
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()
    const router = mockRouter(localVue)

    wrapper = mount(Auction,{
      store,
      localVue,
      router,
      mocks: {
        getAuction: jest.fn()
      }
    })
  })

  it('successfully updates the bid amount', async () => {
    const data = {
      id: 1,
      title: "test title",
      description: "this is an auction",
      current_bid_price: 100,
      buy_it_now_price: 500,
      end_date: '2020-01-30',
      user_id: 2
    }
    
    
    wrapper.setData({ auctionData: data })
    wrapper.setData({ userName: 'Hello World' })
    wrapper.setData({ error: '' })
    store.commit('setLoggedIn', {userId: 1, loggedIn: true})


    wrapper.find('.bid-input').setValue(2)
    wrapper.find('.bid-button').trigger('submit.prevent')

    const mockBidData = {
      amount: 200
    }
    
    mock.onPost('http://localhost:3000/auctions/1/bids', mockBidData).reply(201)
    await resolvePromise()

    const mockAuctionData = {
      auction: {
        current_bid_price: 200
      }
    }

    mock.onPut('http://localhost:3000/auctions/1', mockAuctionData).reply(200)
    await resolvePromise()

    expect(wrapper.vm.auctionData.current_bid_price).toEqual(200)
    expect(wrapper.find('.bid-current-price').text()).toEqual('Current Price: $2')
  })

  it('does not update the bid amount', async () => {
    const localVue = createLocalVue()
    const router = mockRouter(localVue)

    const wrapper = mount(Auction,{
      store,
      localVue,
      router,
      mocks: {
        getAuction: jest.fn(),
        handleBidSubmission: jest.fn(() => {
          return Promise.reject('Something happened')
        })
      }
    })
    store.commit('setLoggedIn', {userId: 1, loggedIn: true})

    try {

      wrapper.find('.bid-button').trigger('submit.prevent')
    } catch {
      expect(wrapper.vm.auctionData.current_bid_price).toEqual(300)
      expect(wrapper.find('.bid-current-price').text()).toEqual('Current Price: $3')
    }
  })
})
