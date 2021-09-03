import request from '@/utils/request'

export const httpAdminAudit = {
    postAudit(data) {
        return request({
            url: 'audit/' + data.id,
            method: 'post',
            data,

        })
    },
}
