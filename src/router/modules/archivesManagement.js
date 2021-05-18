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
        path: 'user',
        name: 'user',
        component: () => import('@/views/archivesManagement/user'),
        meta: {
            title: '用户管理',
            icon: 'user'
        }
    },
    {
        path: 'kinsfolk',
        name: 'kinsfolk',
        component: () => import('@/views/archivesManagement/kinsfolk'),
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
      }  
    }
    ],
}
export default archivesRouter