import Layout from '@/layout'

const operationsRouter = {
  path: '/operationsManagement',
  component: Layout,
  meta: {
    title: '运营管理',
    icon: 'banben'
  },
  children: [
    // banner
    {
      path: 'banner',
      name: 'banner',
      component: () => import('@/views/operationsManagement/banner'),
      meta: {
        title: '轮播图',
        icon: 'banner'
      }
    },
    // {
    //   path: 'search',
    //   name: 'search',
    //   component: () => import('@/views/operationsManagement/search/search'),
    //   redirect: "/operationsManagement/search/recommend",
    //   meta: {
    //     title: '搜索管理',
    //     icon: 'search'
    //   },
    //   children: [{
    //     path: "recommend",
    //     name: "recommend",
    //     component: () => import('@/views/operationsManagement/search/recommend'),
    //     meta: {
    //       title: '推荐搜索',
    //       icon: 'general'
    //     },
    //   },
    //   {
    //     path: "history",
    //     name: "history",
    //     component: () => import('@/views/operationsManagement/search/history'),
    //     meta: {
    //       title: '搜索历史',
    //       icon: 'general'
    //     },
    //   },
    //   ],
    // },
    // 问卷管理
    // {
    //   path: 'questionnaire',
    //   name: 'questionnaire',
    //   component: () => import('@/views/operationsManagement/questionnaire/questionnaire'),
    //   redirect: "/operationsManagement/questionnaire/questionnaireList",
    //   meta: {
    //     title: '问卷管理',
    //     icon: 'wenjuan'
    //   },
    //   children: [{
    //     path: "questionnaireList",
    //     name: "questionnaireList",
    //     component: () => import('@/views/operationsManagement/questionnaire/questionnaireList'),
    //     meta: {
    //       title: '问卷列表',
    //       icon: 'general'
    //     },
    //   },
    //   {
    //     path: "questionList",
    //     name: "questionList",
    //     component: () => import('@/views/operationsManagement/questionnaire/questionList'),
    //     meta: {
    //       title: '问题列表',
    //       icon: 'general'
    //     },
    //   },
    //   ],
    // },
    // 内容管理
    {
      path: 'news',
      name: 'news',
      component: () => import('@/views/operationsManagement/news'),
      meta: {
        title: '内容管理',
        icon: 'content',
      },
    },
    // {
    //   path: 'hido',
    //   name: 'hido',
    //   component: () => import('@/views/operationsManagement/hido'),
    //   meta: {
    //     title: '海多星球',
    //     icon: 'hido',
    //   },
    // },
    {
      path: 'sms',
      name: 'sms',
      component: () => import('@/views/operationsManagement/sms'),
      meta: {
        title: '短信管理',
        icon: 'duanxin'
      }
    },
    {
      path: 'music',
      name: 'music',
      component: () => import('@/views/operationsManagement/music'),
      meta: {
        title: '铃声设置',
        icon: 'music'
      }
    },
    {
      path: 'system',
      name: 'system',
      component: () => import('@/views/operationsManagement/system'),
      meta: {
        title: '全局配置',
        icon: 'peizhi'
      }
    },
    {
      path: 'ai',
      name: 'ai',
      component: () => import('@/views/operationsManagement/ai'),
      meta: {
        title: '心电数据',
        icon: 'aishuju'
      }
    },
  ]
}
export default operationsRouter
