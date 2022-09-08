<template>
	<view class="goods-content bg-active-color">
		<image class="goods-img" :src="it.imgUrl" mode=""></image>
		<view class="goods-text">
			<view class="goods-name">{{it.name}}</view>
			<view class="goods-size f-color">颜色分类：{{it.attrs}}</view>
			<view class="f-active-color goods-size">7天无理由</view>
		</view>
		<view class="">
			<view class="">￥{{it.pprice}}</view>
			<view class="f-color">×{{it.num}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			it:Object,
			idx:Number
		}
	}
</script>

<style scoped>
	.goods-content {
		padding: 10rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.goods-img {
		height: 160rpx;
		width: 160rpx;
		font-size: 26rpx
	}

	.goods-size {
		font-size: 24rpx;

	}

	.goods-name {
		font-size: 24rpx
	}

	.goods-text {
		width: 360rpx;
		padding: 0 10rpx;
	}
</style>
