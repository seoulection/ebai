import axios from 'axios'

export function createBid(id, data) {
  return axios.post(`http://localhost:3000/auctions/${id}/bids`, data, {
    withCredentials: true
  })
}