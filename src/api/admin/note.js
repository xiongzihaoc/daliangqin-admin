import request from '@/utils/request'

export function list(data) {
    return request({
        url: 'notes',
        method: 'get',
        params: data
    })
}
