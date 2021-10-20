import request from '@/utils/request'

/**
 * admin管理员权限
 */
export const httpAdminRole = {
  getAdminRole(data) {
    return request({
      url: 'adminRole',
      method: 'get',
      params: data
    })
  },
  // 获取登录用户信息
  getAdminRoleUserInfo(id) {
    return request({
      url: 'adminRole/' + id,
      method: 'get',
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
