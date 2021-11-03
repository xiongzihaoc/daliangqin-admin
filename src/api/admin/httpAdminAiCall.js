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
  // 编辑
  putInformation(data){
    return request({
      url: 'ai/information/' + data.robotCallJobId,
      method: 'put',
      data
    })
  },
  // 删除
  deleteInformation(data){
    return request({
      url: 'ai/information/' + data.taskId,
      method: 'delete',
    })
  },
  // 开始任务
  getInformationStart(data){
    return request({
      url: 'ai/information/start',
      method: 'get',
      params: data
    })
  },
  // 暂停任务
  getSuspendTask(data){
    return request({
      url: 'ai/suspendTask/' + data.robotCallJobId,
      method: 'get',
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
  // 获取通话详情
  getAlCallDetailList(data) {
    return request({
      url: 'ai/callDetail/' + data.callRecordId + '/' + data.phone,
      method: 'get',
    })
  },
  // 复制ai随访任务
  getInformationCopy(data) {
    return request({
      url: 'ai/information/copy',
      method: 'get',
      params: data
    })
  },
  // 删除ai外呼总人数
  deleteInformation(data) {
    return request({
      url: `ai/information/${data.taskId}`,
      method: 'delete',
    })
  },
  // 删除外呼用户
  getInformationUser(data) {
    return request({
      url: `ai/deleteAiUser/${data.robotCallJobId}/${data.calledPhoneNumber}`,
      method: 'get',
    })
  },
  // 编辑外呼用户
  putInformationUser(data) {
    return request({
      url: `ai/editUser/${data.robotCallJobId}`,
      method: 'put',
      data
    })
  },
  // 导出ai已呼人数
  getAlreadyStatisticsExcel(data) {
    return request({
      url: 'ai/alreadyStatisticsExcel',
      method: 'get',
      params: data
    })
  },
  
  // 查询问题名称
  getProblemList(data) {
    return request({
      url: `ai/problem/${data.robotCallJobId}`,
      method: 'get',
      params: data
    })
  },
  
}
