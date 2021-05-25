import request from '@/utils/request'

export const httpAdminLog = {
    getLog(data) {
        return request({
            url: 'log',
            method: 'get',
            params: data,
        })
    },
}

