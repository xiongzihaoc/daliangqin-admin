import request from '@/utils/request'

export function list(data) {
    return request({
        url: 'address/doctor/page',
        method: 'get',
        params: data
    })
}
