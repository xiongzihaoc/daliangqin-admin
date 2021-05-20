import request from '@/utils/request'

export const httpPush = {
  list(data) {
    return request({
      url: 'push',
      method: 'get',
      params: data
    })
  },
  push(data) {
    return request({
      url: 'push',
      method: 'post',
      data
    })
  }

}
