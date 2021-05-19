import request from '@/utils/request'

export function list(data) {
    return request({
        url: 'chat',
        method: 'get',
        params: data
    })
}

export function add(data) {
    return request({
        url: 'chat',
        method: 'post',
        data
    })
}
export function edit(data) {
    return request({
        url: 'chat/' + data.id,
        method: 'put',
        data
    })
}
export function deleteE(data) {
    return request({
        url: 'chat/' + data,
        method: 'delete',
    })
}

