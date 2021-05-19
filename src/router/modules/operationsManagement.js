import Layout from '@/layout'

const operationsRouter = {
    path: '/operationsManagement',
    component: Layout,
    redirect: 'noRedirect',
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
        {
            path: 'search',
            name: 'search',
            component: () => import('@/views/operationsManagement/search/search'),
            redirect: "/operationsManagement/search/recommend",
            meta: {
                title: '搜索管理',
                icon: 'search'
            },
            children: [
                {
                    path: "recommend",
                    name: "recommend",
                    component: () => import('@/views/operationsManagement/search/recommend'),
                    meta: {
                        title: '推荐搜索',
                        icon: 'general'
                    },
                },
                {
                    path: "history",
                    name: "history",
                    component: () => import('@/views/operationsManagement/search/history'),
                    meta: {
                        title: '搜索历史',
                        icon: 'general'
                    },
                },
            ],
        },
        // 问卷管理
        {
            path: 'questionnaire',
            name: 'questionnaire',
            component: () => import('@/views/operationsManagement/questionnaire/questionnaire'),
            redirect: "/operationsManagement/questionnaire/questionnaireList",
            meta: {
                title: '问卷管理',
                icon: 'wenjuan'
            },
            children: [
                {
                    path: "questionnaireList",
                    name: "questionnaireList",
                    component: () => import('@/views/operationsManagement/questionnaire/questionnaireList'),
                    meta: {
                        title: '问卷列表',
                        icon: 'general'
                    },
                },
                {
                    path: "questionList",
                    name: "questionList",
                    component: () => import('@/views/operationsManagement/questionnaire/questionList'),
                    meta: {
                        title: '问题列表',
                        icon: 'general'
                    },
                },
            ],
        },
        // 内容管理
        {
            path: 'news',
            name: 'news',
            component: () => import('@/views/operationsManagement/news'),
            meta: {
                title: '内容管理',
                icon: 'content'
            },
        },
        // 商城管理
        {
            path: 'mall',
            name: 'mall',
            component: () => import('@/views/operationsManagement/mall/mall'),
            redirect: "/operationsManagement/mall/product ",
            meta: {
                title: '商城管理',
                icon: 'mall'
            },
            children: [
                {
                    path: "product",
                    name: "product",
                    component: () => import('@/views/operationsManagement/mall/product'),
                    meta: {
                        title: '单品管理',
                        icon: 'general'
                    },
                },
                {
                    path: "order",
                    name: "order",
                    component: () => import('@/views/operationsManagement/mall/order'),
                    meta: {
                        title: '订单管理',
                        icon: 'general'
                    },
                },
                {
                    path: "dispatch",
                    name: "dispatch",
                    component: () => import('@/views/operationsManagement/mall/dispatch'),
                    meta: {
                        title: '发货单',
                        icon: 'general'
                    },
                }, {
                    path: "returns",
                    name: "returns",
                    component: () => import('@/views/operationsManagement/mall/returns'),
                    meta: {
                        title: '退货单',
                        icon: 'general'
                    },
                },
            ],
        },
        // 取消原因
        {
            path: 'reason',
            name: 'reason',
            component: () => import('@/views/operationsManagement/cancelReason'),
            meta: {
                title: '取消原因',
                icon: 'reason'
            }
        },
        // 取消原因
        {
            path: 'sms',
            name: 'sms',
            component: () => import('@/views/operationsManagement/sms'),
            meta: {
                title: '短信管理',
                icon: 'duanxin'
            }
        },
    ]
}
export default operationsRouter