import request from '@/utils/request'

/**
 * 心率监测记录统计/图表数据
 */
export const httpAdminEquipmentHeartStatistical = {
  getEquipmentHeartStatistical(data) {
    return request({
      url: 'equipment/heart/statistical',
      method: 'get',
      params: data
    })
  },

}
