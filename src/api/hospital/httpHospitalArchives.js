import request from '@/utils/request'

export const httpHospitalArchives = {
    getArchives(data) {
        return request({
            url: 'archives',
            method: 'get',
            params: data,
            baseURL: '/api/hospital',
        })
    },
    postArchives(data) {
        return request({
            url: 'archives',
            method: 'post',
            data,
            baseURL: '/api/hospital',
        })
    },
    putArchives(data) {
        return request({
            url: 'archives/' + data.id,
            method: 'put',
            data,
            baseURL: '/api/hospital',
        })
    },
    deleteArchives(id) {
        return request({
            url: 'archives/' + id,
            method: 'delete',
            baseURL: '/api/hospital',
        })
    },
}

