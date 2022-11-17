<template>
	<div class="ordering">
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/dish' }">菜品管理</el-breadcrumb-item>
			<el-breadcrumb-item>添加菜品</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 内容区域 -->
		<div class="content-view-ten">
			<el-form label-position="top">
				<!-- 菜品类目 -->
				<el-form-item label="菜品类目">
					<el-select placeholder="请选择菜品类目">
						<el-option v-for="(item, index) in 10" :key="index" :label="item" :value="index"> </el-option>
					</el-select>
				</el-form-item>
				<!-- 菜品名称 -->
				<el-form-item label="菜品名称">
					<el-input type="text" placeholder="请输入菜品名称" clearable />
				</el-form-item>
				<!-- 菜品价格 -->
				<el-form-item label="菜品价格">
					<div class="upload-option">
						<el-input class="price-input" min="0" type="number" placeholder="请输入菜品价格" clearable />
						<el-select placeholder="请选择菜品单位">
							<el-option v-for="item in 10" :key="item" :label="item" :value="item"> </el-option>
						</el-select>
						<!-- 自定义单位 -->
						<el-input type="text" placeholder="请输入自定义单位" clearable />
						<div style="margin-right: 0 !important">
							<el-button type="success" size="medium" style="width: 100%; padding: 12px 20px">添加自定义单位</el-button>
						</div>
					</div>
				</el-form-item>
				<!-- 菜品图片 -->
				<el-form-item label="菜品图片">
					<el-upload
						action=""
						:limit="1"
						:multiple="false"
						name="file"
						list-type="picture-card"
						accept=".jpg,.png,.webp,.jfif,.jpeg"
					>
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="" />
					</el-dialog>
				</el-form-item>
			</el-form>
			<!-- 提交按钮 -->
			<div class="image-button">
				<el-button type="success" size="medium">上架菜品</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'EditDish',
		data() {
			return {
				// 图片预览弹窗
				dialogVisible: false,
				// 预览图
				dialogImageUrl: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import url('@/styles/overall.css');
  .content-view-ten {
    max-width: 800px;
    margin: 0 auto;
  }
	.upload-option {
		display: flex;
		align-items: center;
		justify-content: left;
		div {
			width: 25% !important;
			margin-right: 5px;
		}
	}
	.upload-option .el-button--success {
		width: 150px;
	}
</style>
