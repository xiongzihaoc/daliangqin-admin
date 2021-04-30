import request from '@/utils/request'

export function list(data) {
  return request({
    url: 'sms/record',
    method: 'get',
    data
  })
}

export function add(data) {
  return request({
    url: 'sms/record',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: 'sms/record',
    method: 'put',
    data
  })
}
// 重置
export function reset(data) {
  return request({
    url: 'sms/record/reset',
    method: 'put',
    data
  })
}
export function deleteE(data) {
  return request({
    url: 'sms/record/' + data,
    method: 'DELETE',
  })
}
