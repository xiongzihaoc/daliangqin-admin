import request from '@/utils/request'

/**
 * 铃声设置
 */
export const httpAdminMusic = {
    getMusic(data) {
        return request({
            url: 'music',
            method: 'get',
            params: data
        })
    },
    postMusic(data) {
        return request({
            url: 'music',
            method: 'post',
            data
        })
    },
    deleteMusic(data) {
        return request({
            url: 'music/' + data,
            method: 'delete',
        })
    },
}
