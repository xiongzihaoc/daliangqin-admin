import request from '@/utils/request'

export function list(data) {
    return request({
        url: 'doctor/page',
        method: 'get',
        params: data
    })
}

export function hospitalList(data) {
    return request({
        url: 'hospital',
        method: 'get',
        params: data
    })
}
