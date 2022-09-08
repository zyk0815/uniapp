<template>
	<view class="login">

		<swiper vertical="true" style="height: 100vh;">
			<swiper-item>
				<scroll-view scroll-y="true">
					<view class="login-tel">
						<view class="login-main">
							<view class="close">
								<image class="close-img" src="../../static/img/close.png" mode=""></image>
							</view>
							<view class="logo">
								<image class="logo-img" src="../../static/img/football.png" mode=""></image>
							</view>
							<view class="tel" @click="goTel">
								手机号注册
							</view>
							<other></other>
							<view class="login-go">
								<view class="">已有账号，去登录</view>
								<image src="../../static/img/bottom.png" mode=""></image>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true">
					<view class="login-tel">
						<view class="login-main">
							<view class="close center">
								<view class="">
									<image class="close-img" src="../../static/img/close.png" mode=""></image>
								</view>
								<view class="register">
									<image class="close-img" src="../../static/img/top.png" mode=""></image>
									<view class="">没有账号去注册</view>
								</view>
								<view class=""></view>
							</view>
							<view class="login-from">
								<view class="login-user">
									<text>账号:</text>
									<input type="text" v-model="loginFrom.user" value="" placeholder="请输入手机号/昵称">
								</view>
								<view class="login-user">
									<text>密码:</text>
									<input type="password" v-model="loginFrom.passWord" name="" id=""
										placeholder="6-16位字符">
								</view>
							</view>
							<view class="login-quick">
								<view class="">忘记密码</view>
								<view class="">密码登录</view>
							</view>
							<view class="tel" @click="submit">登录</view>
							<other></other>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import other from '@/components/common/loginOther.vue'
	import {
		mapMutations
	} from 'vuex'
	export default {
		components: {
			other
		},
		data() {
			return {
				loginFrom: {
					user: '',
					passWord: ''
				},
				rules: {
					user: {
						rule: /^.+$/,
						msg: "账号不能为空"
					},
					passWord: {
						rule: /^[0-9a-zA-Z]{6,16}$/,
						msg: "密码应该为6-16位字符"
					}
				}
			}
		},
		methods: {
			...mapMutations(["loginFn"]),
			goTel() {
				uni.navigateTo({
					url: "/pages/loginTel/loginTel"
				})
			},
			login(callback) {
				uni.request({
					//#ifdef H5
					url: `/api/login`,
					//#endif
					//#ifdef APP-PLUS
					url: `http://192.168.101.102:8080/api/login`,
					//#endif
					method: 'POST',
					data: {
						...this.loginFrom
					}
				}).then(([err, res]) => {
					if (res.data.code === 0) {
						this.loginFn(res.data.data)
						callback()
					} else {
						uni.showToast({
							title: "账号或密码错误",
							icon: "none"
						})
					}
				}).catch(() => {
					console.log("登录失败")
				})
			},
			submit() {
				if (!this.validate("user")) return
				if (!this.validate("passWord")) return
				uni.showLoading({
					title: "登陆中"
				})
				this.login(() => {
					uni.hideLoading()
					uni.switchTab({
						url: "/pages/index/index"
					})
				})
			},
			validate(key) {
				let bool = true
				if (!this.rules[key].rule.test(this.loginFrom[key])) {
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

	.close {
		padding: 120rpx 0;
	}

	.close-img {
		width: 60rpx;
		height: 60rpx;
	}

	.logo {
		padding-bottom: 100rpx;
		display: flex;
		justify-content: center;
	}

	.logo-img {
		width: 250rpx;
		height: 250rpx;
	}

	.tel {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #49BDFB;
		border-radius: 40rpx;
	}

	.login-go {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.login-go image {
		width: 60rpx;
		height: 60rpx;
	}


	.center {
		display: flex;
	}

	.center view {
		flex: 1;
	}

	.register {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.login-from {
		padding-top: 100rpx;

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

	.login-quick {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0;
	}
</style>
