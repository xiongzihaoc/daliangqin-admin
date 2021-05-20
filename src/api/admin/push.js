import request from '@/utils/request'

export function list(data) {
    return request({
        url: 'push',
        method: 'get',
        params: data
    })
}
export function push(data) {
    return request({
        url: 'push',
        method: 'post',
        data
    })
}
