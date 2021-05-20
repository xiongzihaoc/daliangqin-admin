import request from '@/utils/request'

export const httpAdminUploadApi = {
  postAliyunSignAdmin(adminUpload) {
    return request({
      url: 'upload/aliyun/sign/admin',
      method: 'POST',
      body: {
        adminUpload: adminUpload
      }
    })
  }
}
