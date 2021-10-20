import request from '@/utils/request'

/**
 * 健康教育处方/处方内容
 */
export const httpAdminUserTemplate = {
  getUserTemplate(data) {
    return request({
      url: 'user/template',
      method: 'get',
      params: data,
    })
  },
  postUserTemplate(data) {
    return request({
      url: 'user/template',
      method: 'post',
      data,
    })
  },
  putUserTemplate(data) {
    return request({
      url: 'user/template/' + data.id,
      method: 'put',
      data,
    })
  },
  deleteUserTemplate(id) {
    return request({
      url: 'user/template/' + id,
      method: 'delete',
    })
  },
}
