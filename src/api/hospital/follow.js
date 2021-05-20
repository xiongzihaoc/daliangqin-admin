import request from '@/utils/request'

export function list(data) {
  return request({
    url: 'follow',
    method: 'get',
    params: data
  })
}
