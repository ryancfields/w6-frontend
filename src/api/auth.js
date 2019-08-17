import request from './request'

const { development } = process.env
const BASE_URL = 'http://localhost:5000'

export const login = async (user) => {
  const response = await fetch(`${BASE_URL}/api/login`, {
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  const json = await response.json()

  return json
}

export const signup = async (user) => {
  const response = await fetch(`${BASE_URL}/api/signup`, {
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  const json = await response.json()

  return json
}

export const profile = () => request('/api/profile')