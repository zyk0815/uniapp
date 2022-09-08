<template>
	<view class="searchList">
		<shopList :keyWord="keyWord"></shopList>
	</view>
</template>

<script>
	import shopList from "@/components/common/shopList.vue"
	export default {
		components: {
			shopList
		},
		data() {
			return {
				keyWord: ""
			}
		},
		onLoad(options) {
			this.keyWord = options.keyWord
			//#ifdef APP-PLUS 
			var webView = this.$mp.page.$getAppWebview();
			webView.setTitleNViewSearchInputText(options.keyWord)
			//#endif
		}

	}
</script>

<style>
</style>
