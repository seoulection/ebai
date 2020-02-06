import axios from 'axios'

export async function showAuction(id) {
  return await axios.get(`http://localhost:3000/auctions/${id}`)
}
