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
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: "/example/table",
  //   meta: {
  //     title: '示例',
  //     icon: 'form'
  //   },
  //   children: [{
  //       path: 'table',
  //       name: 'docupload',
  //       component: () => import('@/views/examplee/table'),
  //       meta: {
  //         title: '表格',
  //         icon: 'form'
  //       }
  //     },
  //     {
  //       path: 'form',
  //       name: 'docupload',
  //       component: () => import('@/views/examplee/form'),
  //       meta: {
  //         title: '表单',
  //         icon: 'form'
  //       }
  //     }
  //   ]
  // },
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
    children: [{
      path: 'index',
      name: 'appVersion',
      component: () => import('@/views/appVersion/index'),
      meta: {
        title: '版本更新',
        icon: 'app'
      }
    }]
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
