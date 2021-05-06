import request from '@/utils/request'

export function list(data) {
  return request({
    url: 'update/queryControl',
    method: 'get',
    params: data
  })
}
export function versionList(data) {
  return request({
    url: 'update',
    method: 'get',
    params: data
  })
}
export function add(data) {
  return request({
    url: 'update/addControl',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: 'update/editControl',
    method: 'put',
    data
  })
}