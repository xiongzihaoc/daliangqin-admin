import request from '@/utils/request'

/**
 * 设备
 */
export const httpAdminEquipmentFirm = {
  getEquipmentFirm(data) {
    return request({
      url: 'equipment/firm',
      method: 'get',
      params: data
    })
  },

}
