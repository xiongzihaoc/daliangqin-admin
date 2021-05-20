import request from '@/utils/request'

let baseUrl = '/api/public'

export function login(data) {
  return request({
    url: 'login/phone',
    method: 'post',
    data,
    baseURL: baseUrl,
  })
}

export function logout(data) {
  return request({
    url: 'login/logout',
    method: 'post',
    baseURL: baseUrl ,
  })
}

export function status(data) {
  return request({
    url: 'login/status',
    method: 'get',
    baseURL: baseUrl,
  })
}

