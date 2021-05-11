import Layout from '@/layout'

const appVersionRouter = {
    path: '/appVersion',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
        title: '版本更新',
        icon: 'banben'
    },
    children: [{
        path: 'update',
        name: 'update',
        component: () => import('@/views/appVersion/update'),
        meta: {
            title: '版本记录',
            icon: 'jilu'
        }
    },
    {
        path: 'control',
        name: 'control',
        component: () => import('@/views/appVersion/control'),
        meta: {
            title: '版本控制',
            icon: 'kongzhi'
        }
    }
    ]
}
export default appVersionRouter