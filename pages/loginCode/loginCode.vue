<template>
	<view>
		<splitline></splitline>
		<view class="login-tel">
			<view class="login-main">
				<view class="login-from">
					<view class="login-user">
						<text>验证码:</text>
						<input type="text" placeholder="请输入验证码" v-model="code">
						<button size="mini" plain="true" :disabled="disabled" @click="reSend">{{codeMsg}}</button>
					</view>
					<view class="tel" @click="goHome">下一步</view>
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
				codeNum: 10,
				codeMsg: '',
				disabled: false,
				code:""
			}
		},
		onReady() {
			this.codeMsg = `重新发送(${this.codeNum})`
			this.sendCode()
		},
		onLoad(options) {
			this.telPhone = options.telPhone
		},
		methods: {
			sendCode() {
				this.disabled = true
				let timer = setInterval(() => {
					--this.codeNum
					this.codeMsg = `重新发送(${this.codeNum})`
				}, 1000)
				setTimeout(() => {
					clearInterval(timer)
					this.codeNum = 10
					this.disabled = false
					this.codeMsg = `重新发送`
				}, 10000)
			},
			reSend() {
				this.sendCode()
			},
			goHome() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			getCode() {
				uni.request({
					//#ifdef H5
					url: `/api/login/Code`,
					//#endif
					//#ifdef APP-PLUS
					url: `http://192.168.101.102:8080/api/login/Code`,
					//#endif
					method: 'POST',
					data: {
						telPhone: this.telPhone
					}
				}).then(([err, res]) => {
					console.log(res)
				}).catch(() => {
					console.log(111)
				})
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
