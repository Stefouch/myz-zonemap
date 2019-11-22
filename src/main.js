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
		version: '2.0.1',
		github: 'https://github.com/Stefouch/myz-zonemap',
		sectorDim: 64,
		mapLangs: [
			{ text: 'English', value: 'en' },
			{ text: 'Français', value: 'fr' },
			{ text: 'Svenska', value: 'se' },
			{ text: 'Español', value: 'es' }
		],
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
		},
		attributIcons: {
			strength: 'mdi-boxing-glove',
			agility: 'mdi-bullseye-arrow',
			wits: 'mdi-brain',
			empathy: 'mdi-heart-circle-outline'
		}
	},
	render: h => h(App)
}).$mount('#app');
