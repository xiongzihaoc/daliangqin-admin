import request from '@/utils/request'

export function list(data) {
  return request({
    url: 'hospital/info',
    method: 'get',
    params: data
  })
}

export function add(data) {
  return request({
    url: 'hospital/info',
    method: 'post',
    data
  })
}
export function deleteE(data) {
  return request({
    url: 'hospital/info/' + data,
    method: 'delete',
  })
}
