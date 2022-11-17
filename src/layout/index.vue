<template>
	<div class="layout-container">
		<!-- 顶部 -->
		<div class="sidebar-top">
			<div>zzz</div>
			<div>退出</div>
		</div>
		<!-- 左侧菜单 -->
		<div class="sidebar-cont">
			<el-menu :default-active="activeIndex" router class="el-menu-demo" mode="vertical">
				<div v-for="(item, index) in sidebar" :key="index">
					<el-menu-item :index="item.router" v-if="item.Subclass.length === 0">
						<i :class="item.icon"></i>
						<span slot="title">{{ item.title }}</span>
						<!-- v-if="item.tip == 'order' && dingdan > 0" -->
						<span v-if="false" slot="title" class="span-tips" style="margin-left: 2.6875rem">{{ dingdan }}</span>
					</el-menu-item>
				</div>
				<div style="height: 50px"></div>
			</el-menu>
		</div>
		<!-- 音频 -->
		<div class="audio">
			<audio src="https://diancan-1252107261.cos.accelerate.myqcloud.com/mp3/dingdantixing.mp3" ref="audio"></audio>
		</div>
		<!-- 右侧内容 -->
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'Layout',
		data() {
			return {
				sidebar: [
					{
						icon: 'el-icon-s-data',
						title: '数据分析',
						router: '/dashboard',
						tip: 'dashboard',
						Subclass: []
					},
					{
						icon: 'el-icon-bank-card',
						title: '订单管理',
						router: '/order',
						tip: 'order',
						Subclass: []
					},
					{
						icon: 'el-icon-tableware',
						title: '菜品管理',
						router: '/dish',
						tip: 'dish',
						Subclass: []
					},
					{
						icon: 'el-icon-menu',
						title: '菜品类目',
						router: '/category',
						tip: 'category',
						Subclass: []
					},
					{
						icon: 'el-icon-takeaway-box',
						title: '桌号管理',
						router: '/table-number',
						tip: 'table-number',
						Subclass: []
					},
					{
						icon: 'el-icon-setting',
						title: '店铺设置',
						router: '/settings',
						tip: 'settings',
						Subclass: []
					}
				]
			}
		},
    computed: {
      activeIndex() {
        const { meta, path } = this.$route
        return meta.activeMenu ? meta.activeMenu : path
      },
    }
	}
</script>

<style lang="scss" scoped>
	.layout-container {
		position: relative;
		width: 100%;
		min-height: 100vh;
		.sidebar-top {
			width: 100%;
			background: #ffffff;
			height: 50px;
			color: #333333;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 50;
			border-bottom: 1px solid #eee;
			box-sizing: border-box;
			div:nth-child(1) {
				padding-left: 22px;
				font-size: 18px;
			}
			div:nth-child(2) {
				padding-right: 22px;
				cursor: pointer;
			}
		}
		.sidebar-cont {
			position: fixed;
			top: 50px;
			left: 0;
			bottom: 50px;
			background: #ffffff;
			width: 200px;
			height: 100vh;
			color: #000000 !important;
			font-size: 16px;
			overflow-y: auto;
		}
		.el-menu {
			min-height: 100%;
		}
		.el-menu-item {
			font-size: 15px !important;
		}
		.el-submenu__title {
			font-size: 15px !important;
		}
		.span-tips {
			background-color: coral;
			width: 22px !important;
			height: 22px !important;
			border-radius: 50%;
			display: inline-table;
			line-height: 22px;
			text-align: center;
			font-size: 12px;
			color: #ffff;
		}
	}
</style>
