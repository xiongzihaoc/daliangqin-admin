import request from '@/utils/request'

export const httpPatient = {
  list(data) {
    return request({
      url: 'patient',
      method: 'get',
      params: data
    })
  },
  add(data) {
    return request({
      url: 'patient',
      method: 'post',
      data
    })
  },
  edit(data) {
    return request({
      url: 'patient/' + data.id,
      method: 'put',
      data
    })
  }

}
