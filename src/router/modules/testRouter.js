import Layout from '@/layout'

const testRouter = {
  path: '/test',
  component: Layout,
  redirect: 'noRedirect',
  meta: {
    title: '测试控件',
    icon: 'banben'
  },
  children: [{
    path: 'AliyunUpload',
    name: 'AliyunUpload',
    component: () => import('@/views/test/AliyunUpload'),
    meta: {
      title: '阿里云上传',
      icon: 'admin'
    }
  }]
}
export default testRouter
