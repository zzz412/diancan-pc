<template>
	<div class="ordering">
		<!-- 头部 -->
		<div class="heading">菜品类目</div>
		<!-- 内容区域 -->
		<div class="content-view">
			<!-- 按钮区域 -->
			<div class="button-view">
				<el-button type="success" size="medium" @click="openDialog">添加类目</el-button>
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
						<el-button size="mini" @click="openDialog(item)">编辑</el-button>
						<el-button type="danger" size="mini" @click="handleRemove(item.id)">删除</el-button>
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
			<div class="nodatas" v-if="!tabData.length">还没有菜品类目</div>
		</div>

    <!-- 弹窗区域 -->
    <el-dialog title="操作类目" width="30%" :visible.sync="dialogVisible" :before-close="clseDialog">
      <el-form label-width="80px" label-position="left">
        <el-form-item label="类目名">
          <el-input v-model="formInput.label"></el-input>
        </el-form-item>
        <el-form-item label="排序值">
          <el-input type="number" v-model="formInput.rank"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submitDialog">确 定</el-button>
      </div>
    </el-dialog>
	</div>
</template>

<script>
import { addDishCateApi, delDishCateApi, getDishCateApi, setDishCateApi } from '@/api/dish'

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
        pageSize: 5
      },
      // 是否显示弹窗
      dialogVisible: false,
      // 表单数据
      formInput: {}
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
    // 删除类目
    async handleRemove(id) {
      await delDishCateApi(id)
      this.getTableData()
    },
    // 显示弹窗
    openDialog(item) {
      if (item) {
        this.formInput = { ...item }
      }
      this.dialogVisible = true
    },
    // 关闭弹窗
    closeDialog() {
      this.dialogVisible = false
      this.formInput = {}
    },
    // 提交弹窗数据
    async submitDialog() {
      // 1. 提交表单数据
      const requestApi = this.formInput.id ? setDishCateApi : addDishCateApi
      await requestApi({ ...this.formInput, value: this.formInput.label } )
      // 2. 后续操作
      this.$message.success('操作成功')
      this.getTableData()
      this.closeDialog()
    }
	}
}
</script>

<style lang="scss" scoped></style>
