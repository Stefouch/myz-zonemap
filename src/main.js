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
		name: 'Find My Path',
		zonemap: null,
		version: '1.0.0',
		github: 'git',
		sectorSquare: 64,
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
