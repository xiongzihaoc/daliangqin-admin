import request from '@/utils/request'
// ai列表接口
export const httpAdminAiHistory = {
  getAiHistoryList(data) {
    return request({
      url: 'ai/history',
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
