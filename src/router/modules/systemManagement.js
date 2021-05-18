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
        component: () => import('@/views/systemManagement/administrator'),
        meta: {
            title: '管理员管理',
            icon: 'admin'
        }
    },
    {
        path: 'loginRecord',
        name: 'loginRecord',
        component: () => import('@/views/systemManagement/loginRecord'),
        meta: {
            title: '登录记录',
            icon: 'loginRecord'
        }
    },
    ]
}
export default systemRouter