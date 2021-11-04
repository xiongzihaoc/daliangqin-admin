import request from '@/utils/request'

/**
 * 积分商品
 */
export const httpAdminGoods = {
  // 列表
  getGoods(data) {
    return request({
      url: 'goods',
      method: 'get',
      params: data
    })
  },
  // 新增
  postGoods(data) {
    return request({
      url: 'goods',
      method: 'post',
      data
    })
  },
  // 排序
  putGoodsSort(data) {
    return request({
      url: `goods/sort/${data.id}`,
      method: 'put',
      params: data
    })
  },
  // 状态
  putGoodsStatus(data) {
    return request({
      url: `goods/status/${data.id}`,
      method: 'put',
      params: data
    })
  },
  // 详情
  getGoodsDetails(data) {
    return requsest({
      url: `goods/${data.id}`,
      method: 'get',
      data
    })
  },
  // 编辑
  getGoodsEdit(data) {
    return requsest({
      url: `goods/${data.id}`,
      method: 'put',
    })
  },
}
