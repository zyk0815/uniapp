<template>
	<view class="myOrder bg-active-color">
		<splitline></splitline>
		<view class="order-header">
			<view class="header-item" :class="tabIndex===index?'active':''" v-for="(item,index) in tabList" :key="index"
				@click="handleTab(index)">{{item.name}}</view>
		</view>

		<block v-for="(tabItem,tabI) in tabList" :key="tabI">
			<view v-show="tabI===tabIndex">
				<view class="order-content" v-if="tabItem.list.length>0">
					<view v-for="(item,index) in tabItem.list" :key="index">
						<view class="order-goods">
							<view class="goods-status f-active-color">{{item.status}}</view>
							<view class="goods-item" v-for="(it,idx) in item.goods_item" :key="idx">
								<orderList :it="it" :idx="idx"></orderList>
							</view>
						</view>

						<splitline></splitline>

						<view class="total-price">
							订单金额: <text class="f-active-color">{{item.totalPrice}}</text> (包含运费￥0.00)
						</view>
					</view>


					<splitline></splitline>

					<view class="payment">
						<view class="payment-text">支付</view>
					</view>
				</view>

				<view class="no-order-content" v-else>
					<view class="">您还没有相关订单</view>
					<view class="go-home">去首页逛逛</view>
				</view>
			</view>

		</block>


	</view>
</template>

<script>
	import splitline from "@/components/common/splitline.vue"
	import orderList from "@/components/common/orderList.vue"
	export default {
		components: {
			splitline,
			orderList
		},
		data() {
			return {
				tabIndex: 0,
				clentHeight: 0,
				tabList: [{
						name: "全部",
						list: [{
							status: "待买家付款",
							totalPrice: "3999.00",
							goods_item: [{
									imgUrl: '../../static/img/hot2.jpg',
									name: '没有卖不出的产品,只有卖不出产品的人',
									attrs: '黑色',
									pprice: '299.00',
									num: '1'
								},
								{
									imgUrl: '../../static/img/hot2.jpg',
									name: '没有卖不出的产品,只有卖不出产品的人',
									attrs: '黑色',
									pprice: '299.00',
									num: '1'
								}
							]
						}, ]
					},
					{
						name: "待付款",
						list: []
					},
					{
						name: "代发货",
						list: []
					},
					{
						name: "待收货",
						list: []
					},
					{
						name: "待评价",
						list: []
					},
				]
			}
		},
		onReady() {

		},
		methods: {
			handleTab(index) {
				this.tabIndex = index
			}
		}
	}
</script>

<style scoped>
	.order-content {
		width: 100%;
		height: calc(100% - 120rpx);
	}

	.no-order-content {
		width: 100%;
		height: calc(100vh - 120rpx);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.go-home {
		padding: 6rpx 50rpx;
		border: 2rpx solid #49BDFB;
		color: #49BDFB;
		border-radius: 40rpx;
	}

	.order-header {
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-content: center;
		border-bottom: 2rpx solid #F7F7F7;
	}

	.header-item {
		flex: 1;
		text-align: center;
		line-height: 120rpx;
	}

	.active {
		border-bottom: 4rpx solid #49BDFB;
	}

	.goods-status {
		display: flex;
		justify-content: flex-end;
		background-color: #FFFFFF;
		padding: 16rpx;
	}

	.total-price {
		padding: 20rpx;
		display: flex;
		justify-content: flex-end;
		background-color: #FFFFFF;
	}

	.payment {
		padding: 20rpx;
		display: flex;
		justify-content: flex-end;
		background-color: #FFFFFF;
	}

	.payment-text {
		border: 2rpx solid #49BDFB;
		color: #49BDFB;
		padding: 6rpx 40rpx;
		border-radius: 30rpx;
	}
</style>
