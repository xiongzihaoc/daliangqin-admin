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
                icon: 'yiyuan'
            }
        },
        // 医生管理
        {
            path: 'doctor',
            name: 'doctor',
            component: () => import('@/views/hospitalManagement/doctor'),
            meta: {
                title: '医生管理',
                icon: 'doctor'
            }
        },
        // 工作管理
        {
            path: 'work',
            name: 'work',
            component: () => import('@/views/hospitalManagement/work/work'),
            redirect: "/hospitalManagement/work/task",
            meta: {
                title: '工作管理',
                icon: 'work'
            },
            children: [
                {
                    path: "task",
                    name: "task",
                    component: () => import('@/views/hospitalManagement/work/task'),
                    meta: {
                        title: '工作计划',
                        icon: 'general'
                    },
                },
                {
                    path: "follow",
                    name: "follow",
                    component: () => import('@/views/hospitalManagement/work/follow'),
                    meta: {
                        title: '随访记录',
                        icon: 'general'
                    },
                },
                {
                    path: "transfer",
                    name: "transfer",
                    component: () => import('@/views/hospitalManagement/work/transfer'),
                    meta: {
                        title: '转诊记录',
                        icon: 'general'
                    },
                },
                {
                    path: "chat",
                    name: "chat",
                    component: () => import('@/views/hospitalManagement/work/chat'),
                    meta: {
                        title: '留言问诊',
                        icon: 'general'
                    },
                },
                {
                    path: "note",
                    name: "note",
                    component: () => import('@/views/hospitalManagement/work/note'),
                    meta: {
                        title: '个人笔记',
                        icon: 'general'
                    },
                },
                {
                    path: "kpiIndex",
                    name: "kpiIndex",
                    component: () => import('@/views/hospitalManagement/work/kpiIndex'),
                    meta: {
                        title: 'KPI指标',
                        icon: 'general'
                    },
                },
                {
                    path: "kpiStatistics",
                    name: "kpiStatistics",
                    component: () => import('@/views/hospitalManagement/work/kpiStatistics'),
                    meta: {
                        title: 'KPI完成统计',
                        icon: 'general'
                    },
                },
                {
                    path: "prescription",
                    name: "prescription",
                    component: () => import('@/views/hospitalManagement/work/prescription'),
                    meta: {
                        title: '个性化处方',
                        icon: 'general'
                    },
                },
                {
                    path: "address",
                    name: "address",
                    component: () => import('@/views/hospitalManagement/work/address'),
                    meta: {
                        title: '收货地址',
                        icon: 'general'
                    },
                },
                {
                    path: "collect",
                    name: "collect",
                    component: () => import('@/views/hospitalManagement/work/prescription'),
                    meta: {
                        title: '收藏管理',
                        icon: 'general'
                    },
                },

            ],
        },
    ]
}
export default hospitalRouter