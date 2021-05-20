import request from '@/utils/request'

export const httpSystem = {
    list(data) {
        return request({
            url: 'system',
            method: 'get',
            params: data
        })
    },
    add(data) {
        return request({
            url: 'system',
            method: 'post',
            data
        })
    },
    edit(data) {
        return request({
            url: 'system/' + data.id,
            method: 'put',
            data
        })
    },
    deleteElement(data) {
        return request({
            url: 'system/' + data,
            method: 'delete',
        })
    }


}