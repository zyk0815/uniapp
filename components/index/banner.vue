<template>
	<view class="banner">
		<image class="banner-image" :src="bannerListData.imgUrl" mode=""></image>
	</view>
</template>

<script>
	export default {
		props: {
			bannerListData: Object
		}
	}
</script>

<style scoped>
	.banner {
		width: 100%;
		height: 400rpx;
	}

	.banner-image {
		width: 100%;
		height: 400rpx;
	}
</style>
