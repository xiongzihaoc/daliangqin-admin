import Layout from '@/layout'

const archivesRouter = {
    path: '/archivesManagement',
    component: Layout,
    redirect: "/archivesManagement/patient",
    meta: {
        title: '用户管理',
        icon: 'banben'
    },
    children: [{
        path: 'patient',
        name: 'patient',
        component: () => import('@/views/archivesManagement/patient'),
        meta: {
            title: '档案管理',
            icon: 'user'
        }
    },
    {
        path: 'relatives',
        name: 'relatives',
        component: () => import('@/views/archivesManagement/relatives'),
        meta: {
            title: '亲属管理',
            icon: 'qinshu'
        }
    },
    {
        path: 'record',
        name: 'record',
        component: () => import('@/views/archivesManagement/record/record'),
        redirect: "/archivesManagement/record/bloodPressure",
        meta: {
            title: '设备监测',
            icon: 'equipment'

        },
        children: [
            {
                path: "heart",
                name: "heart",
                component: () => import('@/views/archivesManagement/record/heart'),
                meta: {
                    title: '心率监测',
                    icon: 'general',
                    noCache: true
                },
            },
            {
                path: "bloodPressure",
                name: "bloodPressure",
                component: () => import('@/views/archivesManagement/record/bloodPressure'),
                meta: {
                    title: '血压监测',
                    icon: 'general',
                    noCache: true
                },
            },
            {
                path: "glucose",
                name: "glucose",
                component: () => import('@/views/archivesManagement/record/glucose'),
                meta: {
                    title: '血糖监测',
                    icon: 'general'
                },
            },
            {
                path: "heartDetail",
                name: "heartDetail",
                hidden: true,
                component: () => import('@/views/archivesManagement/record/heartDetail'),
                meta: {
                    title: '监测报告',
                    icon: 'general'
                },
            },
        ],
    },
    {
        path: 'equipment',
        name: 'equipment',
        component: () => import('@/views/archivesManagement/equipment'),
        meta: {
            title: '设备管理',
            icon: 'shebei'
        }
    },
    {
        path: 'usage',
        name: 'usage',
        component: () => import('@/views/archivesManagement/usage'),
        meta: {
            title: '设备使用情况',
            icon: 'shebeiqingkuan'
        }
    },
    {
        path: 'monitoring',
        name: 'monitoring',
        component: () => import('@/views/archivesManagement/monitoring'),
        meta: {
            title: '医院监测统计',
            icon: 'exit-fullscreen'
        }
    },
    // {
    //     path: 'archivesAddress',
    //     name: 'archivesAddress',
    //     component: () => import('@/views/archivesManagement/address'),
    //     meta: {
    //         title: '收货地址',
    //         icon: "address"
    //     }
    // },
    {
        path: 'details',
        name: 'details',
        hidden: true,
        component: () => import('@/views/archivesManagement/patient/details'),
        meta: {
            title: '详细资料',
        }
    }
    ],
}
export default archivesRouter