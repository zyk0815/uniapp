export default {
	state: {
		//登陆状态
		loginStatus: false,
		//token
		token: null,
		//用户信息
		userInfo: {}
	},
	getters: {

	},
	mutations: {
		initUser(state) {
			let userInfo = uni.getStorageSync('userInfo')
			if (userInfo) {
				userInfo = JSON.parse(userInfo)
				state.userInfo = userInfo
				state.loginStatus = true
				state.token = userInfo.token
				uni.switchTab({
					url: "/pages/index/index"
				})
			} else {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			}
		},
		//登陆保存用户信息
		loginFn(state, userInfo) {
			state.userInfo = userInfo
			state.loginStatus = true
			state.token = userInfo.token

			//持久化存储
			uni.setStorageSync('userInfo', JSON.stringify(userInfo))
		},
		loginOut(state) {
			state.loginStatus = false
			state.userInfo = {}
			state.token = null
			uni.removeStorageSync('userInfo')
		}
	},
	actions: {}
}
