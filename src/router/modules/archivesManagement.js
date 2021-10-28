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
                },
            },
            {
                path: "bloodPressure",
                name: "bloodPressure",
                component: () => import('@/views/archivesManagement/record/bloodPressure'),
                meta: {
                    title: '血压监测',
                    icon: 'general',
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
    // {
    //     path: 'equipment',
    //     name: 'equipment',
    //     component: () => import('@/views/archivesManagement/equipment'),
    //     meta: {
    //         title: '设备管理',
    //         icon: 'shebei'
    //     }
    // },
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
    //     path: 'statistical',
    //     name: 'statistical',
    //     component: () => import('@/views/archivesManagement/statistical/index'),
    //     meta: {
    //         title: '心率监测统计',
    //         icon: 'xinlvtongji'
    //     }
    // },
    // 商城模块
    // {
    //     path: 'mall',
    //     name: 'mall',
    //     component: () => import('@/views/archivesManagement/mall/index'),
    //     redirect: "/archivesManagement/mall/commodity",
    //     meta: {
    //         title: '积分商城',
    //         icon: 'mall',
    //     },
    //     children: [
    //         {
    //             path: "commodity",
    //             name: "commodity",
    //             component: () => import('@/views/archivesManagement/mall/commodity'),
    //             meta: {
    //                 title: '积分商品',
    //                 icon: 'general',
    //             },
    //         },
    //         {
    //             path: "task",
    //             name: "task",
    //             component: () => import('@/views/archivesManagement/mall/task'),
    //             meta: {
    //                 title: '积分任务',
    //                 icon: 'general',
    //             },
    //         },
    //         {
    //             path: "account",
    //             name: "account",
    //             component: () => import('@/views/archivesManagement/mall/account'),
    //             meta: {
    //                 title: '积分账户',
    //                 icon: 'general',
    //             },
    //         },
    //         {
    //             path: "particulars",
    //             name: "particulars",
    //             component: () => import('@/views/archivesManagement/mall/particulars'),
    //             meta: {
    //                 title: '积分明细',
    //                 icon: 'general',
    //             },
    //         },
    //         {
    //             path: "orde",
    //             name: "orde",
    //             component: () => import('@/views/archivesManagement/mall/orde'),
    //             meta: {
    //                 title: '积分订单',
    //                 icon: 'general',
    //             },
    //         },
    //     ],
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