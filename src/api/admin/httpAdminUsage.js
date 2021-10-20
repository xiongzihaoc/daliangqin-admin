import request from '@/utils/request'

/**
 * 
 */
export const httpAdminUsage = {
    getUsage(data) {
        return request({
            url: 'usage',
            method: 'GET',
            params: data
        })
    }
}
