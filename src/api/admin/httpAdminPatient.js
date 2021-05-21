import request from '@/utils/request'

export const httpAdminPatient = {
  getPatient(data) {
    return request({
      url: 'patient',
      method: 'get',
      params: data
    })
  },
  postPatient(data) {
    return request({
      url: 'patient',
      method: 'post',
      data
    })
  },
  putPatient(data) {
    return request({
      url: 'patient/' + data.id,
      method: 'put',
      data
    })
  }

}
