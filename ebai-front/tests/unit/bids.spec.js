import axios from 'axios'
import { createBid } from '@/api/bids'

jest.mock('axios')

describe('bids.js', () => {
  it('returns status code 201 after successful creation', async () => {
    const response = {
      status: 201,
      data: {
        auction_id: 6,
        amount: 500
      }
    }

    axios.post.mockResolvedValueOnce(response)
    const apiResponse = await createBid(6, { amount: 500 })

    expect(apiResponse.status).toEqual(201)
  })

  it('throws an error when auction is not created', async () => {
    axios.post.mockRejectedValueOnce(new Error('This is an error'))

    await expect(createBid(5, {amount: 'what'})).rejects.toThrow('This is an error')
  })
})
