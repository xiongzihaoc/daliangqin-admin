import Layout from '@/layout'

const hospitalRouter = {
    path: '/hospitalManagement',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
        title: '医院管理',
        icon: 'banben'
    },
    children: [{
        path: 'hospital',
        name: 'hospital',
        component: () => import('@/views/appVersion/update'),
        meta: {
            title: '医院管理',
            icon: 'jilu'
        }
    },
    {
        path: 'doctor',
        name: 'doctor',
        component: () => import('@/views/appVersion/update'),
        meta: {
            title: '医生管理',
            icon: 'jilu'
        }
    },
    {
        path: 'work',
        name: 'work',
        component: () => import('@/views/appVersion/update'),
        meta: {
            title: '工作管理',
            icon: 'jilu'
        }
    },
    ]
}
export default hospitalRouter