import request from '@/utils/request'

/**
 * 医师相关
 */
export const httpAdminDoctor = {
  // 获取医师列表
  getDoctor(data) {
    return request({
      url: 'doctor',
      method: 'get',
      params: data
    })
  },
  // 获取转诊医师列表
  getDoctoTransfer(data) {
    return request({
      url: 'doctor/transfer',
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
      url: 'doctor/' + data.id,
      method: 'put',
      data
    })
  },
  getDoctorDetail(userId) {
    return request({
      url: 'doctor/' + userId,
      method: 'get',
    })
  },
  deleteDoctor(id) {
    return request({
      url: 'doctor/' + id,
      method: 'delete',
    })

  },
}
