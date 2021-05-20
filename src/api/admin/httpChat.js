import request from '@/utils/request'


export const httpChat = {
    list(data) {
        return request({
            url: 'chat',
            method: 'get',
            params: data
        })
    },
    add(data) {
        return request({
            url: 'chat',
            method: 'post',
            data
        })
    },
    edit(data) {
        return request({
            url: 'chat/' + data.id,
            method: 'put',
            data
        })
    },
    deleteE(data) {
        return request({
            url: 'chat/' + data,
            method: 'delete',
        })
    }
}