

export default {
    install() {
        if(process.env.NODE_ENV === 'development') {
            return
        }
        if (window.location.protocol === 'http:') {
            window.location.href = 'https://' + window.location.host
        }
    }
}