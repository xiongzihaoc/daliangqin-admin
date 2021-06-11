import request from '@/utils/request'

export const httpHospitalTemplate = {
    getTemplate(data) {
        return request({
            url: 'template',
            method: 'get',
            params: data,
            baseURL: '/api/hospital',
        })
    },
    postTemplate(data) {
        return request({
            url: 'template',
            method: 'post',
            data,
            baseURL: '/api/hospital',
        })
    },
    putTemplate(data) {
        return request({
            url: 'template/' + data.id,
            method: 'put',
            data,
            baseURL: '/api/hospital',
        })
    },
    deleteTemplate(id) {
        return request({
            url: 'template/' + id,
            method: 'delete',
            baseURL: '/api/hospital',
        })
    },
}

