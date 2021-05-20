import request from '@/utils/request'

export const httpSms = {
  list(data) {
    return request({
      url: 'sms',
      method: 'get',
      params: data
    })
  },
  // 重置
  reset(data) {
    return request({
      url: 'sms/reset',
      method: 'post',
      params: data
    })
  }

}
