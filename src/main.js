import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/vuetify';

Vue.config.productionTip = false;

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
		],
		typeIcons: {
			zone: 'mdi-image-filter-hdr',
			ark: 'mdi-home',
			special: 'mdi-alert-decagram'
		},
		findIcons: {
			bullets: 'mdi-ammunition',
			grub: 'mdi-pizza',
			water: 'mdi-water',
			artifacts: 'mdi-star'
		}
	},
	render: h => h(App)
}).$mount('#app');
