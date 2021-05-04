import request from '@/utils/request'

export function list(data) {
  return request({
    url: 'sms/record',
    method: 'get',
    params: data
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
    method: 'get',
    params: data
  })
}
export function query(data) {
  return request({
    url: 'sms/record/' + data,
    method: 'get',
  })
}
