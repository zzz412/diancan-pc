<template>
	<div class="max-wid">
		<div class="heading">
			<p>返回上一页</p>
			<p class="heading-users">修改店铺信息</p>
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
			<el-button type="success" size="medium">提交</el-button>
		</div>
	</div>
</template>

<script>
  import upload from '@/components/upload'
	export default {
    components: { upload },
    data() {
      return {
        formInput: {
          logo: ''
        }
      }
    },
    methods: {
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
