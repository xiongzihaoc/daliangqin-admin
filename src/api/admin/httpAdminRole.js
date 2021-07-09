import request from '@/utils/request'

export const httpAdminRole = {
  getAdminRole(data) {
    return request({
      url: 'adminRole',
      method: 'get',
      params: data
    })
  },
  postAdminRole(data) {
    return request({
      url: 'adminRole',
      method: 'post',
      data
    })
  },
  putAdminRole(data) {
    return request({
      url: 'adminRole/' + data.id,
      method: 'put',
      data
    })
  },
  deleteAdminRole(data) {
    return request({
      url: 'adminRole/' + data,
      method: 'delete',
    })
  }


}
