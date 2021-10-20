import request from '@/utils/request'

/**
 * 工作计划
 */
export const httpAdminTask = {
  getTask(data) {
    return request({
      url: 'task',
      method: 'get',
      params: data,
    })
  },
  postTask(data) {
    return request({
      url: 'task',
      method: 'post',
      data,
    })
  },
  putTask(data) {
    return request({
      url: 'task/' + data.id,
      method: 'put',
      data,
    })
  },
  deleteTask(id) {
    return request({
      url: 'task/' + id,
      method: 'delete',
    })
  },
}
