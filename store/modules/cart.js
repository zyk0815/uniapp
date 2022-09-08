export default {
	state: {
		list: [],
		selectList: []
	},
	getters: {
		//判断是否全选
		checkFlag(state) {
			return state.list.length === state.selectList.length
		},
		totalCount(state) {
			let total = 0
			state.list.forEach((item) => {
				if (state.selectList.indexOf(item.id) > -1) {
					total += item.pprice * item.num
				}
			})
			return total
		}
	},
	mutations: {
		//全选
		checkAll(state) {
			state.selectList = state.list.map(item => {
				item.checked = true
				return item.id
			})
		},
		//不全选
		unCheckAll(state) {
			state.list.forEach(item => {
				item.checked = false
			})
			state.selectList = []
		},
		checkItem(state, index) {
			let id = state.list[index].id
			let i = state.selectList.indexOf(id)
			if (i > -1) {
				state.list[index].checked = false
				state.selectList.splice(i, 1)
			} else {
				state.list[index].checked = true
				state.selectList.push(id)
			}
		},
		delGoodFn(state) {
			state.list = state.list.filter(item => {
				return state.selectList.indexOf(item.id) === -1
			})
			state.selectList = []
		},
		addShopCart(state, goods) {
			state.list.push(goods)
		}
	},
	actions: {
		checkAllFn({
			commit,
			getters
		}) {
			getters.checkFlag ? commit("unCheckAll") : commit("checkAll")
		},
		deteleGoodFn({
			commit
		}) {
			commit("delGoodFn")
			uni.showToast({
				title: "删除成功",
				icon: "none"
			})
		}
	}
}
