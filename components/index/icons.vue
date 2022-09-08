<template>
	<view class="icons">
		<view class="icon-item" v-for="(item,index) in iconsData" :key="index">
			<image class="icon-image" :src="item.imgUrl" mode=""></image>
			<text class="f-color">{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			iconsData: Array
		}
	}
</script>

<style scoped>
	.icons {
		display: flex;
		flex-wrap: wrap;
	}

	.icon-item {
		width: 25%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 20rpx;
	}

	.icon-image {
		width: 110rpx;
		height: 110rpx;
	}
</style>
