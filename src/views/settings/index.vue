<template>
	<div class="ordering">
		<!-- 内容 -->
		<el-descriptions title="店铺设置" :column="2">
			<template slot="extra">
				<el-button type="success" size="medium" @click="$router.push('/modify-info')">修改</el-button>
			</template>
			<el-descriptions-item label="店铺名称">{{ shopInfo.nickname }}</el-descriptions-item>
			<el-descriptions-item label="店铺地址">{{ shopInfo.address }}</el-descriptions-item>
			<el-descriptions-item label="店铺logo">
				<el-image class="set-image" :src="shopInfo.logo" />
			</el-descriptions-item>
		</el-descriptions>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'Settings',
  computed: {
    ...mapState(['shopInfo'])
  }
}
</script>

<style lang="scss" scoped>
.set-image {
	width: 240px;
	height: 240px;
	border-radius: 5px;
}
</style>
