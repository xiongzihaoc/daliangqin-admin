import request from '@/utils/request'

// let baseUrl = 

export function login(data) {
  return request({
    url: 'login/phone',
    method: 'post',
    data,
    baseURL: '/api/public',
  })
}

export function logout(data) {
  return request({
    url: 'login/logout',
    method: 'post',
    baseURL: '/api/public',
  })
}

export function status(data) {
  return request({
    url: 'login/status',
    method: 'get',
    baseURL: '/api/public',
  })
}

