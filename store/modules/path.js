export default {
	state: {
		list: [
			{
				name: "张三",
				tel: "17743215815",
				city: "四川省成都市龙泉驿区",
				details: "北泉路373号",
				isDefault: false
			},
			{
				name: "李四",
				tel: "17743215815",
				city: "四川省成都市龙泉驿区",
				details: "北泉路373号",
				isDefault: true
			}
		]
	},
	getters: {
		defaultPath(state) {
			return state.list.filter(item => item.isDefault)
		}
	},
	mutations: {
		createPath(state, obj) {
			state.list.unshift(obj)
		},
		updatePath(State, {
			index,
			data
		}) {
			for (let key in data) {
				State.list[index][key] = data[key]
			}
		},
		removeDeafult(State) {
			State.list.forEach(item => {
				if (item.isDefault) {
					item.isDefault = false
				}
			})
		}
	},
	actions: {
		createPathFn({
			commit,
		}, obj) {
			if (obj.isDefault) {
				commit("removeDeafult")
			}
			commit("createPath", obj)
		},
		updatePathFn({
			commit
		}, obj) {
			if (obj.data.isDefault) {
				commit("removeDeafult")
			}
			commit("updatePath", obj)
		}
	}
}
