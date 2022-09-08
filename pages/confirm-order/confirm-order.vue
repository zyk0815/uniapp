<template>
	<view class="confirmOrder bg-active-color">
		<splitline></splitline>
		<view class="order-map" v-if="path.length" @click="goPath">
			<view class="order-title">
				<view style="font-weight: 700;">收件人:{{path[0].name}}</view>
				<view class="">{{path[0].tel}}</view>
			</view>
			<view class="order-city">
				收货地址:{{path[0].city}}{{path[0].details}}
			</view>
		</view>
		<view v-else class="order-map" style="text-align: center;" @click="goPath">请选择默认地址 > </view>

		<view class="goods-list">
			<view class="goods-item" v-for="(it,idx) in orderData" :key="idx">
				<orderList :it="it" :idx="idx"></orderList>
			</view>
		</view>

		<view class="order-foot">
			<view class="f-active-color">合计:￥{{totalCount}}</view>
			<view class="confirm" @click="goPayment">提交订单</view>
		</view>
	</view>
</template>

<script>
	import orderList from "@/components/common/orderList.vue"
	import splitline from "@/components/common/splitline.vue"
	import {
		mapGetters,
		mapState,
		mapActions
	} from "vuex"
	export default {
		components: {
			splitline,
			orderList
		},
		computed: {
			...mapState({
				orderId: state => state.order.orderId
			}),
			...mapGetters(["defaultPath", "totalCount"])
		},
		onLoad(options) {
			if (this.defaultPath.length) {
				this.path = this.defaultPath
			}
			uni.$on('goConfirm', (data => {
				this.$set(this.path, 0, data)
			}))

			this.orderData = JSON.parse(options.detail)
		},
		onUnload() {
			uni.$off('goConfirm', () => {
				console.log("移除监听")
			})
		},
		data() {
			return {
				path: [],
				orderData: []
			}
		},
		methods: {
			...mapActions(["deteleGoodFn"]),
			goPath() {
				uni.navigateTo({
					url: '/pages/pathConfig/pathConfig?flag=confirm'
				})
			},
			goPayment() {
				uni.navigateTo({
					url: `/pages/payment/payment?totalCount=${this.totalCount}`
				})
				this.deteleGoodFn()
				this.orderData[0].orderStatus = "2"
			}
		}
	}
</script>

<style scoped>
	.confirmOrder {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.order-map {
		padding: 20rpx;
		background-color: #FFFFFF;
		line-height: 40rpx;
	}

	.order-title {
		display: flex;
		justify-content: space-between;
	}

	.order-foot {
		width: 100%;
		height: 80rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #FFFFFF;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.confirm {
		margin-left: 20rpx;
		color: #FFFFFF;
		background-color: #42B7FB;
		padding: 10rpx 30rpx;
	}
</style>
