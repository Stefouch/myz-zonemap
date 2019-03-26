import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	scrollBehavior: function(to, from, savedPosition) {
		if (to.hash) return { selector: to.hash };
		else if (savedPosition) return savedPosition;
		return { x: 0, y: 0 };
	},
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			props: true
		},
		{
			path: '/zonemap',
			name: 'zonescreen',
			// component: Zonescreen,
			component: () => import('./views/Zonescreen.vue'),
			props: true
		}
	]
});
