import request from '@/utils/request'

/**
 * 医师地址数据
 */
export const httpAdminAddressDoctor = {
  getAddressDoctor(data) {
    return request({
      url: 'address/doctor',
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
}
