import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

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

export function m8Profile(m8Id) {
  return axios.get(`${baseUrl}/m8/${m8Id}`, headers())
}

