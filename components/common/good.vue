<template>
	<view class="good" :style="'flex-wrap:'+wrap+ ';'">
		<!-- 单个商品 -->
		<view v-for="(item,index) in dataList" :key="item.id" class="good-item" :style="'width:'+itemW+';'"
			@click="getDetails(item.id)">
			<image class="good-image" :style="'width:'+bigH+';'" :src="item.imgUrl" mode=""></image>
			<view class="good-content">
				<text class="good-name">{{item.name}}</text>
				<view class="">
					<text class="pprice">${{item.pprice}}</text>
					<text class="oprice">${{item.oprice}}</text>
				</view>
				<text class="discount">{{item.discount}}折</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataList: Array,
			itemW: {
				type: String,
				default: "375rpx"
			},
			bigH: {
				type: String,
				default: "375rpx"
			},
			wrap: {
				type: String,
				default: "wrap"
			}
		},
		methods: {
			getDetails(id) {
				uni.navigateTo({
					url: `/pages/details/details?id=${id}`
				})
			}
		}
	}
</script>

<style scoped>
	.good {
		display: flex;
	}

	.good-item {
		padding-bottom: 20rpx;
	}

	.good-image {
		width: 100%;
		height: 375rpx;
	}

	.good-content {
		text-align: center;
	}

	.good-name {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		color: #333333;
		word-break: break-all;
		padding: 6rpx 20rpx;
	}

	.oprice {
		text-decoration: line-through;
		font-size: 24rpx;
		color: #999999;
	}

	.discount {
		border-radius: 4rpx;
		border: 1px solid red;
		padding: 2rpx 10rpx;
		font-size: 20rpx;
		color: red;
	}
</style>
