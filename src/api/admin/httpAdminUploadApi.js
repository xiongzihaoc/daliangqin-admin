import request from '@/utils/request'

/**
 * 上传获取签名
 */
export const httpAdminUploadApi = {
  postAliyunSignAdmin(data) {
    return request({
      url: 'upload/aliyun/sign/admin',
      method: 'post',
      data
    })
  }
}
