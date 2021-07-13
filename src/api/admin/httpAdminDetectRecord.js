import request from '@/utils/request'

export const httpAdminDetectRecord = {
  getDetectRecord(data) {
    return request({
      url: 'detect/record',
      method: 'get',
      params: data
    })
  },
  postDetectRecord(data) {
    return request({
      url: 'detect/record',
      method: 'post',
      data
    })
  },
  putDetectRecord(data) {
    return request({
      url: 'detect/record/' + data.id,
      method: 'put',
      data
    })
  },
  deleteDetectRecord(id) {
    return request({
      url: 'detect/record/' + id,
      method: 'delete',
    })
  }
}
