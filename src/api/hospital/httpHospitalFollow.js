import request from '@/utils/request'


export const httpHospitalFollow = {
  getFollowList(data) {
    return request({
      url: 'follow',
      method: 'get',
      params: data,
      baseURL: '/api/hospital',
    })
  }
}
