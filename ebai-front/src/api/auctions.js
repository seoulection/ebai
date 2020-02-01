import axios from 'axios'

export async function showAuction(id) {
  try {
    return await axios.get(`http://localhost:3000/auctions/${id}`)
  } catch (err) {
    throw Error(err)
  }
}

export async function createAuction(data) {
  try {
    return await axios.post('http://localhost:3000/auctions', data, {
      withCredentials: true
    })
  } catch(e) {
    throw new Error('Auction cannot be saved. Please try again!')
  }
}