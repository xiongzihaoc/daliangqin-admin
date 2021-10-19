import request from '@/utils/request'
// ai呼叫任务
export const httpAdminAiProblem = {
  getAiProblemList(data) {
    return request({
      url: 'ai/problem',
      method: 'get',
      params: data
    })
  },
}
