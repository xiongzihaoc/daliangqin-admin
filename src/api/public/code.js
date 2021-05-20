import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'code/tree',
    method: 'get',
    data,
    baseURL: process.env.VUE_APP_BASE_PUBLIC_API,
  })
}