import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import LoadingComponent from '@/components/Loading.vue';
import ErrorComponent from '@/components/Error.vue';

Vue.use(Router);

export default new Router({
	/* mode: 'history',
	scrollBehavior: function(to, from, savedPosition) {
		if (to.hash) return { selector: to.hash };
		else if (savedPosition) return savedPosition;
		return { x: 0, y: 0 };
	}, */
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
			// component: () => import('./views/Zonescreen.vue'),
			component: () => ({
				// The component to load (should be a Promise).
				component: import('./views/Zonescreen.vue'),
				// A component to use while the async component is loading.
				loading: LoadingComponent,
				// A component to use if the load fails.
				error: ErrorComponent,
				// Delay before showing the loading component. Default: 200ms.
				delay: 200,
				// The error component will be displayed if a timeout is
				// provided and exceeded. Default: Infinity.
				timeout: 30000
			}),
			props: true
		},
		{
			path: '/help',
			name: 'help',
			component: () => import('./views/Help.vue')
		}
	]
});
