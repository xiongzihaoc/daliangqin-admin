import request from '@/utils/request'

export const httpAdminHeartRate = {
    getHeartRate(data) {
        return request({
            url: 'equipment/heartRate',
            method: 'get',
            params: data
        })
    },
    postHeartRate(data) {
        return request({
            url: 'equipment/heartRate',
            method: 'post',
            data
        })
    },
    putHeartRate(data) {
        return request({
            url: 'equipment/heartRate/' + data.id,
            method: 'put',
            data
        })
    },
    deleteHeartRate(id) {
        return request({
            url: 'equipment/heartRate/' + id,
            method: 'delete',
        })
    },
}

