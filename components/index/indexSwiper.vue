<template>
	<view class="indexSwiper">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in indexSwpierData" :key="index">
				<view class="swiper-item">
					<image class="swiper-img" :src="item.imgUrl" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			indexSwpierData: {
				type: Array
			}
		}
	}
</script>

<style scoped>
	swiper {
		width: 100%;
		height: 400rpx;
	}

	.swiper-item {
		width: 100%;
		height: 400rpx;
	}

	.swiper-img {
		width: 100%;
		height: 100%
	}
</style>
