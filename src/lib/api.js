import axios from 'axios'

const baseUrl = '/api'

export function getAllPl8s() {
  return axios.get(`${baseUrl}/pl8s`)
}

export function getSinglePl8(pl8Id) {
  return axios.get(`${baseUrl}/pl8s/${pl8Id}`)
}

export function registerM8(formdata) {
  return axios.post(`${baseUrl}/become-a-m8`, formdata)
}

export function loginM8(formdata) {
  return axios.post(`${baseUrl}/login`, formdata)
}