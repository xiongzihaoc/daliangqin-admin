import Layout from '@/layout'

const archivesRouter = {
    path: '/archivesManagement',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
        title: '档案管理',
        icon: 'banben'
    },
    children: [{
        path: 'patient',
        name: 'patient',
        component: () => import('@/views/archivesManagement/patient'),
        meta: {
            title: '用户管理',
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
        component: () => import('@/views/archivesManagement/record'),
        meta: {
            title: '设备检测记录',
            icon: 'shebei'
        }
    },
    {
        path: 'archivesAddress',
        name: 'archivesAddress',
        component: () => import('@/views/archivesManagement/address'),
        meta: {
            title: '收货地址',
            icon: "address"
        }
    }
    ],
}
export default archivesRouter