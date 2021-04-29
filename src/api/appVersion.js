import request from '@/utils/request'

export function list(data) {
    console.log(data);
  return request({
    url: 'update',
    method: 'get',
    params: data
  })
}
