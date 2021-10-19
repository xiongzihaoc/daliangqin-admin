import request from '@/utils/request'

/**
 * 用户地址数据
 */
export const httpAdminAddressPatient = {
  getAddressPatient(data) {
    return request({
      url: 'address/patient',
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

}
