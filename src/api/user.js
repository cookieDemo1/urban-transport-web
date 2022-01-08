import request from '@/utils/request'
import api from './api'
import qs from 'qs'

export function login(params) {
  return request({
    url: api.login,
    method: 'POST',
    data: qs.stringify(params) ,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

export function logout() {
  return request({
    url: api.logout,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

