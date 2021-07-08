module.exports = {
    current: 'test',
    local: {
        public: {
            target: '/api/public',
            source: 'http://127.0.0.1:8081/public'
        },
        paitent: {
            target: '/api/patient',
            source: 'http://127.0.0.1:8082/patient'
        },
        doctor: {
            target: '/api/doctor',
            source: 'http://127.0.0.1:8083/doctor'
        },
        hospital: {
            target: '/api/hospital',
            source: 'http://127.0.0.1:8084/hospital'
        },
        admin: {
            target: '/api/admin',
            source: 'http://127.0.0.1:8085/admin'
        },
    },
    test: {
        public: {
            target: '/api/public',
            source: 'http://test-api.daliangqing.com/public'
        },
        paitent: {
            target: '/api/patient',
            source: 'http://test-api.daliangqing.com/patient'
        },
        doctor: {
            target: '/api/doctor',
            source: 'http://test-api.daliangqing.com/doctor'
        },
        hospital: {
            target: '/api/hospital',
            source: 'http://test-api.daliangqing.com/hospital'
        },
        admin: {
            target: '/api/admin',
            source: 'http://test-api.daliangqing.com/admin'
        },
    },
    prod: {
        public: {
            target: '/api/public',
            source: 'http://api.daliangqing.com/public'
        },
        patient: {
            target: '/api/patient',
            source: 'http://api.daliangqing.com/patient'
        },
        doctor: {
            target: '/api/doctor',
            source: 'http://api.daliangqing.com/doctor'
        },
        hospital: {
            target: '/api/hospital',
            source: 'http://api.daliangqing.com/hospital'
        },
        admin: {
            target: '/api/admin',
            source: 'http://api.daliangqing.com/admin'
        },
    }
}