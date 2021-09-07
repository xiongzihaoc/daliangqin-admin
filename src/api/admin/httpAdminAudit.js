import request from '@/utils/request'

export const httpAdminAudit = {
    getAudit(data) {
        return request({
            url: 'audit/' + data.id,
            method: 'get',
        })
    },
    postAudit(data) {
        return request({
            url: 'audit/' + data.id,
            method: 'post',
            data,
        })
    },
}
