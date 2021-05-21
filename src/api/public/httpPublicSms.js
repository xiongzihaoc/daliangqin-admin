import request from '@/utils/request'

export function getCode(data) {
    return request({
        url: 'sms/send',
        method: 'post',
        data,
        baseURL: '/api/public',
    })
}

export function verify(data) {
    return request({
        url: 'sms/check',
        method: 'post',
        data,
        baseURL: '/api/public',
    })
}






