import request from '@/utils/request'

export function list(data) {
  return request({
    url: 'doctor/page',
    method: 'get',
    params: data
  })
}
export function add(data) {
  return request({
    url: 'doctor',
    method: 'post',
    data
  })
}
// 获取医院列表
export function hospitalList(data) {
  return request({
    url: 'hospital',
    method: 'get',
    params: data
  })
}
