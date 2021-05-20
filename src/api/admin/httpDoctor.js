import request from '@/utils/request'


export const httpDoctor = {
  list(data) {
    return request({
      url: 'doctor',
      method: 'get',
      params: data
    })
  },
  add(data) {
    return request({
      url: 'doctor',
      method: 'post',
      data
    })
  },
  deleteElement(data) {
    return request({
      url: 'doctor/' + data,
      method: 'delete',
    })

  },
  hospitalList(data) {
    return request({
      url: 'hospital',
      method: 'get',
      params: data
    })
  }
}
