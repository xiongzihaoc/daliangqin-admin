import request from '@/utils/request'

/**
 * 收藏
 */
export const httpAdminCollection = {
  getCollection(data) {
    return request({
      url: 'collection',
      method: 'get',
      params: data
    })
  },
}
