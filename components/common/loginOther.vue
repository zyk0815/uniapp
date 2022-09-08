<template>
	<view class="loginOther">
		<view class="other-txt">
			<view class="">或用以下方式登录</view>
		</view>

		<view class="other">
			<view class="other-item" @tap="loginOther('weixin')">
				<image src="../../static/img/WX.png" mode=""></image>
				<view class="">微信登录</view>
			</view>
			<view class="other-item" @tap="loginOther('sinaweibo')">
				<image src="../../static/img/weibo.png" mode=""></image>
				<view class="">微博登录</view>
			</view>
			<view class="other-item" @tap="loginOther('qq')">
				<image src="../../static/img/QQ.png" mode=""></image>
				<view class="">QQ登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		methods: {
			...mapMutations(["loginFn"]),
			loginOther(mode) {
				uni.login({
					provider: mode,
					success: (res) => {
						let openId = res.authResult.openid
						uni.getUserInfo({
							provider: mode,
							success: (infoRes) => {
								console.log(infoRes)
								const param = {
									provider: mode,
									openId: infoRes.userInfo.openId || infoRes.userInfo.openid,
									name: infoRes.userInfo.nickName,
									imgUrl: infoRes.userInfo.avatarUrl,
								}
								uni.request({
									//#ifdef H5
									url: `/api/loginOther`,
									//#endif
									//#ifdef APP-PLUS
									url: `http://192.168.101.102:8080/api/loginOther`,
									//#endif
									method: 'POST',
									data: {
										...param
									}
								}).then(([err, res]) => {
									if (res.data.code === 0) {
										this.loginFn(res.data.data)
										uni.switchTab({
											url: "/pages/index/index"
										})
									} else {
										uni.showToast({
											title: "第三方登录失败",
											icon: "none"
										})
									}
								}).catch(() => {
									console.log("登录失败")
								})
							}
						});
					}
				})
			}
		}
	}
</script>

<style scoped>
	.loginOther {
		padding: 100rpx 0;
	}

	.other-txt {
		display: flex;
		padding: 50rpx 0;
	}

	.other-txt view {
		line-height: 0rpx;
		padding: 0 10rpx;
	}

	.other-txt::after {
		flex: 1;
		content: "";
		height: 2rpx;
		background-color: #CCCCCC;
	}

	.other-txt::before {
		flex: 1;
		content: "";
		height: 2rpx;
		background-color: #CCCCCC;
	}

	.other {
		display: flex;
		justify-content: space-around;
	}

	.other-item {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.other-item image {
		width: 80rpx;
		height: 80rpx;
	}
</style>
