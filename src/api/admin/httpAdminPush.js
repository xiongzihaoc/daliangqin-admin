import request from '@/utils/request'

export const httpAdminPush = {
  getPush(data) {
    return request({
      url: 'push',
      method: 'get',
      params: data
    })
  },
  postPush(data) {
    return request({
      url: 'push',
      method: 'post',
      data
    })
  }

}
