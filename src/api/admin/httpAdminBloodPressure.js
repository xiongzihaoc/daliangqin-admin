import request from '@/utils/request'

/**
 * 血压
 */
export const httpAdminBloodPressure = {
  getBloodPressure(data) {
    return request({
      url: 'equipment/bloodPressure',
      method: 'get',
      params: data
    })
  },
  postBloodPressure(data) {
    return request({
      url: 'equipment/bloodPressure',
      method: 'post',
      data
    })
  },
  putBloodPressurer(data) {
    return request({
      url: 'equipment/bloodPressure/' + data.id,
      method: 'put',
      data
    })
  },
  deleteBloodPressurer(id) {
    return request({
      url: 'equipment/bloodPressure/' + id,
      method: 'delete',
    })
  },

}
