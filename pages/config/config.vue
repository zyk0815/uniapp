<template>
	<view class="config">
		<view class="config-title">
			账号管理
		</view>
		<view class="config-item">
			<view class="">
				修改密码
			</view>
			<view class="">
				>
			</view>
		</view>
		<view class="config-item">
			<view class="">
				绑定手机号
			</view>
			<view class="">
				>
			</view>
		</view>
		<view class="config-item" @click="goPathConfig">
			<view class="">
				地址管理
			</view>
			<view class="">
				>
			</view>
		</view>
		<view class="config-exit" @click="logout">
			退出
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		methods: {
			...mapMutations(["loginOut"]),
			goPathConfig() {
				uni.navigateTo({
					url: "/pages/pathConfig/pathConfig"
				})
			},
			logout() {
				this.loginOut()
				uni.showToast({
					title: "推出成功"
				})
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style scoped>
	.config-exit {
		background-color: #49BDFB;
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		color: #FFFFFF;
		text-align: center;
	}

	.config-title {
		padding: 20rpx;
		border-bottom: 2rpx solid black;
		font-size: 24rpx
	}

	.config-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		border-bottom: 2rpx solid #CCCCCC;
	}
</style>
