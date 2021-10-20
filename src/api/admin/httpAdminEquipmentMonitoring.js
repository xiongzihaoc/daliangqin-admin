import request from '@/utils/request'

/**
 * 医院监测统计
 */
export const httpAdminEquipmentMonitoring = {
    getEquipmentMonitoring(data) {
        return request({
            url: 'equipment/monitoring',
            method: 'get',
            params: data
        })
    },

}
