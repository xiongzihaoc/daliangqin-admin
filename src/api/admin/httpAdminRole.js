import request from '@/utils/request'

export const httpAdminRole = {
    list(data) {
        return request({
            url: 'adminRole',
            method: 'get',
            params: data
        })
    },
    add(data) {
        return request({
            url: 'adminRole',
            method: 'post',
            data
        })
    },
    edit(data) {
        return request({
            url: 'adminRole/' + data.id,
            method: 'put',
            data
        })
    },
    deleteElement(data) {
        return request({
            url: 'adminRole/' + data,
            method: 'delete',
        })
    }


}