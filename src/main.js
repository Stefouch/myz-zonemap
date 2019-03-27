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
		mapLangs: [{ text: 'English', value: 'en' }, { text: 'Français', value: 'fr' }],
		typeIcons: {
			zone: 'mdi-terrain',
			ark: 'mdi-home-variant',
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
