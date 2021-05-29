import request from '@/utils/request'

export const httpAdminUploadApi = {
  postAliyunSignAdmin(data) {
    return request({
      url: 'upload/aliyun/sign/admin',
      method: 'post',
      data
    })
  }
}
