import axios from 'axios'
import { showAuction } from '@/api/auctions'

jest.mock('axios')

describe('auctions.js', () => {
  it('gets data for one auction', async () => {
    const response = {
      status: 200,
      data: {
        id: 1,
        title: "test title",
        description: "this is an auction",
        current_bid_price: "100",
        buy_now_price: "500",
        user_id: 2
      }
    }

    axios.get.mockResolvedValueOnce(response)
    const apiResponse = await showAuction(1)

    expect(apiResponse.status).toEqual(200)
  })

  it('throws an error when auction is not found', async () => {
    axios.get.mockRejectedValueOnce(new Error('This is an error'))

    await expect(showAuction(400)).rejects.toThrow('This is an error') 
  })
})