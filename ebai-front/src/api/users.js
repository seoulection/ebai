import axios from 'axios'

export async function createUser(data) {
  try {
    return await axios.post('http://localhost:3000/users', data)
  } catch(e) {
    throw new Error('Email is already taken')
  }
}

export async function getUser(id) {
  try {
    return await axios.get(`http://localhost:3000/users/${id}`)
  } catch {
    throw new Error('User cannot be found')
  }
}

export async function loginUser(data) {
  try {
    return await axios.post('http://localhost:3000/signin', data, {
      withCredentials: true
    })
  } catch {
    throw new Error('Login did not work')
  }
}

export async function checkIfLoggedIn() {
  try {
    return await axios.get('http://localhost:3000/signin', { withCredentials: true })
  } catch {
    throw new Error('User is already logged in')
  }
}

export async function logoutUser() {
    return await axios.delete('http://localhost:3000/signin', {
      withCredentials: true
    })
}
