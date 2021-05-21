import request from '@/utils/request'

export const httpAdminUpdateVersion = {
  getUpdateVersion(data) {
    return request({
      url: 'update/version',
      method: 'get',
      params: data
    })
  },
  postUpdateVersion(data) {
    return request({
      url: 'update/version',
      method: 'post',
      data
    })
  },
  putUpdateVersion(data) {
    return request({
      url: 'update/version/' + data.id,
      method: 'put',
      data
    })
  },
  deleteUpdateVersion(data) {
    return request({
      url: 'update/version/' + data,
      method: 'delete',
    })
  }
}
