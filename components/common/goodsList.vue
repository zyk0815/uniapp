<template>
	<view class="goodsList">
		<good :dataList="goodsListData"></good>
	</view>
</template>

<script>
	import good from './good.vue'
	export default {
		props: {
			goodsListData: Array
		},
		components: {
			good
		},
		data() {
			return {
			}
		}
	}
</script>

<style>
</style>
