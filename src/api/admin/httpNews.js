import request from '@/utils/request'


export const httpNews = {
    list(data) {
        return request({
            url: 'news',
            method: 'get',
            params: data
        })
    } ,
    add(data) {
        return request({
            url: 'news',
            method: 'post',
            data
        })
    },
    edit(data) {
        return request({
            url: 'news/' + data.id,
            method: 'put',
            data
        })
    },
    deleteElement(data) {
        return request({
            url: 'news/' + data,
            method: 'delete',
        })
    }
}