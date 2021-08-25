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
}
