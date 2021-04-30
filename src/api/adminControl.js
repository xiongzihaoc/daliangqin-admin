import request from '@/utils/request'

export function list(data) {
  return request({
    url: 'user',
    method: 'get',
    params: data
  })
}

export function add(data) {
  return request({
    url: 'user',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: 'user',
    method: 'put',
    data
  })
}
export function deleteE(data) {
  return request({
    url: 'user/' + data,
    method: 'DELETE',
  })
}
