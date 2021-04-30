import request from '@/utils/request'

export function list(data) {
  return request({
    url: 'update',
    method: 'get',
    params: data
  })
}

export function add(data) {
  return request({
    url: 'update',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: 'update',
    method: 'put',
    data
  })
}

export function deleteE(data) {
  return request({
    url: 'update/' + data,
    method: 'delete',
  })
}
