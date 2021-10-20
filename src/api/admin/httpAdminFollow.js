import request from '@/utils/request'

/**
 * 随访
 */
export const httpAdminFollow = {
  getFollow(data) {
    return request({
      url: 'follow',
      method: 'get',
      params: data,
    })
  },
  // 单条详情
  getFollowDetail(data) {
    return request({
      url: 'follow/' + data.id,
      method: 'get',
    })
  },
  postFollow(data) {
    return request({
      url: 'follow',
      method: 'post',
      data
    })
  },

  putFollow(data, id) {
    return request({
      url: 'follow/' + id,
      method: 'put',
      data
    })
  },
  deleteFollow(id) {
    return request({
      url: 'follow/' + id,
      method: 'delete',
    })

  },
}
