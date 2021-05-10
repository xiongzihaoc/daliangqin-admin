import request from '@/utils/request'

export function list(data) {
  return request({
    url: 'newsRecord/adminList',
    method: 'get',
    params: data
  })
}
export function add(data) {
  return request({
    url: 'newsRecord/addNews',
    method: 'post',
    params: data
  })
}
export function edit(data) {
  return request({
    url: 'newsRecord/updateNews',
    method: 'post',
    params: data
  })
}
export function detail(data) {
  return request({
    url: 'newsRecord/detail',
    method: 'get',
    params: data
  })
}
export function deleteE(data) {
  return request({
    url: 'newsRecord/delete',
    method: 'get',
    params: data
  })
}
