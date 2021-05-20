import request from '@/utils/request'

export function list(data) {
    return request({
        url: 'patient',
        method: 'get',
        params: data
    })
}

export function add(data) {
    return request({
        url: 'patient',
        method: 'post',
        data
    })
}
export function edit(data) {
    return request({
        url: 'patient/' + data.id,
        method: 'put',
        data
    })
}

