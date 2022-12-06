<template>
	<!-- 自定义组件的双向绑定 -->
	<el-upload
		class="avatar-uploader"
		action="http://localhost:5001/admin/shopInfo/upload"
		name="ys"
		:headers="{ authorization: token }"
		:show-file-list="false"
		:on-success="handleAvatarSuccess"
		:before-upload="beforeAvatarUpload"
	>
		<img v-if="value" :src="value" class="avatar" />
		<i v-else class="el-icon-plus avatar-uploader-icon"></i>
	</el-upload>
</template>

<script>
	import { getToken } from '@/utils/auth'

	export default {
    props: {
      value: {
        type: String,
        default: ''
      }
    },
		data() {
			return {
				token: 'Bearer ' + getToken()
			}
		},
		methods: {
			handleAvatarSuccess(res, file) {
        this.$emit('input', res.data)
			},
			beforeAvatarUpload(file) {
				const isLt2M = file.size / 1024 / 1024 < 2

				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!')
				}
				return isLt2M
			}
		}
	}
</script>

<style lang="scss">
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409eff;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
