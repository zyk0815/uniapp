<template>
	<view class="hot">
		<good :dataList="hotList" itemW='250rpx' bigH="220rpx"></good>
	</view>
</template>

<script>
	import good from '@/components/common/good.vue'
	export default {
		props: {
			hotList: Array
		},
		components: {
			good
		},
		data() {
			return {}
		}
	}
</script>

<style>
</style>
