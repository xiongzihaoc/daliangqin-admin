import request from '@/utils/request'

export function list(data) {
    return request({
        url: 'hospital',
        method: 'get',
        params: data
    })
}

export function add(data) {
    return request({
        url: 'hospital',
        method: 'post',
        data
    })
}
export function edit(data) {
    return request({
        url: 'hospital/' + data.id,
        method: 'put',
        data
    })
}
export function deleteElement(data) {
    return request({
        url: 'hospital/' + data,
        method: 'delete',
    })
}

