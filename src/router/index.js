import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页',
        icon: 'dashboard',
        affix: true
      }
    }]
  },
  {
    path: '/docupload',
    component: Layout,
    children: [{
      path: 'docupload',
      name: 'docupload',
      component: () => import('@/views/docupload/index'),
      meta: {
        title: '文件上传',
        icon: 'upload'
      }
    }]
  },
  {
    path: '/message',
    component: Layout,
    children: [{
      path: 'index',
      name: 'message',
      component: () => import('@/views/message/index'),
      meta: {
        title: '短信管理',
        icon: 'message'
      }
    }]
  },
  {
    path: '/appVersion',
    component: Layout,
    redirect: '/appVersion/update',
    meta: {
      title: '版本更新',
      icon: 'app'
    },
    children: [{
        path: 'update',
        name: 'appVersion',
        component: () => import('@/views/appVersion/update'),
        meta: {
          title: '记录',
          icon: 'app'
        }
      },
      {
        path: 'control',
        name: 'appVersion',
        component: () => import('@/views/appVersion/control'),
        meta: {
          title: '控制',
          icon: 'app'
        }
      }
    ]
  },
  {
    path: '/adminControl',
    component: Layout,
    children: [{
      path: 'index',
      name: 'adminControl',
      component: () => import('@/views/adminControl/index'),
      meta: {
        title: '管理控制',
        icon: 'app'
      }
    }]
  },
  {
    path: '/hostpitalInfo',
    component: Layout,
    children: [{
      path: 'index',
      name: 'hostpitalInfo',
      component: () => import('@/views/hostpitalInfo/index'),
      meta: {
        title: '医院信息',
        icon: 'app'
      }
    }]
  },
  {
    path: '/hospitalRole',
    component: Layout,
    children: [{
      path: 'index',
      name: 'hospitalRole',
      component: () => import('@/views/hospitalRole/index'),
      meta: {
        title: '医院角色',
        icon: 'app'
      }
    }]
  },
  {
    path: '/adminRole',
    component: Layout,
    children: [{
      path: 'index',
      name: 'adminRole',
      component: () => import('@/views/adminRole/index'),
      meta: {
        title: '平台角色',
        icon: 'app'
      }
    }]
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
