import request from '@/utils/request'

/**
 * 医院相关
 */
export const httpAdminHospital = {
  getHospital(data) {
    return request({
      url: 'hospital',
      method: 'get',
      params: data
    })
  },

  postHospital(data) {
    return request({
      url: 'hospital',
      method: 'post',
      data
    })
  },
  putHospital(data) {
    return request({
      url: 'hospital/' + data.id,
      method: 'put',
      data
    })
  },
  deleteHospital(data) {
    return request({
      url: 'hospital/' + data,
      method: 'delete',
    })
  }
}
