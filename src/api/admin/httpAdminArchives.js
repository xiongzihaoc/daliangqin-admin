import request from '@/utils/request'

export const httpAdminArchives = {
    getArchives(data) {
        return request({
            url: 'archives',
            method: 'get',
            params: data,
        })
    },
    postArchives(data) {
        return request({
            url: 'archives',
            method: 'post',
            data,

        })
    },
    putArchives(data) {
        return request({
            url: 'archives/' + data.id,
            method: 'put',
            data,
        })
    },
    deleteArchives(id) {
        return request({
            url: 'archives/' + id,
            method: 'delete',
        })
    },
}

