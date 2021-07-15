import request from '@/utils/request'

export const httpAdminEquipmentFirm = {
  getEquipmentFirm(data) {
    return request({
      url: 'equipment/firm',
      method: 'get',
      params: data
    })
  },

}
