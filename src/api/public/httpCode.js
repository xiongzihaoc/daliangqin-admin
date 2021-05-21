import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'code/tree',
    method: 'get',
    data,
    baseURL: '/api/public',
  })
}