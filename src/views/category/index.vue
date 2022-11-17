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
					<div>{{ item.a }}</div>
					<div>{{ item.b }}</div>
				</div>
				<!-- 分页 -->
				<el-pagination background layout="prev, pager, next" :hide-on-single-page="true" :total="100"> </el-pagination>
			</div>
			<!-- 没有数据 -->
			<div class="nodatas" v-if="false">还没有菜品类目</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Category',
		data() {
			return {
				// 表头
				tablist: ['类目id', '类目'],
				// 表格数据
				tabData: [
					{ a: '1', b: '2', c: '3', d: '4', e: '5' },
					{ a: '1', b: '2', c: '3', d: '4', e: '5' },
					{ a: '1', b: '2', c: '3', d: '4', e: '5' },
					{ a: '1', b: '2', c: '3', d: '4', e: '5' }
				]
			}
		},
		methods: {
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
