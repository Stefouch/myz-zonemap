<template>
<footer class="footer">
	<v-layout row wrap justify-center>
		<v-btn icon @click="openLink('https://www.fb.com/Stefouch')" title="Facebook: Stefouch">
			<v-icon>mdi-facebook-box</v-icon>
		</v-btn>
		<v-btn icon @click="openLink('https://discord.gg/aXYnCCd')" title="Year Zero Discord">
			<v-icon>mdi-discord</v-icon>
		</v-btn>
		<v-btn icon @click="openLink($root.github)" title="Github project">
			<v-icon>mdi-github-circle</v-icon>
		</v-btn>
		<v-btn icon @click="openLink('./#/help')" title="Help">
			<v-icon>mdi-book-open-page-variant</v-icon>
		</v-btn>
	</v-layout>
	
	<div class="footer-legal">
		<v-divider style="margin-bottom: 30px;"></v-divider>
		<p>This a fan project! Made by a MYZ fan, for MYZ fans!</p>
		<p>The literal and graphical information presented on this site about <i>Mutant: Year Zero</i>, including the textures, is copyright <i>Fria Ligan</i> / <i>Free League Publishing</i>. This website is not produced by, endorsed by, supported by, or affiliated with <a href="https://frialigan.se/en" target="_blank">Fria Ligan</a>.</p>
		<p>Icons are courtesy of <a href="https://materialdesignicons.com/" target="_blank">Material Design Icons</a></p>
		<p>Powered by <a href="https://vuejs.org/" target="_blank">Vue.js</a> and <a href="https://vuetifyjs.com/" target="_blank">Vuetify</a></p>
		<p>Released under the <a href="https://opensource.org/licenses/MIT" target="_blank">MIT License</a></p>
		<p>Version: <b>{{ $root.version }}</b></p>
	</div>
</footer>
</template>

<script>
export default {
	methods: {
		openLink(href) {
			window.open(href, '_blank');
		}
	}
};
</script>


<style scoped>
.footer {
	padding: 30px 2.5% 68px 2.5%;
	background-color: #19181f;
	text-align: center;
}

@media (min-width: 768px) { .footer { text-align: left; } }

.footer .v-icon {
	color: rgba(255,255,255,.75);
	margin-left: 1rem;
	margin-right: 1rem;
}

.footer .v-icon:hover {
	color: #fff;
}

.footer p, .footer a {
	font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}

.footer-legal {
	font-size: 12px;
	color: #444;
	max-width: 1000px;
	margin: 20px auto;
	line-height: 1.33;
}
.footer-legal a { color: #444; }
.footer-legal a:hover { color: rgba(255,255,255,.75); }
</style>
