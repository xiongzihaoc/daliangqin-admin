import request from '@/utils/request'

export function getCode(data) {
    return request({
        url: 'sms/send',
        method: 'post',
        data,
        baseURL: process.env.VUE_APP_API_TARGET_PUBLIC,
    })
}

export function verify(data) {
    return request({
        url: 'sms/check',
        method: 'post',
        data,
        baseURL: process.env.VUE_APP_API_TARGET_PUBLIC,
    })
}






