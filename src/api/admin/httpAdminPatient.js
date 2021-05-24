import request from '@/utils/request'

export const httpAdminPatient = {
  getPatient(data) {
    return request({
      url: 'patient',
      method: 'get',
      params: data
    })
  },
  // 获取转诊医生列表
  getPatientTransfer(data) {
    return request({
      url: 'patient/transfer',
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
