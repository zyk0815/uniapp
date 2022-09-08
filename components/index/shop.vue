<template>
	<view class="shop">
		<view class="shop-item" v-for="(item,index) in shopList" :key="index">
			<image class="shop-big" :src="item.bigUrl" mode=""></image>
			<scroll-view scroll-x="true" class="scroll-content">
				<view class="scroll-item">
					<good :dataList="item.data" itemW='200rpx' bigH="200rpx" wrap="no-wrap"></good>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import good from '@/components/common/good.vue'
	export default {
		props: {
			shopList: Array
		},
		components: {
			good
		},
		data() {
			return {}
		},
	}
</script>

<style scoped>
	.shop-big {
		width: 100%;
		height: 350rpx;
	}

	.scroll-content {
		width: 100%;
		white-space: nowrap;
	}

	.scroll-item {
		display: inline-block;
	}
</style>
