import request from '@/utils/request'

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
