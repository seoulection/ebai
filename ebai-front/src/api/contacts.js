import axios from 'axios'

export async function getContacts() {
  const res = await axios.get('http://localhost:3000/contacts')
  return res.data
}