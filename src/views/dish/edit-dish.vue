<template>
	<div class="ordering" v-loading="loading">
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/dish' }">菜品管理</el-breadcrumb-item>
			<el-breadcrumb-item>{{ id ? '修改菜品' : '添加菜品' }} </el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 内容区域 -->
		<div class="content-view-ten">
			<el-form label-position="top">
				<!-- 菜品类目 -->
				<el-form-item label="菜品类目">
					<el-select v-model="formInput.cid" placeholder="请选择菜品类目">
						<el-option v-for="cate in cateList" :key="cate.id" :label="cate.label" :value="cate.id"> </el-option>
					</el-select>
				</el-form-item>
				<!-- 菜品名称 -->
				<el-form-item label="菜品名称">
					<el-input v-model="formInput.name" type="text" placeholder="请输入菜品名称" clearable />
				</el-form-item>
				<!-- 菜品价格 -->
				<el-form-item label="菜品价格">
					<div class="upload-option">
						<el-input
							v-model="formInput.unitprice"
							class="price-input"
							min="0"
							type="number"
							placeholder="请输入菜品价格"
							clearable
						/>
						<el-select v-model="formInput.unit" placeholder="请选择菜品单位">
							<el-option v-for="unit in unitList" :key="unit.id" :label="unit.label" :value="unit.value"> </el-option>
							<el-option label="自定义单位" value="自定义"> </el-option>
						</el-select>
						<!-- 自定义单位 -->
            <template v-if="formInput.unit === '自定义'">
              <el-input v-model="unit" type="text" placeholder="请输入自定义单位" clearable />
              <div style="margin-right: 0 !important">
                <el-button @click="addUnit" type="success" size="medium" style="width: 100%; padding: 12px 20px">添加自定义单位</el-button>
              </div>
            </template>
					</div>
				</el-form-item>
				<!-- 菜品状态 -->
				<el-form-item label="菜品状态">
					<el-radio-group v-model="formInput.onsale">
						<el-radio-button :label="1">上架</el-radio-button>
						<el-radio-button :label="0">下架</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<!-- 排序值 -->
				<el-form-item label="排序值">
					<el-input v-model="formInput.rank" type="number" placeholder="请输入排序值" />
				</el-form-item>
				<!-- 菜品图片 -->
				<el-form-item label="菜品图片">
          <Upload v-model="formInput.image"></Upload>
        </el-form-item>
			</el-form>
			<!-- 提交按钮 -->
			<div class="image-button">
				<el-button type="success" size="medium" @click="submitForm">{{id ? '修改菜品' : '上架菜品'}}</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import Upload from '@/components/upload'
import { addDishDataApi, addDishUnitApi, getDishCateApi, getDishDataInfoApi, getDishUnitApi, setDishDataApi } from '@/api/dish'

export default {
	name: 'EditDish',
  components: { Upload },
	data() {
		return {
      id: '',
      loading: true,
			// 表单数据
			formInput: { rank: 1, onsale: 1 },
      // 类目列表
      cateList: [],
      // 单位列表
      unitList: [],
      // 自定义单位名
      unit: ''
		}
	},
  mounted () {
    // 获取页面参数
    this.id = this.$route.query.id
    if (this.id) this.loadDish()
    this.init()
  },
  methods: {
    // 初始化数据【类目、单位】vue2  vue3
    async init() {
      this.loading = true
      // 1. 发起请求
      const [res1, res2] = await Promise.all([getDishCateApi({ pageSize: 100 }), getDishUnitApi()])
      // 2. 渲染数据
      this.cateList = res1.data.list
      this.unitList = res2.data
      this.loading = false
    },
    // 加载菜品信息
    async loadDish() {
      // 1. 发起请求
      const { data } = await getDishDataInfoApi(this.id)
      this.formInput = data
    },
    // 提交数据
    async submitForm () {
      // 1. 收集数据
      const cate = this.cateList.find(cate => cate.id === this.formInput.cid)
      const data = { ...this.formInput, category: cate.label }
      // 2. 提交数据
      this.id ? await setDishDataApi(data) : await addDishDataApi(data)
      this.$message.success('操作成功')
      // 3. 跳转页面
      this.$router.push('/dish')
    },
    // 添加单位
    async addUnit() {
      // 1. 发起请求
      await addDishUnitApi({ label: this.unit, value: this.unit })
      // 2. 重新拉取单位
      this.init()
      this.formInput.unit = ''
      this.unit = ''
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
