import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
// import Vuetify from 'vuetify';
// import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;
// Vue.use(Vuetify);

new Vue({
	router,
	store,
	data: {
		zonemap: null,
		version: '0.60',
		versionLog: [
			'0.60: Total revamp.',
			'0.56: Fixed a compatibility issue with web browsers other than Chrome, which was introduced with the last fix.',
			'0.55: Fixed various map download/upload bugs.'
		]
	},
	render: h => h(App)
}).$mount('#app');
