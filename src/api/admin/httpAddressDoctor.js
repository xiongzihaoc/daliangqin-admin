import request from '@/utils/request'


export const httpAddressDoctor = {
    list(data) {
        return request({
            url: 'address/doctor',
            method: 'get',
            params: data
        })
    }
}