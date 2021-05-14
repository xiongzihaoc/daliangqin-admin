import Layout from '@/layout'

const hospitalRouter = {
    path: '/hospitalManagement',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
        title: '医院管理',
        icon: 'banben'
    },
    children: [
        // 医院管理
        {
            path: 'hospital',
            name: 'hospital',
            component: () => import('@/views/hospitalManagement/hospital'),
            meta: {
                title: '医院管理',
                icon: 'jilu'
            }
        },
        // 医生管理
        {
            path: 'doctor',
            name: 'doctor',
            component: () => import('@/views/hospitalManagement/doctor'),
            meta: {
                title: '医生管理',
                icon: 'jilu'
            }
        },
        // 工作管理
        {
            path: 'work',
            name: 'work',
            component: () => import('@/views/hospitalManagement/work/work'),
            redirect: "/hospitalManagement/work/plan",
            meta: {
                title: '工作管理',
                icon: 'jilu'
            },
            children: [
                {
                    path: "plan",
                    name: "plan",
                    component: () => import('@/views/hospitalManagement/work/plan'),
                    meta: {
                        title: '工作计划',
                        icon: 'kongzhi'
                    },
                },
                {
                    path: "followRecord",
                    name: "followRecord",
                    component: () => import('@/views/hospitalManagement/work/followRecord'),
                    meta: {
                        title: '随访记录',
                        icon: 'kongzhi'
                    },
                },
                {
                    path: "transfer",
                    name: "transfer",
                    component: () => import('@/views/hospitalManagement/work/transfer'),
                    meta: {
                        title: '转诊记录',
                        icon: 'kongzhi'
                    },
                },
                {
                    path: "leaveMessage",
                    name: "leaveMessage",
                    component: () => import('@/views/hospitalManagement/work/leaveMessage'),
                    meta: {
                        title: '留言问诊',
                        icon: 'kongzhi'
                    },
                },
                {
                    path: "note",
                    name: "note",
                    component: () => import('@/views/hospitalManagement/work/note'),
                    meta: {
                        title: '个人笔记',
                        icon: 'kongzhi'
                    },
                },
                {
                    path: "kpiIndex",
                    name: "kpiIndex",
                    component: () => import('@/views/hospitalManagement/work/kpiIndex'),
                    meta: {
                        title: 'KPI指标',
                        icon: 'kongzhi'
                    },
                },
                {
                    path: "kpiStatistics",
                    name: "kpiStatistics",
                    component: () => import('@/views/hospitalManagement/work/kpiStatistics'),
                    meta: {
                        title: 'KPI完成统计',
                        icon: 'kongzhi'
                    },
                },
                {
                    path: "prescription",
                    name: "prescription",
                    component: () => import('@/views/hospitalManagement/work/prescription'),
                    meta: {
                        title: '个性化处方',
                        icon: 'kongzhi'
                    },
                },
                {
                    path: "address",
                    name: "address",
                    component: () => import('@/views/hospitalManagement/work/address'),
                    meta: {
                        title: '收货地址',
                        icon: 'kongzhi'
                    },
                },
                {
                    path: "collect",
                    name: "collect",
                    component: () => import('@/views/hospitalManagement/work/prescription'),
                    meta: {
                        title: '收藏管理',
                        icon: 'kongzhi'
                    },
                },

            ],
        },
    ]
}
export default hospitalRouter