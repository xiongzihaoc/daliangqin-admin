import request from '@/utils/request'

/**
 * 积分订单
 */
export const httpAdminOrder = {
  getOrder(data) {
    return request({
      url: 'order',
      method: 'get',
      params: data
    })
  },
  // 发货
  postOrderDelivery(data) {
    return request({
      url: `order/delivery/${data.id}`,
      method: 'post',
      data
    })
  },
  // 备注
  putOrder(data) {
    return request({
      url: `order/${data.id}`,
      method: 'put',
      data
    })
  },
}
