import request from '@/utils/request'

/**
 * kpi
 */
export const httpAdminKpiRecord = {
  getKpiRecord(data) {
    return request({
      url: 'kpi/record/statistical',
      method: 'get',
      params: data
    })
  },
}
