import request from '@/utils/request'
// ai呼叫任务
export const httpAdminAiCall = {
  getAiCallList(data) {
    return request({
      url: 'ai/information',
      method: 'get',
      params: data
    })
  },
}
