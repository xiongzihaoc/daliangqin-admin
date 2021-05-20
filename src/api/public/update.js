import request from '@/utils/request'
// 校验版本更新
export function verify(data) {
  return request({
    url: 'update/check',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_BASE_PUBLIC_API,
  })
}