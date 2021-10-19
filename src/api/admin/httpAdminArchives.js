import request from '@/utils/request'

/**
 * 用户档案
 */
export const httpAdminArchives = {
  postArchives(data) {
    return request({
      url: 'archives',
      method: 'post',
      data,

    })
  },
  putArchives(data, id) {
    return request({
      url: 'archives',
      method: 'put',
      data,
    })
  },
  putArchivesDoctor(data) {
    return request({
      url: 'archives/archivesDoctor',
      method: 'put',
      data,
    })
  },
}
