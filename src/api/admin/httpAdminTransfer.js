import request from '@/utils/request'

export const httpAdminTransfer = {
  getTransfer(data) {
    return request({
      url: 'transfer',
      method: 'get',
      params: data
    })
  },
  postTransfer(data) {
    return request({
      url: 'transfer',
      method: 'post',
      data
    })
  },
  putTransfer(data) {
    return request({
      url: 'transfer/' + data.id,
      method: 'put',
      data
    })
  },
  deleteTransfer(id) {
    return request({
      url: 'transfer/' + id,
      method: 'delete',
    })
  },
}
