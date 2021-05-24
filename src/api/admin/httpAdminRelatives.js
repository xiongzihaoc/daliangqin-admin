import request from '@/utils/request'

export const httpAdminRelatives = {
    getRelatives(data) {
        return request({
            url: 'relatives',
            method: 'get',
            params: data
        })
    }
}

