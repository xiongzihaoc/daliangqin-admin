import request from '@/utils/request'

export function list(data) {
    return request({
        url: 'news',
        method: 'get',
        params: data
    })
}

export function add(data) {
    return request({
        url: 'news',
        method: 'post',
        data
    })
}
export function edit(data) {
    return request({
        url: 'news/' + data.id,
        method: 'put',
        data
    })
}
export function deleteElement(data) {
    return request({
        url: 'news/' + data,
        method: 'delete',
    })
}

