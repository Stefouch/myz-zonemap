<template>
<!-- MAIN CONTAINER ======================================================= -->
<div class="bg-index">
	<div id="main" class="container">

		<div style="text-align: center;">
			<img id="myz-logo" src="../assets/myz-title-white.png" alt="MYZ Logo">
		</div>

		<h1>Find My Path</h1>

		<p>Welcome fellow Mutant,
		<br />Are you lost in the Zone? You're chased by a group of <i>Zone Ghouls</i> and you can't remember the way back to your Ark? Or maybe you are looking after Eden? Don't worry, you find the right place for help!</p>
		<p><b>Mutant: Find My Path</b> is a web application for managing the Map of the Zone for the <i>Mutant:&nbsp;Year&nbsp;Zero</i> tabletop roleplaying game.</p>

		<div class="map-buttons">
			<a id="new-map" class="btn btn-lg btn-outline-light" @click="createNewZonemap()"><i class="fas fa-file"></i>Create a new Map</a>
			<a id="open-map" class="btn btn-lg btn-outline-light"><i class="fas fa-folder-open"></i>Open an existing Map</a>
			<a id="previous-map" class="btn btn-lg btn-outline-light"><i class="fas fa-road"></i>Load last Map</a>
		</div>

		<h5>Notifications</h5>

		<div class="alert alert-success mb-1"><i class="fas fa-check-square"></i> Fully tested web browsers include: Google Chrome, Mozilla Firefox, and Safari (both on desktops and smartphones).</div>

		<div class="alert alert-warning mb-1"><i class="fas fa-exclamation-triangle"></i> Development in progress! Fonctionalities are subject to evolve. Bugs are not impossible. If you're experiencing some weird behavior, please report it there: <a href="http://git" target="_blank">bug report</a>.</div>

		<div class="alert alert-danger mb-1"><i class="fas fa-times-circle"></i> Not compatible with Internet Explorer.</div>

		<h5>Build</h5>	
		<p class="ml-4"><b>{{ this.$root.version }}</b></p>

		<h5>Version Log</h5>
		<p class="ml-4" v-for="(log, index) in this.$root.versionLog" :key="index">{{ log }}</p>

	</div><!--/.Container-->
</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import ZoneMap from '@/zonemap/ZoneMap';

export default {
	name: 'home',
	methods: {
		createNewZonemap() {
			const zm = new ZoneMap();
			zm.setNewSector('A01');
			console.log(zm);
		}
	}
};
</script>

<style scoped>
/* MAIN PAGE (INDEX) ======================================================= */
#main {
	font-family: 'Futura Std Medium';
	font-size: 1rem;
	color: #fff;
	min-height: 70vh;
	padding-top: 6rem;
	padding-bottom: 6rem;
}

#main h1 {
	font-size: calc(3.5rem + 2vw);
	color: #fff;
}

/* @media (max-width: 576px) { #main h1 { font-size: 4rem; } } */

#main h2, #main h3, #main h4, #main h5 {
	font-family: 'Futura Std Heavy';
	text-transform: uppercase;
	margin: 1rem 0;
}

#main p {
	font-family: 'Futura Std Medium';
}

#main b {
	font-family: 'Futura Std Heavy';
}

#main .map-buttons {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 2rem;
	cursor: pointer;
}

@media (min-width: 992px) { #main .map-buttons { flex-direction: row; } }

#main .map-buttons a {
	font-family: 'Big Noodle Titling';
	font-size: 1.5rem;
	text-align: left;
	width: 320px;
	max-width: 320px;
	margin: 0 1rem 1rem 1rem;
	background-color: #19181f;
}

#main .map-buttons a:hover {
	background-color: #fff;
}

#main .map-buttons a i {
	min-width: 32px;
	margin: 0 12px;
}

img#myz-logo {
	width: 80%;
	max-width: 600px;
	/* margin: 24px 6em 6px 6em; */
}

/* BACKGROUNDS ============================================================= */
.bg-index {
	background-image: url('../assets/darkback-wide.jpg');
	background-repeat: no-repeat;
	background-position: top center;
	background-attachment: fixed;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
}
</style>
