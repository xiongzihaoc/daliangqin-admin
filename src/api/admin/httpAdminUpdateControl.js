import request from '@/utils/request'

/**
 * 更新管理/更新控制
 */
export const httpAdminUpdateControl = {
  getUpdateControl(data) {
    return request({
      url: 'update/control',
      method: 'get',
      params: data
    })
  },
  postUpdateControl(data) {
    return request({
      url: 'update/control',
      method: 'post',
      data
    })
  },
  putUpdateControl(data) {
    return request({
      url: 'update/control/' + data.id,
      method: 'put',
      data
    })
  },
  deleteUpdateControl(data) {
    return request({
      url: 'update/control/' + data,
      method: 'delete',
    })
  }
}
