import request from '@/utils/request'

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
      params: data,
    })
  },
  postFollow(data) {
    return request({
      url: 'follow',
      method: 'post',
      data
    })
  },

  putFollow(data,id) {
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
