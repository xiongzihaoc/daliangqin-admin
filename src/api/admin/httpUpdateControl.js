import request from '@/utils/request'

export const httpUpdateControl = {
  list(data) {
    return request({
      url: 'update/control',
      method: 'get',
      params: data
    })
  },
  add(data) {
    return request({
      url: 'update/control',
      method: 'post',
      data
    })
  },
  edit(data) {
    return request({
      url: 'update/control/' + data.id,
      method: 'put',
      data
    })
  },
  deleteElement(data) {
    return request({
      url: 'update/control/' + data,
      method: 'delete',
    })
  }
}
