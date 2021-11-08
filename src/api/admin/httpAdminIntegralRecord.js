import request from '@/utils/request'

/**
 * 积分记录
 */
export const httpAdminIntegralRecord = {
  getIntegralRecord(data) {
    return request({
      url: 'integralRecord',
      method: 'get',
      params: data
    })
  },
}
