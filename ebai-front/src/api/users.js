import axios from 'axios'

export async function getUsers() {
  const res = await axios.get('http://localhost:3000/users')
  return res.data
}

export async function createUser(data) {
    try {
      const res = await axios.post('http://localhost:3000/users', data)
      return res.status
    } catch (e) {
      return 422
    }
}