import request from '@/utils/request'

/**
 * 个人笔记
 */
export const httpAdminNote = {
  getNotes(data) {
    return request({
      url: 'note',
      method: 'get',
      params: data
    })
  },
}


