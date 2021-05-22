import request from '@/utils/request'

export const httpAdminBanner = {
    getBanner(data) {
        return request({
            url: 'banner',
            method: 'get',
            params: data
        })
    },
    postBanner(data) {
        return request({
            url: 'banner',
            method: 'post',
            data
        })
    },
    putBanner(data) {
        return request({
            url: 'banner/' + data.id,
            method: 'put',
            data
        })
    },
    deleteBanner(id) {
        return request({
            url: 'banner/' + id,
            method: 'delete',
        })
    },
    postBannerSort(data) {
        return request({
            url: 'banner/' + data.id,
            method: 'post',
            data
        })
    }
}

