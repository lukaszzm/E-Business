import axios from 'axios'

const BASE_URL = 'http://localhost:8080'
const CLIENT_URL = 'http://localhost:3000'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Origin: CLIENT_URL,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
