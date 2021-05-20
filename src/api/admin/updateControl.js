import request from '@/utils/request'

export function list(data) {
    return request({
        url: 'adminRole',
        method: 'get',
        params: data
    })
}

export function add(data) {
    return request({
        url: 'adminRole',
        method: 'post',
        data
    })
}
export function edit(data) {
    return request({
        url: 'adminRole/' + data.id,
        method: 'put',
        data
    })
}
export function deleteElement(data) {
    return request({
        url: 'adminRole/' + data,
        method: 'delete',
    })
}

