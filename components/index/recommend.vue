<template>
	<view class="recommend bg-color" >
		<view class="recommend-item" v-for="(item,index) in recommendListData" :key="index">
			<image class="item-big" :src="item.bigUrl" mode=""></image>
			<view class="item-small">
				<block v-for="(it,idx) in item.data" :key="idx">
					<image class="item-image" :src="it.imgUrl" mode=""></image>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			recommendListData: {
				type: Array
			}
		}
	}
</script>

<style scoped>
	.recommend {
		padding: 20rpx;

	}

	.recommend-item {
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		border: 2rpx solid #CCCCCC;
		margin: 20px 0;
	}

	.item-big {
		width: 100%;
		height: 300rpx;
	}

	.item-small {
		width: 100%;
		height: 240rpx;
	}

	.item-image {
		width: 33.33%;
		height: 240rpx;
	}
</style>
