import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	data: {
		version: "0.60",
		versionLog: [
			'0.60: Total revamp.',
			'0.56: Fixed a compatibility issue with web browsers other than Chrome, which was introduced with the last fix.',
			'0.55: Fixed various map download/upload bugs.'
		],
	},
	render: h => h(App)
}).$mount("#app");
