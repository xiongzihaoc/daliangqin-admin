import request from '@/utils/request'

/**
 * 医院权限
 */
export const httpAdminHospitalRole = {
    getRole(data) {
        return request({
            url: 'hospital/role',
            method: 'get',
            params: data
        })
    },
    postRole(data) {
        return request({
            url: 'hospital/role/' + data.hospitalId,
            method: 'post',
            data
        })
    },
    putRole(data) {
        return request({
            url: 'hospital/role/' + data.hospitalId + '/' + data.id,
            method: 'put',
            data
        })
    },
    deleteRole(data) {
        return request({
            url: 'hospital/role/' + data,
            method: 'delete',
        })
    }


}