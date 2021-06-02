import request from '@/utils/request'

export const httpAdminArchives = {
    postArchives(data) {
        return request({
            url: 'archives',
            method: 'post',
            data,

        })
    },
    putArchives(data, id) {
        return request({
            url: 'archives/' + id,
            method: 'put',
            data,
        })
    },
}

