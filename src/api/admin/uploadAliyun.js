import request from '@/utils/request'

export function list(data) {
    return request({
        url: 'upload/aliyun/sign/admin',
        method: 'POST',
        params: data
    })
}
