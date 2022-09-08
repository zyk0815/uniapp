<template>
	<view class="addPath">
		<view class="path-item">
			<view class="">收 件 人：</view>
			<input type="text" value="" v-model="baseFormData.name" placeholder="收件人姓名">
		</view>
		<view class="path-item">
			<view class="">手 机 号：</view>
			<input type="text" value="" v-model="baseFormData.tel" placeholder="11位手机号">
		</view>
		<view class="path-item" @click="showCityPicker">
			<view class="">所在地址：</view>
			<view class="">{{baseFormData.city}} > </view>
		</view>
		<view class="path-item">
			<view class="">详细地址：</view>
			<input type="text" value="" v-model="baseFormData.details" placeholder="5到68个字符">
		</view>
		<view class="path-item">
			<view class="">设为默认地址：</view>
			<label class="radio">
				<radio value="" color="#FF3333" @click="changeCheck" :checked="baseFormData.isDefault" /><text></text>
			</label>
		</view>
		<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirm">
		</mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from "@/components/uni/mpvue-citypicker/mpvueCityPicker.vue"
	import {
		mapActions
	} from "vuex"
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				cityPicker: "请选择",
				pickerValueDefault: [0, 0, 1],
				// 表单数据
				baseFormData: {
					name: '',
					tel: '',
					city: '',
					details: '',
					isDefault: false
				},
				index: -1,
				status: false
			}
		},
		onLoad(options) {
			if (options.pathObj) {
				uni.setNavigationBarTitle({
					title: "修改地址"
				})
				this.baseFormData = Object.assign(this.baseFormData, JSON.parse(options.pathObj).data)
				this.index = JSON.parse(options.pathObj).index
				this.status = true
			}
		},
		onNavigationBarButtonTap() {
			if (this.status) {
				this.updatePathFn({
					index: this.index,
					data: this.baseFormData
				})
				uni.navigateBack({
					dalta: 1
				})
			} else {
				this.createPathFn(this.baseFormData)
				uni.navigateBack({
					dalta: 1
				})
			}

		},
		methods: {
			...mapActions(["createPathFn", "updatePathFn"]),
			showCityPicker() {
				this.$refs.mpvueCityPicker.show();
			},
			onConfirm(e) {
				this.baseFormData.city = e.label
			},
			changeCheck() {
				console.log(111)
				this.baseFormData.isDefault = !this.baseFormData.isDefault
			}
		}
	}
</script>

<style scoped>
	.addPath {
		padding: 0 20rpx;
	}

	.path-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16rpx 0;
		width: 100%;
		border-bottom: 2px solid #CCCCCC;
	}

	.path-item input {
		flex: 1;
		text-align: right;
		padding-left: 18rpx;
	}
</style>
