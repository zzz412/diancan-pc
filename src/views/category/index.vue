<template>
	<div class="ordering">
		<!-- 头部 -->
		<div class="heading">菜品类目</div>
		<!-- 内容区域 -->
		<div class="content-view">
			<!-- 按钮区域 -->
			<div class="button-view">
				<el-button type="success" size="medium" @click="open">添加类目</el-button>
			</div>
			<!-- 表格区域 -->
			<div class="table-view">
				<!-- 表头 -->
				<div class="tab-list">
					<span v-for="(item, index) in tablist" :key="index">{{ item }}</span>
				</div>
				<!-- 表格 -->
				<div class="tab-table" v-for="(item, index) in tabData" :key="index">
					<div>{{ item.id }}</div>
					<div>{{ item.label }}</div>
					<div>{{ item.rank }}</div>
					<div>
						<el-button size="mini">编辑</el-button>
						<el-button type="danger" size="mini">删除</el-button>
					</div>
				</div>
				<!-- 分页 -->
				<el-pagination
					background
					layout="prev, pager, next"
					:hide-on-single-page="true"
					:page-size="pageable.pageSize"
					:total="pageable.total"
					:current-page="pageable.page"
          @current-change="pageChange"
				>
				</el-pagination>
			</div>
			<!-- 没有数据 -->
			<div class="nodatas" v-if="false">还没有菜品类目</div>
		</div>
	</div>
</template>

<script>
import { getDishCateApi } from '@/api/dish'

export default {
	name: 'Category',
	data() {
		return {
			// 表头
			tablist: ['类目id', '类目', '排序值', '操作'],
			// 表格数据
			tabData: [],
			// 分页数据
			pageable: {
        page: 1,
        pageSize: 2
      }
		}
	},
	mounted() {
		this.getTableData()
	},
	methods: {
		// 获取表格数据
		async getTableData() {
			// 1. 发起请求
      const { page, pageSize } = this.pageable
			const { data } = await getDishCateApi({ page, pageSize })
			// 2. 渲染数据
			this.tabData = data.list
			this.pageable = {
				page: data.page,
				total: data.total,
				pageSize: data.pageSize
			}
		},
    // 页码改变
    pageChange(page) {
      this.pageable.page = page
      this.getTableData()
    },
		// 添加类目
		open() {
			this.$prompt('请输入类目', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			})
				.then(({ value }) => {
					console.log(value)
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
}
</script>

<style lang="scss" scoped></style>
