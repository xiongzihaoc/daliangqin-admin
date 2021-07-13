import request from '@/utils/request'

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
    deleteRole(data) {
        return request({
            url: 'hospital/role/' + data,
            method: 'delete',
        })
    }


}