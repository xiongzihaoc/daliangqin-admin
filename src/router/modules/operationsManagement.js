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
        {
            path: 'banner',
            name: 'banner',
            component: () => import('@/views/appVersion/update'),
            meta: {
                title: 'banner',
                icon: 'jilu'
            }
        },
        {
            path: 'search',
            redirect: "/search/ccc",
            // component: () => import('@/views/appVersion/control'),
            meta: {
                title: '搜索管理',
                icon: 'kongzhi'
            },
            children: [
                {
                    path: "ccc",
                    name: "ccc",
                    component: () => import('@/views/appVersion/control'),
                }
            ],
        },
        {
            path: 'questionnaire',
            name: 'questionnaire',
            component: () => import('@/views/appVersion/control'),
            meta: {
                title: '问卷管理',
                icon: 'kongzhi'
            }
        }, {
            path: 'content',
            name: 'content',
            component: () => import('@/views/appVersion/control'),
            meta: {
                title: '内容管理',
                icon: 'kongzhi'
            }
        }, {
            path: 'mall',
            name: 'mall',
            component: () => import('@/views/appVersion/control'),
            meta: {
                title: '商城管理',
                icon: 'kongzhi'
            }
        }, {
            path: 'reason',
            name: 'reason',
            component: () => import('@/views/appVersion/control'),
            meta: {
                title: '取消原因',
                icon: 'kongzhi'
            }
        },
    ]
}
export default operationsRouter