import request from '@/utils/request'

/**
 * 积分商品
 */
export const httpAdminMallTask = {
  getMallTask(data) {
    return request({
      url: 'mallTask',
      method: 'get',
      params: data
    })
  },
  // 新增
  postAddMallTask(data) {
    return request({
      url: 'mallTask',
      method: 'post',
      data
    })
  },
  // 排序
  putMallSort(data) {
    return request({
      url: `mallTask/sort/${data.id}`,
      method: 'put',
      params: data
    })
  },
  // 状态
  putMallStatus(data) {
    return request({
      url: `mallTask/status/${data.id}`,
      method: 'put',
      params: data
    })
  },
  // 列表详情
  getMallStatus(data) {
    return request({
      url: `mallTask/${data.id}`,
      method: 'get',
      params: data
    })
  },
  // 编辑
  putMall(data) {
    return request({
      url: `mallTask/${data.id}`,
      method: 'put',
      data
    })
  },
}
