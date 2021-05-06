import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

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
        icon: 'shangchuan',
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
        icon: 'duanxin'
      }
    }]
  },
  {
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
        icon: 'tianchongxing-'
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
        icon: 'yiyuan'
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
        icon: 'jiaoseguanli'
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
        icon: 'edit-role'
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
