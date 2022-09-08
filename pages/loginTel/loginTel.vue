<template>
	<view>
		<splitline></splitline>
		<view class="login-tel">
			<view class="login-main">
				<view class="login-from">
					<view class="login-user">
						<text>手机号:</text>
						<input type="number" focus="true" v-model="telPhone" value="" placeholder="请输入11位手机号">
					</view>
					<view class="tel" @click="nextStep">下一步</view>
				</view>
			</view>
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
				telPhone: '',
				rules: {
					telPhone: {
						rule: /^[1][3,4,5,7,8][0-9]{9}$/,
						msg: "请输入11位手机号"
					},
				}
			}
		},
		methods: {
			nextStep() {
				if (!this.validate("telPhone")) return
				uni.navigateTo({
					url: `/pages/loginCode/loginCode?telPhone=${this.telPhone}`
				})
			},
			validate(key) {
				let bool = true
				if (!this.rules[key].rule.test(this[key])) {
					uni.showToast({
						title: this.rules[key].msg,
						icon: "none"
					})
					bool = false
					return false
				}
				return bool
			}
		}
	}
</script>

<style scoped>
	.login-tel {
		width: 100vw;
		height: 100vh;

	}

	.login-main {
		padding: 0 20rpx;
	}

	.login-from {
		padding-top: 30rpx;

	}

	.login-user {
		font-size: 32rpx;
		padding: 10rpx 0;
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #F7F7F7;
	}

	.login-user text {
		padding-right: 10rpx;
	}

	.tel {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #49BDFB;
		border-radius: 40rpx;
		margin-top: 40rpx;
	}
</style>
