import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/p/login/login',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_BASE_API,
  })
}
export function getCode(data) {
  return request({
    url: '/p/send/sms',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_BASE_API,
  })
}
