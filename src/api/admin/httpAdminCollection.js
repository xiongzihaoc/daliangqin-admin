import request from '@/utils/request'

export const httpAdminCollection = {
  getCollection(data) {
    return request({
      url: 'collection',
      method: 'get',
      params: data
    })
  },
}
