import request from '@/utils/request'


export const httpAdminChat = {
    getChat(data) {
        return request({
            url: 'chat',
            method: 'get',
            params: data
        })
    },
    // postChat(data) {
    //     return request({
    //         url: 'chat',
    //         method: 'post',
    //         data
    //     })
    // },
    // putChat(data) {
    //     return request({
    //         url: 'chat/' + data.id,
    //         method: 'put',
    //         data
    //     })
    // },
    deleteChat(id) {
        return request({
            url: 'chat/' + id,
            method: 'delete',
        })
    }
}