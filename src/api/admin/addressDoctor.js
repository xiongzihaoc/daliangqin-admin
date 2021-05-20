import request from '@/utils/request'

export function list(data) {
    return request({
        url: 'address/doctor',
        method: 'get',
        params: data
    })
}
