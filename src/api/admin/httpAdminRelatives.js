import request from '@/utils/request'

/**
 * 亲属
 */
export const httpAdminRelatives = {
  getRelatives(data) {
    return request({
      url: 'relatives',
      method: 'get',
      params: data
    })
  }
}
