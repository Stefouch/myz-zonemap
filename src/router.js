import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
// import Zonescreen from './views/Zonescreen.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			props: true
		},
		{
			path: '/help',
			name: 'help',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () =>
				import(/* webpackChunkName: "about" */ './views/Help.vue')
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
