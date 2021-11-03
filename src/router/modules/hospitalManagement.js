import Layout from '@/layout'

const hospitalRouter = {
  path: '/hospitalManagement',
  component: Layout,
  redirect: "/hospitalManagement/hospital",
  meta: {
    title: '医院管理',
    icon: 'banben'
  },
  children: [
    // 医院管理
    {
      path: 'hospital',
      name: 'hospital',
      component: () => import('@/views/hospitalManagement/hospital'),
      meta: {
        title: '医院管理',
        icon: 'yiyuan'
      }
    },
    // 医生管理
    {
      path: 'doctor',
      name: 'doctor',
      component: () => import('@/views/hospitalManagement/doctor'),
      meta: {
        title: '医生管理',
        icon: 'doctor'
      }
    },
    // 工作管理
    {
      path: 'work',
      name: 'work',
      component: () => import('@/views/hospitalManagement/work/work'),
      redirect: "/hospitalManagement/work/task",
      meta: {
        title: '工作管理',
        icon: 'work'
      },
      children: [{
          path: "task",
          name: "task",
          component: () => import('@/views/hospitalManagement/work/task'),
          meta: {
            title: '工作计划',
            icon: 'general'
          },
        },
        {
          path: "follow",
          name: "follow",
          component: () => import('@/views/hospitalManagement/work/follow'),
          meta: {
            title: '随访记录',
            icon: 'general'
          },
        },
        {
          path: "followDetail",
          name: "followDetail",
          hidden: true,
          component: () => import('@/views/hospitalManagement/work/followDetail'),
          meta: {
            title: '随访详情',
            icon: 'general'
          },
        },
        // {
        //     path: "transfer",
        //     name: "transfer",
        //     component: () => import('@/views/hospitalManagement/work/transfer'),
        //     meta: {
        //         title: '转诊记录',
        //         icon: 'general'
        //     },
        // },
        {
          path: "chat",
          name: "chat",
          component: () => import('@/views/hospitalManagement/work/chat'),
          meta: {
            title: '留言板',
            icon: 'general'
          },
        },
        {
          path: "note",
          name: "note",
          component: () => import('@/views/hospitalManagement/work/note'),
          meta: {
            title: '个人笔记',
            icon: 'general'
          },
        },
        // {
        //     path: "kpiConfig",
        //     name: "kpiConfig",
        //     component: () => import('@/views/hospitalManagement/work/kpiConfig'),
        //     meta: {
        //         title: 'KPI指标',
        //         icon: 'general'
        //     },
        // },
        // {
        //     path: "kpiRecord",
        //     name: "kpiRecord",
        //     component: () => import('@/views/hospitalManagement/work/kpiRecord'),
        //     meta: {
        //         title: 'KPI完成统计',
        //         icon: 'general'
        //     },
        // },
        {
          path: "prescription",
          name: "prescription",
          component: () => import('@/views/hospitalManagement/work/prescription'),
          meta: {
            title: '健康教育处方',
            icon: 'general'
          },
        },
        {
          path: "address",
          name: "address",
          component: () => import('@/views/hospitalManagement/work/address'),
          meta: {
            title: '收货地址',
            icon: 'general'
          },
        },
        {
          path: "collect",
          name: "collect",
          component: () => import('@/views/hospitalManagement/work/collect'),
          meta: {
            title: '收藏管理',
            icon: 'general'
          },
        },
      ],
    },
    // AI随访
    {
      path: 'AI',
      name: 'AI',
      component: () => import('@/views/hospitalManagement/AI'),
      redirect: "/hospitalManagement/AI/task",
      meta: {
        title: 'AI随访',
        icon: 'AI'
      },
      children: [{
          path: "task",
          name: "task",
          component: () => import('@/views/hospitalManagement/AI/task'),
          meta: {
            title: '呼叫任务',
            icon: 'general'
          },
        },
        {
          path: "history",
          name: "history",
          component: () => import('@/views/hospitalManagement/AI/history'),
          meta: {
            title: '联系历史',
            icon: 'general'
          },
        },
        {
          path: "problem",
          name: "problem",
          component: () => import('@/views/hospitalManagement/AI/problem'),
          meta: {
            title: '通话情况汇总',
            icon: 'general'
          },
        },
        {
          path: "analysis",
          name: "analysis",
          component: () => import('@/views/hospitalManagement/AI/analysis/analysis'),
          meta: {
            title: '通话数据统计',
            icon: 'general'
          },
        }
      ],
    },
    {
      path: "addcall",
      name: "addcall",
      hidden: true,
      component: () => import('@/views/hospitalManagement/AI/callout/addcall'),
      meta: {
        title: '总外呼人数',
      },
    },
    {
      path: "notcall",
      name: "notcall",
      hidden: true,
      component: () => import('@/views/hospitalManagement/AI/callout/notcall'),
      meta: {
        title: '未呼人数',
      },
    },
    {
      path: "fulfillcall",
      name: "fulfillcall",
      hidden: true,
      component: () => import('@/views/hospitalManagement/AI/callout/fulfillcall'),
      meta: {
        title: '已呼人数',
      },
    },
    {
      path: "problemstatistics/:id",
      name: "problemstatistics",
      hidden: true,
      component: () => import('@/views/hospitalManagement/AI/callout/problem'),
      meta: {
        title: '问题统计',
      },
    },
  ]
}
export default hospitalRouter
