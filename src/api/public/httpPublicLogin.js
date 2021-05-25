import request from '@/utils/request'

export const httpPublicLogin = {
  login(data) {
    return request({
      url: 'login/phone',
      method: 'post',
      data,
      baseURL: '/api/public',
    })
  },
  logout(data) {
    return request({
      url: 'login/logout',
      method: 'post',
      baseURL: '/api/public',
    })
  },
  status(data) {
    return request({
      url: 'login/status',
      method: 'get',
      baseURL: '/api/public',
    })
  }
}


