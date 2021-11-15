import request from '@/utils/request'

/**
 * ai通话情况汇总
 */
export const httpAdminAiProblem = {
  getAiProblemList(data) {
    return request({
      url: 'ai/problem',
      method: 'get',
      params: data
    })
  },
}
