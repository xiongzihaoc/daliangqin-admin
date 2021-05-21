import request from '@/utils/request'

export function list(data) {
  return request({
    url: 'banner',
    method: 'post',
    data,
    baseURL: '/api/public',
  })
}

