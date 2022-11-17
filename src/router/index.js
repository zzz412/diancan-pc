import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'


Vue.use(VueRouter)

const routes = [
  // 登录页
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  // 修改店铺
  { path:'/modify-info', name:'modify-info', component: () => import('@/views/settings/modify-info') },
  // 主页
  { 
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      // 数据分析
      { path: '/dashboard', name: 'dashboard', component: () => import('@/views/dashboard') },
      // 店铺设置
      { path: '/settings', name: 'settings', component: () => import('@/views/settings') },
      // 订单管理
      { path: '/order', name: 'order', component: () => import('@/views/order') },
      // 菜品管理
      { path: '/dish', name: 'dish', component: () => import('@/views/dish') },
      // 菜品编辑/新增
      { path: '/edit-dish', name: 'edit-dish', component: () => import('@/views/dish/edit-dish'), meta: { activeMenu: '/dish' } },
      // 菜品类目
      { path: '/category', name: 'category', component: () => import('@/views/category') },
      // 桌号管理
      { path: '/table-number', name: 'table-number', component: () => import('@/views/table-number') },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
