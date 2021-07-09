import request from '@/utils/request'

export const httpHospitalTask = {
  getTask(data) {
    return request({
      url: 'task',
      method: 'get',
      params: data,
      baseURL: '/api/hospital',
    })
  },
  postTask(data) {
    return request({
      url: 'task',
      method: 'post',
      data,
      baseURL: '/api/hospital',
    })
  },
  putTask(data) {
    return request({
      url: 'task/' + data.id,
      method: 'put',
      data,
      baseURL: '/api/hospital',
    })
  },
  deleteTask(id) {
    return request({
      url: 'task/' + id,
      method: 'delete',
      baseURL: '/api/hospital',
    })
  },
}
