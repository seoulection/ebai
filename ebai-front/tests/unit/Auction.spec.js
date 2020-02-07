import Vuex from 'vuex'
import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import Auction from '@/views/Auction'

jest.mock('@/api/auctions')
jest.mock('@/api/users')

describe('Auction.vue', () => {
  let wrapper
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      state: {
        user: {
          userId: 1,
          loggedIn: true
        }
      }
    })

    wrapper = mount(Auction,{
      store,
      localVue
    })
  })

  it('renders the auction details', () => {
    const data = {
      id: 1,
      title: "test title",
      description: "this is an auction",
      current_bid_price: "100",
      buy_it_now_price: "500",
      end_date: '2020-01-30',
      user_id: 2
    }

    wrapper.setData({ auctionData: data })
    wrapper.setData({ userName: 'Hello World' })
    wrapper.setData({ error: '' })

    expect(wrapper.find('.auction-title').text()).toEqual('test title')
    expect(wrapper.find('.current-bid-price').text()).toEqual('$1')
    expect(wrapper.find('.buy-it-now-price').text()).toEqual('$5')
    expect(wrapper.find('.end-date').text()).toEqual('2020-01-30')
    expect(wrapper.find('.lister-name').text()).toEqual('Hello World')
  })

  it('renders the bidding button when logged in', () => {
    const data = {
      id: 1,
      title: "test title",
      description: "this is an auction",
      current_bid_price: "100",
      buy_it_now_price: "500",
      end_date: '2020-01-30',
      user_id: 2
    }

    wrapper.setData({ auctionData: data })
    wrapper.setData({ userName: 'Hello World' })
    wrapper.setData({ error: '' })

    expect(wrapper.find('.bid-input').exists()).toBe(true)
    expect(wrapper.find('.bid-button').exists()).toBe(true)

  })

  it('does not render the bidding form when user is not logged in', () => {

    const data = {
      id: 1,
      title: "test title",
      description: "this is an auction",
      current_bid_price: "100",
      buy_it_now_price: "500",
      end_date: '2020-01-30',
      user_id: 2
    }

    const store = new Vuex.Store({
      state: {
        user: {
          userId: 1,
          loggedIn: false
        }
      }
    })

    const wrapper = mount(Auction,{
      store,
      localVue
    })

    wrapper.setData({ auctionData: data })
    wrapper.setData({ userName: 'Hello World' })
    wrapper.setData({ error: '' })

    expect(wrapper.find('.bid-input').exists()).toBe(false)
    expect(wrapper.find('.bid-button').exists()).toBe(false)
  })

  it('does not render the bidding form when user is logged in and is the auction creator', () => {

    const data = {
      id: 1,
      title: "test title",
      description: "this is an auction",
      current_bid_price: "100",
      buy_it_now_price: "500",
      end_date: '2020-01-30',
      user_id: 2
    }

    const store = new Vuex.Store({
      state: {
        user: {
          userId: 2,
          loggedIn: true
        }
      }
    })

    const wrapper = mount(Auction,{
      store,
      localVue
    })

    wrapper.setData({ auctionData: data })
    wrapper.setData({ userName: 'Hello World' })
    wrapper.setData({ error: '' })

    expect(wrapper.find('.bid-input').exists()).toBe(false)
    expect(wrapper.find('.bid-button').exists()).toBe(false)
  })

  it('renders the error message', () => {
    const wrapper = shallowMount(Auction)

    wrapper.setData({ error: 'This is an error' })

    expect(wrapper.find('.error-text').text()).toEqual('This is an error')
  })
})
