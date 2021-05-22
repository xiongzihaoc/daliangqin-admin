import request from '@/utils/request'


export const httpAdminAddressPatient = {
    getAddressPatient(data) {
        return request({
            url: 'address/patient',
            method: 'get',
            params: data
        })
    }
}