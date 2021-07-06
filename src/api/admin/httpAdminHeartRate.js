import request from '@/utils/request'

export const httpAdminHeartRate = {
    getHeartRate(data) {
        return request({
            url: 'equipment/heartRate',
            method: 'get',
            params: data
        })
    },
}

