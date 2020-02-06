import axios from 'axios'
import { createUser, loginUser, checkIfLoggedIn, getUser } from '@/api/users'

jest.mock('axios')

describe('users.js', () => {
  it('creates a user', async () => {
    const data = {
      user: {
        first_name: 'Ebay',
        last_name: 'Clone',
        email: 'hello@world.net',
        password: 'Hello1234%'
      }
    }
    const response = {
      status: 2001,
      data: data
    }

    axios.post.mockResolvedValueOnce(response)
    const apiResponse = await createUser(data)

    expect(apiResponse.status).toEqual(2001)
  })

  it('gets a user', async () => {
    const response = {
      status: 200,
      data: {
        user: {
          first_name: 'Ebay',
          last_name: 'Clone',
          email: 'hello@world.net',
          password: 'Hello1234%'
        }
      }
    }
    axios.get.mockResolvedValueOnce(response)
    const apiResponse = await getUser(1)

    expect(apiResponse.status).toEqual(200)
    expect(apiResponse.data.user.first_name).toEqual("Ebay")
  })

  it('throws an error when email is taken', async () => {
    const data = {
      user: {
        first_name: 'test',
        last_name: 'test',
        email: 'test',
        password: 'test%'
      }
    }

    axios.post.mockRejectedValueOnce(new Error('This is an error'))

    await expect(createUser(data)).rejects.toThrow('Email is already taken') 
  })

  it('it creates a session', async () => {
    const data = {
      user: {
        first_name: 'test',
        last_name: 'test',
        email: 'test',
        password: 'test%'
      }
    }

    const response = {
      status: 2001,
      data: data
    }

    axios.post.mockResolvedValueOnce(response)
    const apiResponse = await loginUser(data)

    expect(apiResponse.status).toEqual(2001)
  })

  it('throws an error when login fails', async () => {
    const data = {
      user: {
        email: 'test',
        password: ''
      }
    }

    axios.post.mockRejectedValueOnce(new Error('This is an error'))

    await expect(loginUser(data)).rejects.toThrow('Login did not work') 
  })

  it('it return user if logged in', async () => {
    const response = {
      status: 200,
      data: {
        id: 1,
        first_name: 'test',
        last_name: 'test',
        email: 'test',
        password: 'test%'
      }
    }

    axios.get.mockResolvedValueOnce(response)
    const apiResponse = await checkIfLoggedIn()
    expect(apiResponse.status).toEqual(200)
  })

  it('throws an error when login fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('This is an error'))

    await expect(checkIfLoggedIn()).rejects.toThrow('User is already logged in') 
  })

})