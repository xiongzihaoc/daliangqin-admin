import request from '@/utils/request'

export const httpUpdateVersion = {
  list(data) {
    return request({
      url: 'update/version',
      method: 'get',
      params: data
    })
  },

  add(data) {
    return request({
      url: 'update/version',
      method: 'post',
      data
    })
  },
  edit(data) {
    return request({
      url: 'update/version/' + data.id,
      method: 'put',
      data
    })
  },
  deleteElement(data) {
    return request({
      url: 'update/version/' + data,
      method: 'delete',
    })
  }
}
