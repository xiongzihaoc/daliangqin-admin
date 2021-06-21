import Layout from '@/layout'

const archivesRouter = {
    path: '/archivesManagement',
    component: Layout,
    redirect: 'noRedirect',
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
            title: '设备检测记录',
            icon: 'shebei'
        },
        children: [{
            path: "bloodPressure",
            name: "bloodPressure",
            component: () => import('@/views/archivesManagement/record/bloodPressure'),
            meta: {
                title: '血压检测',
                icon: 'general'
            },
        },
        {
            path: "demo",
            name: "demo",
            component: () => import('@/views/archivesManagement/record/demo'),
            meta: {
                title: 'DEMO',
                icon: 'general'
            },
        },
        ],
    },
    {
        path: 'archivesAddress',
        name: 'archivesAddress',
        component: () => import('@/views/archivesManagement/address'),
        meta: {
            title: '收货地址',
            icon: "address"
        }
    },
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