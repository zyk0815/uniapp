<template>
	<view class="category">
		<view class="nav">
			<scroll-view class="bg" scroll-y="true" :scroll-top="scrollTop" :scroll-with-animation="true">
				<view class="nav-item" :class="{'ac':active == index}" v-for="(item,index) in listData" :key="index"
					@click="changeNav(index,item.id)">
					{{item.name}}
				</view>
			</scroll-view>
		</view>
		<view class="goodsBox">
			<scroll-view scroll-y="true">
				<view class="goods" v-for="(item,index) in rightData" :key="index">
					<view class="list-title">
						{{item.name}}
					</view>
					<view class="goods-content">
						<view class="goods-item" v-for="(it,idx) in item.list" :key="idx">
							<image :src="it.imgUrl" alt=""></image>
							<view>
								{{it.name}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				active: 0,
				scrollTop: 0,
				height: 0,
				listData: [],
				rightData: []
			}
		},
		onLoad() {
			this.getList(this.active + 1)
		},
		onShow() {
			// 获取导航'.nav-item'的高度，在点击导航触发changeNav时，使其向下滚动
			setTimeout(() => {
				this.$nextTick(() => {
					let height = uni.createSelectorQuery().select(".nav-item");
					height.boundingClientRect((data) => {
						this.height = data.height;
					}).exec()
				})
			}, 300)
		},
		methods: {
			changeNav(index, id) {
				this.scrollTop = this.height * (index - 2);
				// 在这里请求接口 展示右侧商品数据
				this.getList(id)
				this.active = index;
			},
			getList(id) {
				uni.request({
					//#ifdef H5
					url: `/api/goods/list`,
					//#endif
					//#ifdef APP-PLUS
					url: `http://192.168.101.102:8080/api/goods/list`,
					//#endif
				}).then(([err, res]) => {
					this.listData = res.data.data.map(item => {
						return {
							id: item.id,
							name: item.name
						}
					})
					let num = res.data.data.find(item => item.id === id)
					this.rightData = num.data
				}).catch(() => {
					console.log("获取数据失败")
				})
			},
		}
	}
</script>
<style scoped lang="scss">
	.category {
		display: flex;
		position: absolute;
		width: 100%;
		height: calc(100% - var(--status-bar-height));

		/* 隐藏滚动条样式 */
		::-webkit-scrollbar {
			width: 0;
			height: 0;
		}

		uni-scroll-view {
			height: 100%;
		}

		.bg {
			background: #F7F8F9;
		}

		.nav {
			width: 200rpx;

			.nav-item {
				width: 200rpx;
				height: 104rpx;
				line-height: 104rpx;
				background: #F7F8F9;
				font-size: 28rpx;
				color: #505660;
				text-align: center;
				position: relative;
			}

			.ac {
				color: #26A69A;
				font-size: 30rpx;
				background: #fff;
			}

			.ac:before {
				content: '';
				display: block;
				position: absolute;
				left: 0;
				top: 0;
				width: 6rpx;
				height: 104rpx;
				background: linear-gradient(180deg, #26A69A 0%, #4DB6AC 100%);
				border-radius: 2rpx;
			}
		}

		.goodsBox {
			width: 550rpx;
			padding-left: 30rpx;

			.goods {

				flex-wrap: wrap;
				padding: 30rpx 0;

				.list-title {
					font-weight: 700;
					padding: 30rpx 0;
				}

				.goods-content {
					display: flex;
					flex-wrap: wrap;

					.goods-item {
						width: 150rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						padding: 10rpx;

						uni-image {
							display: block;
							width: 150rpx;
							height: 150rpx;
						}

						uni-text {
							padding: 16rpx 0;
							font-size: 24rpx;
							color: #505660;
						}
					}
				}

			}
		}
	}
</style>
