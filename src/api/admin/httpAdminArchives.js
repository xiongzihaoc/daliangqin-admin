import request from '@/utils/request'

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
      url: 'archives/putArchivesDoctor',
      method: 'put',
      data,
    })
  },
}
