import request from '@/utils/request'

export function uploadImg() {
  return request({
    url: '/upload/sign',
    method: 'post',
  })
}

