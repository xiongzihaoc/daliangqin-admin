import request from '@/utils/request'

export function list(data) {
  return request({
    url: 'hospital/role',
    method: 'get',
    params: data
  })
}

export function add(data) {
  return request({
    url: 'hospital/role',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: 'hospital/role',
    method: 'put',
    data
  })
}

