<template>
	<div class="ordering">
		<!-- 头部 -->
		<div class="heading">菜品管理</div>
		<!-- 内容 -->
		<div class="content-view">
      <ProTable :tabHeaders="tablist" :formList="formList" :api="getDishDataApi" :initParams="initParams">        
        <!-- 操作区域 -->
        <template #actionButton>
          <el-button type="info" size="medium">新增</el-button>
        </template>
        
        
        <!-- 操作内容 -->
        <template #opera>
          <el-button type="danger" size="mini">删除</el-button>
          <el-button  size="mini">编辑</el-button>
        </template>
      </ProTable>
    </div>
	</div>
</template>

<script>
import ProTable from '@/components/ProTable'
import { getDishDataApi } from '@/api/dish'
const cateEnum = [ { label: '全部', value: undefined }, { label: '荤菜', value: 1 }, { label: '素菜', value: 2 }]
const stateEnum = [{ label: '全部', value: undefined }, { label: '上架', value: 1 }, { label: '下架', value: 0 }]

export default {
	name: 'Dish',
  components: { ProTable },
	data() {
		return {
      getDishDataApi,
			// 表头 { title: '创建时间', prop: 'a' }
			tablist: [
        { title: '创建时间', prop: 'time', type: 'link' },
        { title: '类目', prop: 'category', type: 'tag' },
        { title: '菜品名称', prop: 'name' },
        { title: '菜品图片', prop: 'image', type: 'img' },
        { title: '价格(元)', prop: 'unitprice', type: 'tag' },
        { title: '操作', prop: 'opera' },
      ],
      // 表单
      formList: [
        { type: 'text', prop: 'name', label: '菜品名' },
        { type: 'select', prop: 'cid', label: '菜品类目', enum: cateEnum },
        { type: 'select', prop: 'onsale', label: '菜品状态', enum: stateEnum }
      ],
      // 默认查询参数
      initParams: { page: 1, pageSize: 2, name: '坤' }
		}
	}
}
</script>

<style lang="scss" scoped></style>
