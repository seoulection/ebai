import { shallowMount } from '@vue/test-utils'
import Auction from '@/views/Auction'

jest.mock('@/api/auctions')
jest.mock('@/api/users')

describe('Auction.vue', () => {
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
    const wrapper = shallowMount(Auction)

    wrapper.setData({ auctionData: data })
    wrapper.setData({ userName: 'Hello World' })

    expect(wrapper.find('h2').text()).toEqual('test title')
    expect(wrapper.find('.current-bid-price').text()).toEqual('$1.00')
    expect(wrapper.find('.buy-it-now-price').text()).toEqual('$5.00')
    expect(wrapper.find('.end-date').text()).toEqual('2020-01-30')
    expect(wrapper.find('.lister-name').text()).toEqual('Hello World')
  })

  it('renders the error message', () => {
    const wrapper = shallowMount(Auction)

    wrapper.setData({ error: 'This is an error' })

    expect(wrapper.find('.error').text()).toEqual('This is an error')
  })
})
