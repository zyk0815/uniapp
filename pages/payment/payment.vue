<template>
	<view class="payment">
		<splitline></splitline>
		<view class="pay-content">
			<radio-group name="">
				<label for="">
					<view class="pay-item">
						<image class="pay-img" src="../../static/img/zfb.png" mode=""></image>
						<view class="">
							<view class="">支付宝支付</view>
							<view class="pay-txt">推荐支付宝用户使用</view>
						</view>
						<label class="radio">
							<radio value="" color="#FF3333" /><text></text>
						</label>
					</view>
				</label>
				<label for="">
					<view class="pay-item">
						<image class="pay-img" src="../../static/img/weixin.png" mode=""></image>
						<view class="">
							<view class="">微信支付</view>
							<view class="pay-txt">推荐微信用户使用</view>
						</view>
						<label class="radio">
							<radio value="" color="#FF3333" /><text></text>
						</label>
					</view>
				</label>
			</radio-group>

		</view>

		<view class="pay-foot">
			<view class="pay-tatal">
				<text class="f-color">合计:</text>
				<text class="total-price">￥{{totalCount}}</text>
			</view>
			<view class="pay" @click="goPay">去支付</view>
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
				totalCount: 0
			}
		},
		onLoad(options) {
			this.totalCount = options.totalCount
		},
		methods: {
			goPay() {
				uni.navigateTo({
					url: "/pages/paySuccess/paySuccess"
				})
			}
		}
	}
</script>

<style scoped>
	.pay-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		border-bottom: 2rpx solid #CCCCCC;
	}

	.pay-txt {
		color: #CCCCCC;
	}

	.pay-img {
		width: 100rpx;
		height: 100rpx;
	}

	.pay-foot {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

	}

	.pay-tatal {
		line-height: 100rpx;
		background-color: #000000;
		flex: 1;
		padding-left: 100rpx;
	}

	.total-price {
		color: #FFFFFF;
	}

	.pay {
		line-height: 100rpx;
		text-align: center;
		width: 220rpx;
		color: #FFFFFF;
		background-color: #42B7FB;
	}
</style>
