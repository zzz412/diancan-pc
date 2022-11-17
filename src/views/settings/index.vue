<template>
	<div class="ordering">
		<!-- 内容 -->
		<el-descriptions title="店铺设置" :column="2">
			<template slot="extra">
				<el-button type="success" size="medium" @click="$router.push('/modify-info')">修改</el-button>
			</template>
			<el-descriptions-item label="店铺名称: ">kooriookami</el-descriptions-item>
			<el-descriptions-item label="店铺地址: ">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
			<el-descriptions-item label="店铺logo: ">
				<el-image class="set-image" src="http://zhi.zeng.pub/new-bee/upload/20221116_14262270.jpg" />
			</el-descriptions-item>
		</el-descriptions>
	</div>
</template>

<script>
	export default {
		name: 'Settings'
	}
</script>

<style lang="scss" scoped>
	.set-image {
		width: 240px;
		height: 240px;
		border-radius: 5px;
	}
</style>
