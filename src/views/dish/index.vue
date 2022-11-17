<template>
	<div class="ordering">
		<!-- 头部 -->
		<div class="heading">菜品管理</div>
		<!-- 内容 -->
		<div class="content-view">
			<!-- 按钮区域 -->
			<div class="button-view">
				<router-link :to="{ name: 'edit-dish' }">
					<el-button type="success" size="medium">添加菜品</el-button>
				</router-link>
			</div>
			<!-- 表格区域 -->
			<div class="table-view">
				<!-- 表头 -->
				<div class="tab-list">
					<span v-for="(item, index) in tablist" :key="index">{{ item }}</span>
				</div>
				<!-- 表格 -->
				<div class="tab-table" v-for="(item, index) in tableData" :key="index">
					<div>{{ item.a }}</div>
					<div>{{ item.b }}</div>
					<div>{{ item.c }}</div>
					<div>
						<el-image lazy class="elimg" fit="cover" />
					</div>
					<div>{{ item.d }}</div>
					<div>
						<el-button size="small">编辑</el-button>
						<el-button type="danger" size="small">下架</el-button>
						<el-button v-if="false" type="warning" size="small" disabled>已下架</el-button>
					</div>
				</div>
				<!-- 分页 -->
				<el-pagination background layout="prev, pager, next" :hide-on-single-page="true" :total="100" />
			</div>
			<!-- 没有数据 -->
			<div class="nodatas" v-if="false">还没有菜品数据</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Dish',
		data() {
			return {
				// 表头
				tablist: ['创建时间', '类目', '菜品名称', '菜品图片', '价格(元)', '操作'],
				// 表格数据
				tableData: [
					{ a: '1', b: '2', c: '3', d: '4', e: '5' },
					{ a: '1', b: '2', c: '3', d: '4', e: '5' },
					{ a: '1', b: '2', c: '3', d: '4', e: '5' },
					{ a: '1', b: '2', c: '3', d: '4', e: '5' }
				]
			}
		}
	}
</script>

<style lang="scss" scoped></style>
