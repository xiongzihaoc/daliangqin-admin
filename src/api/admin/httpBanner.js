import request from '@/utils/request'

export const httpBanner = {
    list(data) {
        return request({
            url: 'banner',
            method: 'get',
            params: data
        })
    },
    add(data) {
        return request({
            url: 'banner',
            method: 'post',
            data
        })
    },
    edit(data) {
        return request({
            url: 'banner/' + data.id,
            method: 'put',
            data
        })
    },
    deleteElement(data) {
        return request({
            url: 'banner/' + data,
            method: 'delete',
        })
    }
}

