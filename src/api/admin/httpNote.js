import request from '@/utils/request'

export const httpNote = {
  list(data) {
    return request({
      url: 'notes',
      method: 'get',
      params: data
    })
  }
}
