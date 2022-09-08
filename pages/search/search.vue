<template>
	<view class="search">
		<splitline></splitline>
		<view class="search-item">
			<view class="search-title">
				最近搜索
				<view @click="deleteHistory" class="iconfont icon-lajitong"></view>
			</view>
			<view v-if="searchedData.length>0">
				<view @click="goSearch(item)" class="search-name" v-for="(item,index) in searchedData " :key="index">
					{{item}}
				</view>
			</view>
			<view class="" v-else>
				<view class="search-name">暂无搜索结果</view>
			</view>
		</view>
		<view class="search-item">
			<view class="search-title">
				热门搜索
			</view>
			<view class="">
				<view class="search-name">四件套</view>
				<view class="search-name">面膜</view>
			</view>
		</view>

	</view>
</template>

<script>
	import splitline from "@/components/common/splitline.vue"
	export default {
		components: {
			splitline
		},
		data() {
			return {
				keyWord: '',
				//搜索过的关键词
				searchedData: []
			}
		},
		onLoad() {
			uni.getStorage({
				key: "keyWord",
				success: (res) => {
					this.searchedData = JSON.parse(res.data)
				}
			})
		},
		//监听原生标题栏按钮点击事件
		onNavigationBarButtonTap(e) {
			this.search(this.keyWord)
		},
		//用户点击软键盘上的“搜索”按钮时触发。
		onNavigationBarSearchInputConfirmed() {
			this.search(this.keyWord)
		},
		//监听原生标题栏搜索输入框输入内容变化事件	
		onNavigationBarSearchInputChanged(e) {
			this.keyWord = e.text
		},
		methods: {
			//判断关键词是否为空和跳转页面的
			search(name) {
				if (name === "") {
					return uni.showToast({
						title: "搜索不能为空",
						icon: "none"
					})
				} else {
					uni.navigateTo({
						url: `/pages/search-list/searchList?keyWord=${name}`
					})
				}
				this.addSearch(name)
			},
			//历史记录搜索
			goSearch(it) {
				this.search(it)
			},
			//记录最近搜索词
			addSearch(keyWord) {
				let idx = this.searchedData.indexOf(keyWord)
				if (idx < 0) {
					this.searchedData.unshift(keyWord)
				} else {
					this.searchedData.unshift(this.searchedData.splice(idx, 1)[0])
				}
				uni.setStorage({
					key: 'keyWord',
					data: JSON.stringify(this.searchedData),
				});
			},
			//删除搜索记录
			deleteHistory() {
				uni.showModal({
					title: "删除提示",
					content: "是否删除搜搜记录",
					cancelText: "取消",
					confirmText: "确定",
					success: (res) => {
						if (res.confirm) {
							uni.removeStorage({
								key: 'keyWord',
							});
							this.searchedData = []
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.search-item {
		padding: 20rpx;
	}

	.search-title {
		display: flex;
		justify-content: space-between;
	}

	.search-name {
		padding: 4rpx 24rpx;
		background-color: #E1E1E1;
		display: inline-block;
		border-radius: 26rpx;
		margin: 10rpx;
	}
</style>
