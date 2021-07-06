import request from '@/utils/request'

export const httpAdminGlucose = {
    getGlucose(data) {
        return request({
            url: 'equipment/glucose',
            method: 'get',
            params: data
        })
    },
}

