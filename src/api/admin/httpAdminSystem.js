import request from '@/utils/request'

/**
 * 全局配置
 */
export const httpAdminSystem = {
  getSystem(data) {
    return request({
      url: 'system',
      method: 'get',
      params: data
    })
  },
  postSystem(data) {
    return request({
      url: 'system',
      method: 'post',
      data
    })
  },
  putSystem(data) {
    return request({
      url: 'system/' + data.id,
      method: 'put',
      data
    })
  },
  deleteSystem(data) {
    return request({
      url: 'system/' + data,
      method: 'delete',
    })
  }


}
