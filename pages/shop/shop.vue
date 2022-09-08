<template>
	<view class="shop">
		<template v-if="list.length>0">
			<uni-nav-bar class="head" shadow :rightText="isNavBar?'完成':'编辑'" title="购物车"
				@clickRight='isNavBar = !isNavBar' />

			<view class="shop-list">
				<view class="shop-item" v-for="(item,index) in list" :key="index">
					<label class="radio" @tap="checkItem(index)">
						<radio value="" color="#FF3333" :checked="item.checked" /><text></text>
					</label>
					<image class="shop-image" :src="item.imgUrl" mode=""></image>
					<view class="shop-text">
						<view class="shop-name">{{item.name}}</view>
						<view class="shop-color f-color">{{item.color}}</view>
						<view class="shop-price">
							<view class="">{{item.pprice}}</view>
							<template v-if="!isNavBar">
								<view class="">×{{item.num}}</view>
							</template>
							<template v-else>
								<uni-number-box :min="1" :value="item.num" @change="changeNum($event,index)" />
							</template>
						</view>
					</view>
				</view>
			</view>

			<view class="shop-foot">
				<label class="foot-radio" @tap="checkAllFn">
					<radio value="" color="#FF3333" :checked="checkFlag" /><text>全选</text>
				</label>
				<template v-if="!isNavBar">
					<view class="foot-total">
						<view class="foot-count">
							合计
							<text class="f-active-color">({{totalCount}})</text>
						</view>
						<view class="foot-num" @click="goConfirmOrder">
							结算
						</view>
					</view>
				</template>
				<template v-else>
					<view class="foot-total">
						<view class="foot-num" style="background-color: #000000;">
							移入收藏夹
						</view>
						<view class="foot-num" @click="deteleGoodFn">
							删除
						</view>
					</view>
				</template>
			</view>
		</template>
		<template v-else>
			<uni-nav-bar title="购物车" />
			<view class="shop-else-list">
				<text>暂无数据</text>
			</view>
		</template>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				isNavBar: false,
			}
		},
		computed: {
			...mapState({
				list: state => state.cart.list
			}),
			...mapGetters(["checkFlag", "totalCount"])
		},
		methods: {
			...mapActions(["checkAllFn", "deteleGoodFn"]),
			...mapMutations(["checkItem", "initOrder"]),
			changeNum(value, index) {
				this.list[index].num = value
			},
			goConfirmOrder() {
				let seletList = this.list.filter(item => item.checked)
				if (seletList.length === 0) {
					uni.showToast({
						title: "请至少选择一件商品",
						icon: 'none'
					})
				} else {
					uni.request({
						//#ifdef H5
						url: `/api/addOrder`,
						//#endif
						//#ifdef APP-PLUS
						url: `http://192.168.101.102:8080/api/addOrder`,
						//#endif
						method: "POST",
						data: {
							arr: seletList
						}
					}).then(([err, res]) => {
						if (res.data.code === 0) {
							this.initOrder(res.data.data.goodsOrder[0].orderId)
							uni.navigateTo({
								url: `/pages/confirm-order/confirm-order?detail=${JSON.stringify(res.data.data.goodsOrder)}`
							})
						}
					}).catch(() => {
						console.log("111")
					})
				}
			}
		}
	}
</script>

<style scoped>
	.head {
		margin-top: 50rpx;
	}

	.shop {
		padding-bottom: 100rpx;
	}

	.shop-item {
		display: flex;
		padding: 20rpx;
		align-items: center;
		background-color: #F7F7F7;
		margin-bottom: 10rpx;
	}

	.shop-image {
		width: 200rpx;
		height: 200rpx;
	}

	.shop-text {
		flex: 1;
		padding-left: 28rpx;
	}

	.shop-color {
		font-size: 24rpx;
	}

	.shop-price {
		display: flex;
		justify-content: space-between;
	}

	.shop-foot {
		background-color: #FFFFFF;
		border-top: 2px solid #F7F7F7;
		position: fixed;
		/* #ifdef H5 */
		bottom: 100rpx;
		/* #endif */

		/*  #ifdef APP-PLUS */
		bottom: 0;
		/* #endif */
		left: 0;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.foot-radio {
		padding-left: 20rpx;
	}

	.foot-total {
		display: flex;
	}

	.foot-count {
		line-height: 100rpx;
		padding: 0 20rpx;
	}

	.foot-num {
		background: #49BDFB;
		color: #FFFFFF;
		padding: 0rpx 60rpx;
		line-height: 100rpx;
	}

	.shop-else-list {
		background-color: #F7F7F7;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
