import Layout from '@/layout'

const systemRouter = {
  path: '/systemManagement',
  component: Layout,
  meta: {
    title: '系统管理',
    icon: 'banben'
  },
  children: [{
    path: 'adminRole',
    name: 'adminRole',
    component: () => import('@/views/systemManagement/adminRole'),
    meta: {
      title: '管理员管理',
      icon: 'admin'
    }
  },
  {
    path: 'log',
    name: 'log',
    component: () => import('@/views/systemManagement/operationLog'),
    meta: {
      title: '操作日志',
      icon: 'log'
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
    path: 'update',
    name: 'update',
    component: () => import('@/views/systemManagement/updateLog/update'),
    redirect: "/systemManagement/updateLog/updateControl",
    meta: {
      title: '更新管理',
      icon: 'gengxinmana'
    },
    children: [
      {
        path: 'updateControl',
        name: 'updateControl',
        component: () => import('@/views/systemManagement/updateLog/updateControl'),
        meta: {
          title: '更新控制',
          icon: 'kongzhi'
        }
      }, {
        path: 'updateVersion',
        name: 'updateVersion',
        component: () => import('@/views/systemManagement/updateLog/updateVersion'),
        meta: {
          title: '更新记录',
          icon: 'jilu'
        }
      },
    ],
  },
  ]
}
export default systemRouter
