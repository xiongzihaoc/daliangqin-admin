import request from '@/utils/request'

export const httpAdminHeartRate = {
  getHeartRate(data) {
    return request({
      url: 'equipment/heartRate',
      method: 'get',
      params: data
    })
  },
  postHeartRate(data) {
    return request({
      url: 'equipment/heartRate',
      method: 'post',
      data
    })
  },
  // 新增ai心电数据(假数据)
  postHeartRateAi(data) {
    return request({
      url: 'equipment/heartRate/ai',
      method: 'post',
      data
    })
  },
  // 新增ai心电数据展示建议
  getHeartRateAiSuggest(data) {
    return request({
      url: 'equipment/heartRate/ai/suggest/' + data.id,
      method: 'get',
    })
  },
  // 删除系统新增ai数据
  deleteHeartRateAiAll() {
    return request({
      url: 'equipment/heartRate/ai/all',
      method: 'delete',
    })
  },
  // 删除医院新增ai数据
  deleteHeartRateAi(hospitalId) {
    return request({
      url: 'equipment/heartRate/ai/' + hospitalId,
      method: 'delete',
    })
  },
  // 修改审核状态
  putHeartRateStatus(data) {
    return request({
      url: 'equipment/heartRate/checkStatus/' + data.id,
      method: 'put',
      data
    })
  },
  // 修改第三方检测报告
  putThirdReport(data) {
    return request({
      url: 'equipment/heartRate/thirdReport/' + data.recordId,
      method: 'put',
      data
    })
  },
  // 记录打印次数
  putHeartRatePrint(data) {
    return request({
      url: 'equipment/heartRate/print/' + data.recordId,
      method: 'put',
      data
    })
  },
  // 清空打印次数
  putHeartRateClear(data) {
    return request({
      url: 'equipment/heartRate/clear/' + data.id,
      method: 'put',
    })
  },
  // 批量清空打印次数
  putHeartRateClearBatch(data) {
    return request({
      url: 'equipment/heartRate/clear/batch',
      method: 'put',
      data
    })
  },
}
