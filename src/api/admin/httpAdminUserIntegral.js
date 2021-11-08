import request from '@/utils/request'

/**
 * 积分用户
 */
export const httpAdminUserIntegral = {
  getUserIntegral(data) {
    return request({
      url: 'userIntegral',
      method: 'get',
      params: data
    })
  },
}
