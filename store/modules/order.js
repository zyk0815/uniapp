export default {
	state: {
		orderId: ''
	},
	getters: {

	},
	mutations: {
		initOrder(state, order) {
			state.orderId = order
		}
	},
	actions: {}
}
