import request from '@/utils/request'

/**
 * 海多官网
 */
export const httpAdminNewsHd = {
    getNews(data) {
        return request({
            url: 'news/hd',
            method: 'get',
            params: data
        })
    },
    postNews(data) {
        return request({
            url: 'news/hd',
            method: 'post',
            data
        })
    },
    putNews(data) {
        return request({
            url: 'news/hd/' + data.id,
            method: 'put',
            data
        })
    },
    deleteNews(data) {
        return request({
            url: 'news/hd/' + data,
            method: 'delete',
        })
    },
    postNewsSort(data) {
        return request({
            url: 'news/hd/' + data.id,
            method: 'post',
            params: data
        })
    }
}
