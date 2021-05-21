import request from '@/utils/request'


export const httpAddressDoctor = {
    getAddressDoctor(data) {
        return request({
            url: 'address/doctor',
            method: 'get',
            params: data
        })
    }
}