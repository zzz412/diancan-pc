<template>
	<div class="max-wid">
		<div class="heading">
			<p @click="$router.back()">返回上一页</p>
      <!-- 如何判断当前是 更新还是首次添加  ->  vuex中nickname -->
			<p class="heading-users">{{ title }}</p>
		</div>
		<!-- 店铺名称 -->
		<div class="image-view-title">
			<div class="image-list">店铺名称</div>
			<el-input v-model="formInput.nickname" placeholder="请输入店铺名称"></el-input>
		</div>
		<!-- 店铺地址 -->
		<div class="image-view-title">
			<div class="image-list">店铺地址</div>
			<el-input v-model="formInput.address" type="text" placeholder="请输入店铺地址"></el-input>
		</div>
		<!-- 店铺logo -->
		<div class="image-view-title">
			<div class="image-list">店铺logo</div>
			<div>
				<!-- 自定义组件的双向绑定 -->
				<upload v-model="formInput.logo"></upload>
			</div>
		</div>

		<!-- 提交 -->
		<div class="image-button">
			<el-button type="success" size="medium" @click="submitForm">提交</el-button>
		</div>
	</div>
</template>

<script>
import upload from '@/components/upload'
import { setInfoApi } from '@/api/auth'
import { mapState } from 'vuex'

export default {
	components: { upload },
	data() {
		return {
			formInput: {
				logo: ''
			}
		}
	},
  computed: {
    ...mapState(['shopInfo']),
    title () {
      return this.shopInfo.nickname ? '更新商家信息' : '新增商家信息'
    }
  },
  mounted() {
    // 判断是否有商家信息
    if (this.shopInfo.nickname) {
      this.formInput = { ...this.shopInfo }
    }
  },
	methods: {
		// 提交数据
		async submitForm() {
			// 1. 发起请求提交数据
			await setInfoApi(this.formInput)
      // 2. 操作成功
      this.$message.success('更新成功')
      // 2.1 重新拉取用户信息
      await this.$store.dispatch('getShopInfo')
      // 3. 跳转首页
      this.$router.replace('/')
		}
	}
}
</script>

<style scoped="scoped">
.max-wid {
	max-width: 800px;
	margin: 0 auto;
	background-color: #ffffff;
	padding: 0 40px;
}
.heading {
	font-size: 20px;
	font-weight: bold;
	text-align: center;
	padding-top: 50px;
	display: flex;
}
.heading-users {
	flex: 1;
}
.heading p:nth-child(1) {
	cursor: pointer;
}
.image-view-title {
	max-width: 800px;
	margin-bottom: 30px;
	margin-top: 30px;
}
.image-view-title img {
	object-fit: cover;
}
.image-list {
	margin-bottom: 20px;
}
.el-textarea >>> .el-textarea__inner {
	border: 0 !important;
}
.el-button--success {
	width: 150px;
}
.image-button {
	max-width: 800px;
	text-align: center;
	padding: 120px 0;
}
</style>
