import request from '@/utils/request'

export const httpAdminEquipmentMonitoring = {
    getEquipmentMonitoring(data) {
        return request({
            url: 'equipment/monitoring',
            method: 'get',
            params: data
        })
    },

}
