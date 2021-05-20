import request from '@/utils/request'

export function list(data) {
    return request({
        url: 'update/version',
        method: 'get',
        params: data
    })
}

export function add(data) {
    return request({
        url: 'update/version',
        method: 'post',
        data
    })
}
export function edit(data) {
    return request({
        url: 'update/version/' + data.id,
        method: 'put',
        data
    })
}
export function deleteElement(data) {
    return request({
        url: 'update/version/' + data,
        method: 'delete',
    })
}

