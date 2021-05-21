import request from '@/utils/request'

export const httpAdminNote = {
  getNotes(data) {
    return request({
      url: 'notes',
      method: 'get',
      params: data
    })
  },
  postNotes(data) {
    return request({
      url: 'hospital',
      method: 'post',
      data
    })
  },
  putNotes(data) {
    return request({
      url: 'hospital/' + data.id,
      method: 'put',
      data
    })
  },
  deleteNotes(data) {
    return request({
      url: 'hospital/' + data,
      method: 'delete',
    })
  }
}


