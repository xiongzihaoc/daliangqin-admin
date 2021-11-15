import request from '@/utils/request'

/**
 * ai联系历史
 */
export const httpAdminAiHistory = {
  getAiHistoryList(data) {
    return request({
      url: 'ai/history',
      method: 'get',
      params: data
    })
  },
  getAddressDetail(data) {
    return request({
      url: 'address',
      method: 'get',
      params: data
    })
  },
  putAddress(data) {
    return request({
      url: 'address/' + data.id,
      method: 'put',
      data
    })
  },
  putAddressDefault(data) {
    return request({
      url: 'address/' + data.id + '/default',
      method: 'put',
    })
  },
  // ai任务期数
  getAiStageList(data){
    return request({
      url: 'ai/stageList',
      method: 'get',
      params: data,
    })
  },
  // ai任务名称
  getAiTaskNameList(data){
    return request({
      url: 'ai/taskNameList',
      method: 'get',
      params: data,
    })
  }
}
