import axios from 'axios'
import { createBid } from '@/api/bids'

jest.mock('axios')

describe('bids.js', () => {
  it('returns status code 201 after successful creation', async () => {
    const response = {
      status: 201,
      data: {
        id: 15,
        title: "test title",
        description: "this is an auction",
        current_bid_price: "100",
        buy_now_price: "500",
        user_id: 6
      }
    }

    axios.post.mockResolvedValueOnce(response)
    const apiResponse = await createAuction({data: "hey"})

    expect(apiResponse.status).toEqual(201)
  })

  it('throws an error when auction is not created', async () => {
    axios.post.mockRejectedValueOnce(new Error('This is an error'))

    await expect(createAuction({data: "hello"})).rejects.toThrow('Auction cannot be saved. Please try again!') 
  }) 
})