import Layout from '@/layout'

const systemRouter = {
    path: '/systemManagement',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
        title: '系统管理',
        icon: 'banben'
    },
    children: [{
        path: 'administrator',
        name: 'administrator',
        component: () => import('@/views/appVersion/update'),
        meta: {
            title: '管理员管理',
            icon: 'jilu'
        }
    },
    {
        path: 'loginRecord',
        name: 'loginRecord',
        component: () => import('@/views/appVersion/update'),
        meta: {
            title: '登录记录',
            icon: 'jilu'
        }
    },
    ]
}
export default systemRouter