import request from '@/utils/request'

/**
 * 心率报告审核
 */
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
