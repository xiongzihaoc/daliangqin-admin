import request from '@/utils/request'

export const httpAdminNote = {
  getNotes(data) {
    return request({
      url: 'note',
      method: 'get',
      params: data
    })
  },
}


