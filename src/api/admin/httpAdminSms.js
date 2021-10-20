import request from '@/utils/request'

/**
 * 短信管理
 */
export const httpAdminSms = {
  getSms(data) {
    return request({
      url: 'sms',
      method: 'get',
      params: data
    })
  },
  // 重置
  postSmsReset(data) {
    return request({
      url: 'sms/reset',
      method: 'post',
      params: data
    })
  }

}
