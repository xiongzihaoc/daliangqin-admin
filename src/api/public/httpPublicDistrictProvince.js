import request from '@/utils/request'

export const httpPublicDistrictProvince = {
  getProvince(data) {
    return request({
      url: 'district/province',
      method: 'get',
      baseURL: '/api/public',
    })
  },
  getArea(data) {
    return request({
      url: 'district/' + data.id,
      method: 'get',
      baseURL: '/api/public',
    })
  },
}



