import request from '@/utils/request'

export const httpAdminChat = {
    getChat(data) {
        return request({
            url: 'chat',
            method: 'get',
            params: data
        })
    },
    getChatSubscribe(data) {
        return request({
            url: 'chat/subscribe',
            method: 'get',
            params: data
        })
    },

    postChat(data) {
        return request({
            url: 'chat',
            method: 'post',
            data
        })
    }
}