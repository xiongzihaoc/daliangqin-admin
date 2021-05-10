import request from '@/utils/request'

export function list(data) {
  return request({
    url: 'sms/record',
    method: 'get',
    params: data
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

