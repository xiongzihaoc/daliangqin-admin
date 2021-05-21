import request from '@/utils/request'


export const httpAdminDoctor = {
  getDoctor(data) {
    return request({
      url: 'doctor',
      method: 'get',
      params: data
    })
  },
  postDoctor(data) {
    return request({
      url: 'doctor',
      method: 'post',
      data
    })
  },

  putDoctor(data) {
    return request({
      url: 'doctor',
      method: 'put',
      data
    })
  },
  deleteDoctor(id) {
    return request({
      url: 'doctor/' + id,
      method: 'delete',
    })

  },
}
