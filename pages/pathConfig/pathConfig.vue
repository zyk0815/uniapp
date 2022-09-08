<template>
	<view class="pathConfig">
		<view class="">
			<view class="path-list">
				<view class="path-item" v-for="(item,index) in list" :key="index" @click="goPath(index)">
					<view class="item-main">
						<view class="item-name">{{item.name}}</view>
						<view class="">{{item.tel}}</view>
					</view>
					<view class="item-main">
						<view v-if="item.isDefault" class="active">默认</view>
						<view class="">{{item.city}}{{item.details}}</view>
					</view>
				</view>
			</view>
			<view class="add-path">
				<view class="add-path-btn" @click="goAddPath">
					新增地址
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				flag: false
			}
		},
		computed: {
			...mapState({
				list: state => state.path.list
			})
		},
		onLoad(options) {
			if (options.flag === "confirm") {
				this.flag = true
			}
		},
		methods: {
			//新增
			goAddPath() {
				uni.navigateTo({
					url: "/pages/addPath/addPath"
				})
			},
			//修改
			goPath(index) {
				if (this.flag) {
					uni.navigateBack({
						delta: 1
					})
					uni.$emit('goConfirm', this.list[index])
			} else {
				let pathObj = JSON.stringify({
					index: index,
					data: this.list[index]
				})
				uni.navigateTo({
					url: `/pages/addPath/addPath?pathObj=${pathObj}`
				})
			}
		}
	}
	}
</script>

<style scoped>
	.add-path {
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 20rpx 0;
	}

	.add-path-btn {
		border: 2rpx solid #49BDFB;
		color: #49BDFB;
		border-radius: 30rpx;
		padding: 6rpx 60rpx;
	}

	.path-list {
		padding-left: 20rpx;
	}

	.path-item {
		padding: 10rpx;
		border-bottom: 2rpx solid #CCCCCC;
	}

	.item-main {
		display: flex;
		align-items: center;
	}

	.item-name {
		padding-right: 20rpx;
	}

	.active {
		padding: 2rpx 10rpx;
		background-color: #49BDFB;
		color: #FFFFFF;
		border-radius: 20rpx;
		text-align: center;
	}
</style>
