import request from '@/utils/request'

export const httpAdminAddressDoctor = {
    getAddressDoctor(data) {
        return request({
            url: 'address/doctor',
            method: 'get',
            params: data
        })
    },
    putAddress(data) {
        return request({    
            url: 'address/' + data.id,
            method: 'put',
            data
        })
    },
    putAddressDefault(data) {
        return request({
            url: 'address/default/' + data.id,
            method: 'put',
        })
    },
}