import request from '@/utils/request'

export const httpHospital = {
  list(data) {
    return request({
      url: 'hospital',
      method: 'get',
      params: data
    })
  },

  add(data) {
    return request({
      url: 'hospital',
      method: 'post',
      data
    })
  },
  edit(data) {
    return request({
      url: 'hospital/' + data.id,
      method: 'put',
      data
    })
  },
  deleteElement(data) {
    return request({
      url: 'hospital/' + data,
      method: 'delete',
    })
  }
}
