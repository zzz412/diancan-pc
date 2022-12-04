import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
	// 登录页
	{ path: '/login', name: 'login', component: () => import('@/views/login'), meta: { title: '登录' } },
	// 修改店铺
	{ path: '/modify-info', name: 'modify-info', component: () => import('@/views/settings/modify-info'), meta: { title: '店铺设置' } },
	// 主页
	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		children: [
			// 数据分析
			{ path: '/dashboard', name: 'dashboard', component: () => import('@/views/dashboard'), meta: { title: '数据分析' } } ,
			// 店铺设置
			{ path: '/settings', name: 'settings', component: () => import('@/views/settings'), meta: { title: '店铺设置' } },
			// 订单管理
			{ path: '/order', name: 'order', component: () => import('@/views/order'), meta: { title: '订单管理' } },
			// 菜品管理
			{ path: '/dish', name: 'dish', component: () => import('@/views/dish'), meta: { title: '菜品管理' } },
			// 菜品编辑/新增
			{ path: '/edit-dish', name: 'edit-dish', component: () => import('@/views/dish/edit-dish'), meta: { activeMenu: '/dish', title: '菜品编辑' } },
			// 菜品类目
			{ path: '/category', name: 'category', component: () => import('@/views/category'), meta: { title: '菜品类目' } },
			// 桌号管理
			{ path: '/table-number', name: 'table-number', component: () => import('@/views/table-number'), meta: { title: '桌号管理' } }
		]
	},
	{ path: '/404', component: () => import('@/views/404') },
	{ path: '*', redirect: '/404' }
]

const router = new VueRouter({
	routes
})

export default router
