import request from '@/utils/request'

export function list(data) {
    return request({
        url: 'banner',
        method: 'get',
        params: data
    })
}

export function add(data) {
    return request({
        url: 'banner',
        method: 'post',
        data
    })
}
export function edit(data) {
    return request({
        url: 'banner/' + data.id,
        method: 'put',
        data
    })
}
export function deleteE(data) {
    return request({
        url: 'banner/' + data,
        method: 'delete',
    })
}

