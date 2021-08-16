import request from '@/utils/request'

export const httpAdminHeartRate = {
  getHeartRate(data) {
    return request({
      url: 'equipment/heartRate',
      method: 'get',
      params: data
    })
  },
  postHeartRate(data) {
    return request({
      url: 'equipment/heartRate',
      method: 'post',
      data
    })
  },
  putHeartRate(data) {
    return request({
      url: 'equipment/heartRate/' + data.id,
      method: 'put',
      data
    })
  },
  putHospitalName(data) {
    return request({
      url: 'equipment/heartRate/hospital/' + data.recordId,
      method: 'put',
      data
    })
  },
}
