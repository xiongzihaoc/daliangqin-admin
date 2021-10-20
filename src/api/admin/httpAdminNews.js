import request from '@/utils/request'

/**
 * 新闻
 */
export const httpAdminNews = {
  getNews(data) {
    return request({
      url: 'news',
      method: 'get',
      params: data
    })
  },
  postNews(data) {
    return request({
      url: 'news',
      method: 'post',
      data
    })
  },
  putNews(data) {
    return request({
      url: 'news/' + data.id,
      method: 'put',
      data
    })
  },
  deleteNews(data) {
    return request({
      url: 'news/' + data,
      method: 'delete',
    })
  },
  postNewsSort(data) {
    return request({
      url: 'news/' + data.id,
      method: 'post',
      params: data
    })
  }
}
