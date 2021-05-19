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
    {
      path: 'updateControl',
      name: 'updateControl',
      component: () => import('@/views/systemManagement/updateVersion/updateControl'),
      meta: {
        title: '更新控制',
        icon: 'kongzhi'
      }
    }, {
      path: 'updateVersion',
      name: 'updateVersion',
      component: () => import('@/views/systemManagement/updateVersion/updateVersion'),
      meta: {
        title: '更新版本',
        icon: 'jilu'
      }
    },
  ]
}
export default systemRouter
