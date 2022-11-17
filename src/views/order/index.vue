<template>
	<div class="ordering">
		<div class="heading">订单管理</div>
		<!-- 内容区域 -->
		<div class="content-view">
			<!-- 查询 -->
			<div class="query-view">
				<!-- 状态 -->
				<div class="quotation-query">
					<div>交易状态</div>
					<div>
						<el-select v-model="stateValue" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
						</el-select>
					</div>
				</div>
				<!-- 按钮 -->
				<div class="quotation-query">
					<el-button type="success" size="medium">查询</el-button>
				</div>
			</div>
			<!-- 刷新按钮 -->
			<div class="button-view">
				<el-badge :value="dingdan" :max="99" class="item" type="warning">
					<el-button size="small">刷新订单</el-button>
				</el-badge>
			</div>
			<!-- 表格区域 -->
			<div class="table-view">
				<!-- 表头 -->
				<div class="tab-list">
					<span v-for="(item, index) in tablist" :key="index">{{ item }}</span>
				</div>
				<!-- 表格 -->
				<div class="tab-table-quo" v-for="(item, index) in tabData" :key="index">
					<div>{{ item.a }}</div>
					<div>{{ item.b }}</div>
					<div>{{ item.c }}</div>
					<div class="remarks-text">
						<el-button type="small" @click="dialogVisible = true">详细菜单</el-button>
					</div>
					<div>{{ item.a }}</div>
					<div>
						<el-button type="info" v-if="false" size="small">待接单</el-button>
						<el-button size="small" v-if="false" type="success" disabled>已结账</el-button>
						<el-button size="small" type="success">待结账</el-button>
					</div>
				</div>
				<!-- 分页 -->
				<el-pagination background layout="prev, pager, next" :hide-on-single-page="true" :total="100" />
			</div>
      <!-- 空状态 -->
		  <div v-if="false" class="nodatas">没有订单数据</div>
		</div>
		<!-- 订单详细弹窗 -->
		<el-dialog title="详细菜单" center :visible.sync="dialogVisible" width="500px">
			<div>
				<div class="menu-padd" v-for="(item, index) in 3" :key="index">
					<div class="Menu-details menu-span">
						<span>第{{ index }}次下单</span>
						<!-- <el-button size="mini" type="info">未接单</el-button> -->
					</div>
					<div v-for="(item2, index2) in 9" :key="index2">
						<div class="Menu-details menu-margin">
							<span>{{ item2 }}</span>
							<span>{{ item2 }}{{ index2 }}</span>
						</div>
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { staff } from '@/config/state-type'
	export default {
		name: 'Order',
		data() {
			return {
				// 交易状态项
				options: staff(),
				// 交易状态
				stateValue: '',
				// 订单提醒
				dingdan: 0,
				// 表头
				tablist: ['交易时间', '桌号', '用餐人数', '菜单详情', '交易金额(元)', '交易状态'],
				// 表格数据
				tabData: [
					{ a: '1', b: '2', c: '3', d: '4', e: '5' },
					{ a: '1', b: '2', c: '3', d: '4', e: '5' },
					{ a: '1', b: '2', c: '3', d: '4', e: '5' },
					{ a: '1', b: '2', c: '3', d: '4', e: '5' }
				],
				// 订单详情弹窗
				dialogVisible: false
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
		background-color: #00be06;
		color: #fff;
	}
	::v-deep .el-badge {
		margin-right: 5px;
	}
	.menu-padd {
		border-bottom: 1px solid #f8f8f8;
	}
	.Menu-details {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 50px;
	}
	.menu-margin {
		margin: 20px 0;
	}
	.menu-span {
		font-weight: bold;
		font-size: 15px;
		padding-top: 20px;
	}
	::v-deep .el-dialog {
		height: 600px;
		overflow-y: auto;
		border-radius: 5px !important;
	}
</style>
