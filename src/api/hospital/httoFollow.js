import request from '@/utils/request'


export const httpFollow = {
  list(data) {
    return request({
      url: 'follow',
      method: 'get',
      params: data
    })
  }
}
