<template>
	<view class="paySuccess">
		<view class="f-active-color">支付成功</view>
		<view @click="goHome" class="return">返回首页</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goHome() {
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style scoped>
.paySuccess{
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.return{
	padding: 10rpx 60rpx;
	border: 2rpx solid #42B7FB;
	border-radius: 40rpx;
}
</style>
