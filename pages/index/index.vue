<template>
	<view class="index">
		<scroll-view scroll-x="true" class="scroll-content" :scroll-into-view="scrollIntoIndex">
			<view v-for="(item,index) in topBar" :key="index" class="scroll-item" :id="'top'+index">
				<text @click="changeTab(index)" :class="topBarIndex===index?'f-active-color':''">{{item.name}}</text>
			</view>
		</scroll-view>
		<swiper class="Iswiper" @change="onchangeTable" :current="topBarIndex" :style="'height:'+clentHeight+'px;'">
			<swiper-item v-for="(item,index) in topBar" :key="index">
				<!-- 推荐模板 -->
				<view class="home-index" v-if="index===0">
					<indexSwpier :indexSwpierData="indexSwpierData"></indexSwpier>
					<recommend :recommendListData="recommendListData"></recommend>
					<card cardName="猜你喜欢"></card>
					<goodsList :goodsListData="goodsListData"></goodsList>
					<view class="load-text f-color">
						{{loadText}}
					</view>
				</view>
				<view class="home-other" v-else>
					<!-- 其他模板:运动户外,美妆。。。 -->
					<banner :bannerListData="bannerListData"></banner>
					<icons :iconsData="iconsData"></icons>
					<card cardName="热销爆品"></card>
					<hot :hotList="hotList"></hot>
					<card cardName="推荐店铺"></card>
					<shop :shopList="shopList"></shop>
					<card cardName="为你推荐"></card>
					<goodsList :goodsListData="goodsListData"></goodsList>
					<view class="load-text f-color">
						{{loadText}}
					</view>
				</view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	import indexSwpier from '@/components/index/indexSwiper.vue'
	import recommend from '@/components/index/recommend.vue'
	import banner from '@/components/index/banner.vue'
	import icons from '@/components/index/icons.vue'
	import hot from '@/components/index/hot.vue'
	import shop from '@/components/index/shop.vue'
	import card from '@/components/common/card.vue'
	import goodsList from '@/components/common/goodsList.vue'
	export default {
		components: {
			indexSwpier,
			recommend,
			banner,
			icons,
			hot,
			shop,
			card,
			goodsList,
		},
		data() {
			return {
				//当前tab页
				currentTab: "index",
				page: 1,
				loadText: "上拉加载更多....",
				// 选中的索引
				topBarIndex: 0,
				//顶栏跟随的索引
				scrollIntoIndex: 'top0',
				//内容块的高度值
				clentHeight: 0,
				topBar: [],
				indexSwpierData: [],
				recommendListData: [],
				goodsListData: [],
				bannerListData: {},
				iconsData: [],
				hotList: [],
				shopList: []
			}
		},
		onLoad() {
			this.init()
			this.getGoodsList()
		},
		onReady() {
			this.getClientHeight(".home-index")
		},
		//监听原生标题栏按钮点击事件
		onNavigationBarButtonTap(e) {
			if (e.float === "left") {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			}
		},
		methods: {
			onReachBottom() {
				this.page++
				this.getGoodsList(() => {
					if (this.currentTab === "index") {
						this.getClientHeight(".home-index")
					} else {
						this.getClientHeight(".home-other")
					}
				})
				this.loadText = "加载中..."
			},
			getGoodsList(callback) {
				uni.request({
					//#ifdef H5
					url: `/api/index_list/goodsList/${this.page}`,
					//#endif
					//#ifdef APP-PLUS
					url: `http://192.168.101.102:8080/api/index_list/goodsList/${this.page}`,
					//#endif
				}).then(([err, res]) => {
					this.goodsListData = [...this.goodsListData, ...res.data.data.data]
					callback()
				}).catch(() => {
					this.loadText = "没有更多数据了..."
				})
			},
			init() {
				//192.168.101.102 电脑ip地址
				uni.request({
					//#ifdef H5
					url: "/api/index_list/data",
					//#endif
					//#ifdef APP-PLUS
					url: "http://192.168.101.102:8080/api/index_list/data",
					//#endif
				}).then(([err, res]) => {
					this.topBar = res.data.data.topBar
					this.indexSwpierData = res.data.data.data[0].data
					this.recommendListData = res.data.data.data[1].data
				}).catch(() => {
					console.log("出错了")
				})
			},
			changeTopTab(index) {
				uni.request({
					//#ifdef H5
					url: `/api/index_list/${index+1}/data/1`,
					//#endif
					//#ifdef APP-PLUS
					url: `http://192.168.101.102:8080/api/index_list/${index+1}/data/1`,
					//#endif
				}).then(([err, res]) => {
					console.log(res)
					this.bannerListData = res.data.data[0]
					this.iconsData = res.data.data[1].data
					this.hotList = res.data.data[2].data
					this.shopList = res.data.data[3].data
				})
			},
			changeTab(index) {
				if (this.topBarIndex === index) return
				this.topBarIndex = index
				this.scrollIntoIndex = 'top' + index
			},
			onchangeTable(e) {
				this.changeTab(e.detail.current)
				if (e.detail.current === 0) {
					this.getClientHeight(".home-index")
					this.currentTab = "index"
				} else {
					this.getClientHeight(".home-other")
					this.currentTab = "other"
					if (e.detail.current > 2) e.detail.current = 2
					this.changeTopTab(e.detail.current)
				}
			},
			getClientHeight(className) {
				setTimeout(() => {
					const view = uni.createSelectorQuery().in(this).select(className)
					view.boundingClientRect(data => {
						console.log(data)
						this.clentHeight = data.height
					}).exec();
				}, 300)
			}
		}
	}
</script>

<style scoped>
	.scroll-content {
		width: 100%;
		height: 80rpx;
		white-space: nowrap;
	}

	.scroll-item {
		display: inline-block;
		padding: 10rpx 30rpx;
		font-size: 36rpx;
	}

	.f-active-color {
		padding: 10rpx 0;
		border-bottom: 6rpx solid #49BDFB;
	}

	.load-text {
		border-top: 2rpx solid #636263;
		line-height: 60rpx;
		text-align: center;

	}
</style>
