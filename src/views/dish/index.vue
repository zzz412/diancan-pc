<template>
	<div class="ordering">
		<!-- 头部 -->
		<div class="heading">菜品管理</div>
		<!-- 内容 -->
		<div class="content-view">
      <ProTable ref="proTable" :tabHeaders="tablist" :formList="formList" :api="getDishDataApi" :initParams="initParams">        
        <!-- 操作区域 -->
        <template #actionButton>
          <router-link to="/edit-dish">
            <el-button type="primary" icon="el-icon-plus" size="medium">新增</el-button>
          </router-link>
        </template>
        
        <!-- 上下架状态 -->
        <template #onsale="{ rows }">{{ rows.onsale ? '上架' : '下架' }}</template>

        <!-- 操作内容 -->
        <template #opera="{ rows }">
          <!-- 上架 - 下架  下架 - 上架 -->
          <el-button @click="changeState(rows.id, rows.onsale)" :type="rows.onsale ? 'danger' : 'success'" size="mini">{{ rows.onsale ? '下架' : '上架' }}</el-button>
          <el-button @click="$router.push(`/edit-dish?id=${rows.id}`)" size="mini">编辑</el-button>
        </template>
      </ProTable>
    </div>
	</div>
</template>

<script>
import ProTable from '@/components/ProTable'
import { getDishDataApi, getDishCateApi, changeDishDataApi } from '@/api/dish'
const stateEnum = [{ label: '全部', value: undefined }, { label: '上架', value: 1 }, { label: '下架', value: 0 }]

export default {
	name: 'Dish',
  components: { ProTable },
	data() {
		return {
      getDishDataApi,
			// 表头 { title: '创建时间', prop: 'a' }
			tablist: [
        { title: '菜品名称', prop: 'name' },
        { title: '菜品图片', prop: 'image', type: 'img' },
        { title: '类目', prop: 'category' },
        { title: '价格(元)', prop: 'unitprice' },
        { title: '单位', prop: 'unit' },
        { title: '菜品状态', prop: 'onsale' },
        { title: '创建时间', prop: 'time', type: 'link' },
        { title: '操作', prop: 'opera' },
      ],
      // 表单
      formList: [
        { type: 'text', prop: 'name', label: '菜品名' },
        { type: 'select', prop: 'cid', label: '菜品类目', enum: [] },
        { type: 'select', prop: 'onsale', label: '菜品状态', enum: stateEnum }
      ],
      // 默认查询参数
      initParams: { page: 1, pageSize: 5 }
		}
	},
  mounted () {
    this.init()
  },
  methods: {
    async init() {
      // 1. 发起请求
      const { data } = await getDishCateApi({ pageSize: 100 })
      // 2. 渲染数据
      const cateList = data.list.map(item => ({ label: item.label, value: item.id }))
      this.formList[1].enum = [{ label: '全部', value: undefined }, ...cateList] 
    },
    async changeState(id, state) {
      // 1. 发起请求
      await changeDishDataApi(id, state ? 0 : 1)
      // 2. 刷新数据
      this.$message.success('操作成功')
      this.$refs.proTable.search()
    }
  }
}
</script>

<style lang="scss" scoped></style>
