import request from '@/utils/request'

export const httpAdminGlucose = {
    getGlucose(data) {
        return request({
            url: 'equipment/glucose',
            method: 'get',
            params: data
        })
    },
    postGlucose(data) {
        return request({
            url: 'equipment/glucose',
            method: 'post',
            data
        })
    },
    putGlucose(data) {
        return request({
            url: 'equipment/glucose/' + data.id,
            method: 'put',
            data
        })
    },
    deleteGlucose(id) {
        return request({
            url: 'equipment/glucose/' + id,
            method: 'delete',
        })
    },
}

