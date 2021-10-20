import request from '@/utils/request'

/**
 * 日志
 */
export const httpAdminLog = {
  getLog(data) {
    return request({
      url: 'log',
      method: 'get',
      params: data,
    })
  },
}
