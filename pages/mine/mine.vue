<template>
	<view class="mine">
		<uni-nav-bar class="head" title="个人中心" left-icon="gear" backgroundColor="transparent" @clickLeft="goConfig" />
		<view class="mine-head">
			<view class="header-main">
				<view class="header-logo">
					<image class="logo-img" :src="userInfo.imgUrl" mode=""></image>
					<view style="font-weight: 700;text-align: center;" class="">
						{{userInfo.name ||"用户名称"}}
					</view>
				</view>
			</view>
		</view>

		<view class="order">
			<view class="order-title" @click="goOrder">
				<view class="">
					我的订单
				</view>
				<view class="">
					全部订单 >
				</view>
			</view>
			<view class="order-list">
				<view class="order-item">
					<image class="order-img" src="../../static/img/order1.png" mode=""></image>
					<view class="">
						待付款
					</view>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/order2.png" mode=""></image>
					<view class="">
						待付款
					</view>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/order3.png" mode=""></image>
					<view class="">
						待付款
					</view>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/order4.png" mode=""></image>
					<view class="">
						待付款
					</view>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/order5.png" mode=""></image>
					<view class="">
						待付款
					</view>
				</view>
			</view>
		</view>

		<view class="mine-content" v-for="(item,index) in mineContent" :key="index">
			<view class="mine-item">
				<view class="">{{item.name}}</view>
				<view class=""> > </view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				mineContent: [{
						name: "我的收藏"
					}, {
						name: "我的收藏"
					},
					{
						name: "我的收藏"
					}, {
						name: "我的收藏"
					}, {
						name: "我的收藏"
					}, {
						name: "我的收藏"
					},
				]
			}
		},
		computed: {
			...mapState({
				loginStatus: state => state.user.loginStatus,
				userInfo: state => state.user.userInfo
			}),
		},
		methods: {
			goConfig() {
				uni.navigateTo({
					url: "/pages/config/config"
				})
			},
			goOrder() {
				uni.navigateTo({
					url: "/pages/myOrder/myOrder"
				})
			}
		}
	}
</script>

<style scoped>
	.head {
		margin-top: 50rpx;
	}

	.mine-head {
		background: url(../../static/img/mine1.jpg) no-repeat;
		width: 100%;
		height: 400rpx;
	}

	.header-main {
		position: relative;
	}

	.header-logo {
		position: absolute;
		width: 120rpx;
		left: 50%;
		margin-left: -60rpx;
		top: 120rpx;
	}

	.logo-img {
		width: 120rpx;
		height: 120rpx;
		border: 2rpx solid #CCCCCC;
		border-radius: 50%;
		background-color: #FFFFFF;
	}

	.order-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
	}

	.order-list {
		padding: 20rpx;
		display: flex;
	}

	.order-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.order-img {
		width: 66rpx;
		height: 66rpx;
	}

	.mine-content {
		margin: 20rpx 0;
		padding: 0 20rpx;
	}

	.mine-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 0;
		border-bottom: 2rpx solid #CCCCCC;
	}
</style>
