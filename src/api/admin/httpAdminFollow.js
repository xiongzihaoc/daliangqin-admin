import request from '@/utils/request'

export const httpAdminFollow = {
  getFollowList(data) {
    return request({
      url: 'follow',
      method: 'get',
      params: data,
    })
  }
}
