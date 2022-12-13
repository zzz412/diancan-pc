<template>
	<div class="pro-table">
    <!-- 查询区域 -> 根据配置自动生成表单-->
    <div class="query-view">
      <el-form :model="queryParams" inline label-width="100px">
        <el-form-item :label="item.label" v-for="item in formList" :key="item.prop">
          <!-- 文本框 -->
          <el-input v-if="item.type ==='text'" v-model="queryParams[item.prop]" placeholder="请输入" />
          <!-- 下拉框 -->
          <el-select v-if="item.type === 'select'" v-model="queryParams[item.prop]" placeholder="请选择">
            <el-option v-for="itemValue in item.enum" :key="itemValue.value" :label="itemValue.label" :value="itemValue.value" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <!-- 操作区域 -->
    <div class="button-view">
      <div class="lf">
        <!-- 操作-插槽 -->
        <slot name="actionButton"></slot>
      </div>
      <div class="rf" v-if="formList.length">
        <el-button size="medium" icon="el-icon-refresh" @click="reset">重置</el-button>
        <el-button type="success" size="medium" icon="el-icon-search" @click="search">查询</el-button>
      </div>
    </div>
    <!-- 表格区域 -->
    <div class="table-view">
      <!-- 表头 -->
      <div class="tab-list"><span v-for="item in tabHeaders" :key="item.title">{{ item.title }}</span></div>
      <!-- 表格 -->
      <div class="tab-table" v-for="item, index in tabData" :key="index">
        <!-- 数据 -->
        <div v-for="item2 in tabHeaders" :key="item2.title">
          <slot :name="item2.prop" :rows="item" :$index="index">
            <!-- 图片类型 -->
            <el-image v-if="item2.type === 'img'" class="tab-cover" :src="item[item2.prop]" />
            <!-- 标签类型 -->
            <el-tag v-else-if="item2.type === 'tag'" effect="dark" type="success" >{{ item[item2.prop] }}</el-tag>
            <!-- 链接类型 -->
            <el-link v-else-if="item2.type === 'link'" type="primary" :href="item[item2.prop]" target="_blank">{{ item[item2.prop] }}</el-link>
            <!-- 文本类型 -->
            <span v-else>{{ item[item2.prop] }}</span>
          </slot>
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

    <!-- 空状态区域 -->
  </div>
</template>

<script>
export default {
  name: 'ProTable',
  props: {
    // 表头 -> 数据结构[{ title: 表头名, prop: 字段名, type: text | img | link | tag }]
    tabHeaders: Array,
    // 表单 -> 数据结构[{ label: 选项名, prop: 字段名, type: text | number | select, enum: 选项 }]
    formList: { type: Array, default: () => [] },
    // 请求API
    api: Function,
    // 初始参数
    initParams: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      // 数据
      tabData: [],
      // 分页参数
      pageable: { page: 1, pageSize: 5 },
      // 总参数
      totalParams: {},
      // 查询参数
      queryParams: {}
    }
  },
  mounted () {
    // 合并初始参数
    // -- 页码参数
    const { page, pageSize } = this.initParams
    this.pageable.page = page
    this.pageable.pageSize = pageSize
    // -- 查询参数
    this.queryParams = { ...this.initParams }

    this.search()
  },
  methods: {
    // 加载数据
    async getTableData () {
      // 1. 发起请求
      Object.assign(this.totalParams, this.pageable)
      const { data } = await this.api(this.totalParams)
      // 2. 渲染数据
      this.tabData = data.list
      this.pageable = {
        page: data.page,
        pageSize: data.pageSize,
        total: data.total
      }
    },
    // 查询数据
    search() {
      // 1. 合并参数
      Object.assign(this.totalParams, this.queryParams)
      // 2. 加载数据
      this.getTableData()
    },
    // 重置数据
    reset() {
      // 还原页码
      this.pageable.page = 1
      // 还原查询数据
      this.queryParams = { ...this.initParams }
      // 查询
      this.search()
    },
    // 页面改变
    pageChange(index) {
      this.pageable.page = index
      this.getTableData()
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-cover {
  width: 64px;
  height: 64px;
  border-radius: 50%;
}
.button-view {
  display: flex;
  justify-content: space-between;
}
</style>
