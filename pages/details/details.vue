<template>
	<view class="details">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image class="swiper-img" :src="item.imgUrl" mode=""></image>
			</swiper-item>
		</swiper>
		<view class="details-goods">
			<view class="goods-pprice">{{goodsContent.pprice||"暂无数据"}}</view>
			<view class="goods-oprice">{{goodsContent.oprice||"暂无数据"}}</view>
			<view class="goods-name">{{goodsContent.name||"暂无数据"}}</view>
		</view>
		<view class="">
			<image class="details-img" src="../../static/img/detail1.jpg" mode=""></image>
			<image class="details-img" src="../../static/img/detail2.jpg" mode=""></image>
			<image class="details-img" src="../../static/img/detail3.jpg" mode=""></image>
		</view>
		<card cardName="看了又看"></card>
		<goodsList :goodsListData="goodsListData"></goodsList>
		<!-- 底部 -->
		<view class="goods-carts">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
		<!-- 弹出层 -->
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content">
				<view>
					<image class="pop-img" src="../../static/img/details3.jpg" mode=""></image>
				</view>
				<view class="pop-num">
					<view class="">购买数量：</view>
					<uni-number-box :value="carNum" @change="changeValue" />
				</view>
				<view class="">
					<button @click="addCart" class="pop-button">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import card from '@/components/common/card.vue'
	import goodsList from '@/components/common/goodsList.vue'
	import {
		mapMutations,
		mapState,
	} from 'vuex'
	export default {
		components: {
			card,
			goodsList
		},
		computed: {
			...mapState({
				list: state => state.cart.list
			}),
		},
		data() {
			return {
				carNum: 1,
				goodsContent: {},
				options: [{
					icon: 'chat',
					text: '客服'
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				],
				swiperList: [{
						imgUrl: '../../static/img/details1.jpg'
					},
					{
						imgUrl: '../../static/img/details2.jpg'
					},
					{
						imgUrl: '../../static/img/details3.jpg'
					}
				],
				goodsListData: [{
						id: 1,
						imgUrl: "../../static/img/good1.jpg",
						name: "11111111111111111",
						pprice: "299",
						oprice: "599",
						discount: "5.2"
					},
					{
						id: 2,
						imgUrl: "../../static/img/good2.jpg",
						name: "11111111111111111",
						pprice: "298",
						oprice: "599",
						discount: "5.3"
					},
					{
						id: 3,
						imgUrl: "../../static/img/good3.jpg",
						name: "11111111111111111",
						pprice: "297",
						oprice: "599",
						discount: "5.4"
					}
				]
			}
		},
		onLoad(options) {
			console.log(options.id)
			this.getDetail(options.id)
			this.options[1].info = this.list.length
		},
		onBackPress() {
			if (this.$refs.popup.showPopup) {
				this.$refs.popup.close()
				return true
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.type === "share") {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: "http://192.168.101.102:8080/#/pages/details/details?id=1",
					title: this.goodsContent.name,
					summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
					imageUrl: this.goodsContent.imgUrl,
					success: function(res) {
						uni.showTabBar({
							title: "分享成功"
						})
					},
					fail: function(err) {
						uni.showTabBar({
							title: "分享失败"
						})
					}
				});
			}
		},
		methods: {
			...mapMutations(['addShopCart']),
			onClick(e) {
				if (e.content.text === "购物车") {
					uni.switchTab({
						url: "/pages/shop/shop"
					})
				}
			},
			buttonClick(e) {
				console.log(e)
				this.open()
			},
			open() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open('bottom')
				console.log(this.$refs.popup)
			},
			addCart() {
				this.goodsContent['checked'] = false
				this.goodsContent['num'] = this.carNum
				this.addShopCart(this.goodsContent)
				uni.showToast({
					title: "加入购物车成功",
					icon: "none"
				})
				// this.options[1].info = this.options[1].info + this.carNum
				this.$refs.popup.close()
			},
			changeValue(value) {
				this.carNum = value
			},
			getDetail(id) {
				uni.request({
					//#ifdef H5
					url: `/api/goods/details/${id}`,
					//#endif
					//#ifdef APP-PLUS
					url: `http://192.168.101.102:8080/api/goods/details/${id}`,
					//#endif
				}).then(([err, res]) => {
					this.goodsContent = res.data.data[0]
				}).catch(() => {
					console.log("请求失败")
				})
			},
		}
	}
</script>

<style scoped>
	.details {
		padding-bottom: 90rpx;
	}

	swiper {
		width: 100%;
		height: 700rpx;
	}

	.swiper-img {
		width: 100%;
		height: 700rpx;
	}

	.details-goods {
		text-align: center;
		font-weight: 700;
		font-size: 36rpx;
		padding: 10rpx 0;
	}

	.goods-pprice {}

	.goods-oprice {
		text-decoration: line-through;
		font-size: 24rpx;
		color: #999999;
	}

	.goods-name {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		color: #333333;
		word-break: break-all;
		padding: 6rpx 20rpx;
	}

	.details-img {
		width: 100%;
	}

	.example-body {
		padding: 0;
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}

	.popup-content {
		padding: 15px;
		background-color: #fff;
	}

	.pop-img {
		width: 260rpx;
		height: 260rpx;
	}

	.pop-num {
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.pop-button {
		background-color: #49BDFB;
		color: #fff;
	}
</style>
