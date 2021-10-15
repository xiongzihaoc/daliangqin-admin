import request from '@/utils/request'
// ai呼叫任务
export const httpAdminAiCall = {
  getAiCallList(data) {
    return request({
      url: 'ai/information',
      method: 'get',
      params: data
    })
  },
  postInformation(data) {
    return request({
      url: 'ai/information',
      method: 'post',
      data
    })
  },
  // 话术
  getAiSpeech() {
    return request({
      url: 'ai/speech',
      method: 'get',
    })
  },
  getAiDownload() {
    return request({
      url: 'ai/information/download',
      method: 'get',
    })
  },
  getInformationTask(data) {
    return request({
      url: 'ai/information/task',
      method: 'get',
      params: data
    })
  },
  // 外呼总人数
  getStatisticsList(data) {
    return request({
      url: 'ai/statistics',
      method: 'get',
      params: data
    })
  },
  // Ai外呼添加用户
  postAiStatistics(data) {
    return request({
      url: 'ai/statistics',
      method: 'post',
      data
    })
  },
  // 未完成列表
  getNotStatisticsList(data) {
    return request({
      url: 'ai/notStatistics',
      method: 'get',
      params: data
    })
  },
  // 已完成列表
  getAlreadyStatisticsList(data) {
    return request({
      url: 'ai/alreadyStatistics',
      method: 'get',
      params: data
    })
  },
}
