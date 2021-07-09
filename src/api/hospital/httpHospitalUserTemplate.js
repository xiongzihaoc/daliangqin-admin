import request from '@/utils/request'

export const httpHospitalUserTemplate = {
  getUserTemplate(data) {
    return request({
      url: 'user/template',
      method: 'get',
      params: data,
      baseURL: '/api/hospital',
    })
  },
  postUserTemplate(data) {
    return request({
      url: 'user/template',
      method: 'post',
      data,
      baseURL: '/api/hospital',
    })
  },
  putUserTemplate(data) {
    return request({
      url: 'user/template/' + data.id,
      method: 'put',
      data,
      baseURL: '/api/hospital',
    })
  },
  deleteUserTemplate(id) {
    return request({
      url: 'user/template/' + id,
      method: 'delete',
      baseURL: '/api/hospital',
    })
  },
}
