import axios from 'axios'

export async function showAuction(id) {
  return await axios.get(`http://localhost:3000/auctions/${id}`)
}

export async function createAuction(data) {
  try {
    return await axios.post('http://localhost:3000/auctions', data, {
      withCredentials: true
    })
  } catch(e) {
    throw new Error('Error while saving auction. Please try again!')
  }
}