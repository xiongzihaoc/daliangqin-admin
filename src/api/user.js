import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'login/phone',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_BASE_SECOND_API,
  })
}
export function getCode(data) {
  return request({
    url: 'sms/send',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_BASE_SECOND_API,
  })
}

export function logout(data) {
  return request({
    url: 'login/logout',
    method: 'post',
    baseURL: process.env.VUE_APP_BASE_SECOND_API  ,
  })
}
