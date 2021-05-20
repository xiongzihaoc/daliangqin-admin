import request from '@/utils/request'

export const httpUploadAliyun = {
  list(data) {
    return request({
      url: 'upload/aliyun/sign/admin',
      method: 'POST',
      params: data
    })
  }
}
