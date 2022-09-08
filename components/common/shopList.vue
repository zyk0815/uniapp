<template>
	<view class="shopList f-color">
		<view class="shop-title">
			<view class="shop-item" v-for="(item,index) in shopList.data" :key="index">
				<view :class="shopList.currentList===index?'f-active-color':''">{{item.name}}</view>
				<view class="shop-cion">
					<view class="iconfont icon-shangjiantou up" :class="item.status===2?'f-active-color':''"
						@click="clickIcon(index,'up')"></view>
					<view class="iconfont icon-xiajiantou down" :class="item.status===1?'f-active-color':''"
						@click="clickIcon(index,'down')"></view>
				</view>
			</view>
		</view>
		<splitline></splitline>
		<goodsList v-if="goodsListData.length>0" :goodsListData="goodsListData"></goodsList>
		<view class="noData" v-else>无搜索结果</view>
	</view>
</template>

<script>
	import splitline from "@/components/common/splitline.vue"
	import goodsList from "@/components/common/goodsList.vue"
	export default {
		props: {
			keyWord: String
		},
		components: {
			splitline,
			goodsList
		},
		data() {
			return {
				shopList: {
					currentList: 0,
					data: [{
							name: "价格",
							status: 1,
							title: "pprice"
						},
						{
							name: "折扣",
							status: 0,
							title: "discount"
						},
						{
							name: "品牌",
							status: 0,
							title: "pinpai"
						},
					]
				},
				goodsListData: []
			}
		},
		mounted() {
			this.getGoodsList()
		},
		methods: {
			clickIcon(index, dis) {
				this.shopList.currentList = index
				this.shopList.data.forEach(item => item.status = 0)
				this.shopList.data[index].status = dis === "up" ? 1 : 2
				this.sortData(dis, this.shopList.data[index].title)
			},
			getGoodsList() {
				uni.request({
					//#ifdef H5
					url: `/api/index_list/goodsList/${this.keyWord}`,
					//#endif
					//#ifdef APP-PLUS
					url: `http://192.168.101.102:8080/api/index_list/goodsList/${this.keyWord}`,
					//#endif
				}).then(([err, res]) => {
					this.goodsListData = res.data.data.data
				}).catch(() => {
					uni.showToast({
						title: "无搜索结果",
						icon: "none"
					})
				})
			},
			sortData(flag, title) {
				let arr = this.goodsListData
				for (var i = 0; i < arr.length - 1; i++) {
					for (var j = 0; j < arr.length - 1 - i; j++) {
						if (flag === "up") {
							if (arr[j][title] < arr[j + 1][title]) {
								([arr[j], arr[j + 1]] = [arr[j + 1], arr[j]])
							}
						} else {
							if (arr[j][title] > arr[j + 1][title]) {
								([arr[j], arr[j + 1]] = [arr[j + 1], arr[j]])
							}
						}
					}
				}
				this.goodsListData = Object.assign([], arr)
			}
		}
	}
</script>

<style scoped>
	.shop-title {
		display: flex;
	}

	.shop-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
	}

	.shop-cion {
		position: relative;
		margin-left: 10rpx;
	}

	.iconfont {
		width: 16rpx;
		height: 8rpx;
		position: absolute;
		left: 0;
	}

	.up {
		top: -38rpx;
	}

	.down {
		top: -20rpx;
	}

	.noData {
		text-align: center;
		margin-top: 20rpx;
	}
</style>
