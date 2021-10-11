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
  postInformation(data) {
    return request({
      url: 'ai/information',
      method: 'post',
    })
  },
  // 话术
  getAiSpeech(){
    return request({
      url: 'ai/speech',
      method: 'get',
    })
  },
  getAiDownload(){
    return request({
      url: 'ai/information/download',
      method: 'get',
    })
  }
}
