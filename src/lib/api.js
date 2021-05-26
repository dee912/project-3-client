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

export function cr8APl8(formdata) {
  return axios.post(`${baseUrl}/pl8s`, formdata, headers())
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

export function editM8(m8Id, formdata) {
  return axios.put(`${baseUrl}/m8/${m8Id}`, formdata, headers())
}

export function getAllM8s() {
  return axios.get(`${baseUrl}/m8s`)
}

export function cr8R8ing(pl8Id, r8ing) {
  return axios.post(`${baseUrl}/pl8s/${pl8Id}/r8ings`, r8ing, headers())
} 
export function upd8R8ing(pl8Id, r8ingId, r8ing) {
  return axios.put(`${baseUrl}/pl8s/${pl8Id}/r8ings/${r8ingId}`, r8ing, headers())
}

export function addComment(pl8Id, comment) {
  return axios.post(`${baseUrl}/pl8/${pl8Id}/comment`, comment, headers())
}

export function editComment(pl8Id, comment, commentId) {
  return axios.put(`${baseUrl}/pl8/${pl8Id}/comment/${commentId}`, comment, headers())
}

export function deleteComment(pl8Id, commentId) {
  return axios.delete(`${baseUrl}/pl8/${pl8Id}/comment/${commentId}`, headers())
}