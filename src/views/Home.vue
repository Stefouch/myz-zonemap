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
			<a id="new-map" class="btn btn-lg btn-outline-light" @click="newMapDialog = true"><span class="mdi mdi-file"></span>Create a new Map</a>
			<a id="open-map" class="btn btn-lg btn-outline-light" @click="openMapDialog = true"><span class="mdi mdi-folder-open"></span>Open an existing Map</a>
			<a id="previous-map" class="btn btn-lg btn-outline-light" v-show="hasPreviousMap" @click="previousMap()"><span class="mdi mdi-road-variant"></span>Load last Map</a>
		</div>

		<h5>Notifications</h5>

		<div class="alert alert-success mb-1"><span class="mdi mdi-checkbox-marked"></span> Fully tested web browsers include: Google Chrome, Mozilla Firefox, and Safari (both on desktops and smartphones).</div>

		<div class="alert alert-warning mb-1"><span class="mdi mdi-alert"></span> Development in progress! Fonctionalities are subject to evolve. Bugs are not impossible. If you're experiencing some weird behavior, please report it there: <a href="http://git" target="_blank">bug report</a>.</div>

		<div class="alert alert-danger mb-1"><span class="mdi mdi-close-circle"></span> Not compatible with Internet Explorer.</div>

		<h5>Build</h5>
		<p class="ml-4"><b>{{ this.$root.version }}</b></p>

		<h5>Version Log</h5>
		<p class="ml-4" v-for="(log, index) in this.$root.versionLog" :key="index">{{ log }}</p>

	</div>

	<!-- NEW-MAP DIALOG =================================================== -->
	<v-dialog v-model="newMapDialog" width="600px">
		<v-container class="modal-content px-5">
			<v-layout column>
				<h2>Create a new Map</h2>
				<p>Choose the dimensions of the Zone and hit «&nbsp;Create&nbsp;». Beware that the width and the height of the map cannot be changed afterwards.</p>
				<v-form v-model="isNewMapValid" ref="newMapForm">
					<v-text-field
						v-model="title"
						:rules="titleRules"
						label="Map title"
						required
					/>
					<v-layout row>
						<v-flex class="pr-3">
							<v-slider
								v-model="mapWidth"
								label="Width"
								min="3"
								max="30"
								always-dirty
							/>
						</v-flex>
						<v-flex shrink style="width: 60px;">
							<v-text-field
								v-model="mapWidth"
								type="number"
								min="3"
								max="30"
								hide-details
								single-line
								class="mt-0"
							/>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex class="pr-3">
							<v-slider
								v-model="mapHeight"
								label="Height"
								min="3"
								max="26"
								always-dirty
							/>
						</v-flex>
						<v-flex shrink style="width: 60px;">
							<v-text-field
								v-model="mapHeight"
								type="number"
								min="3"
								max="26"
								hide-details
								single-line
								class="mt-0"
							/>
						</v-flex>
					</v-layout>
					<v-select
						v-model="mapGame[0]"
						:items="mapGame"
						label="Game"
						disabled
					/>
					<v-btn :disabled="!isNewMapValid" :loading="loadingDialog" @click="createMap()">Create</v-btn>
					<v-btn @click="newMapDialog = false">Cancel</v-btn>
				</v-form>
			</v-layout>
		</v-container>
	</v-dialog>

	<!-- OPEN-MAP DIALOG ================================================== -->
	<v-dialog v-model="openMapDialog" width="600px">
		<v-container class="modal-content px-5">
			<v-layout column>
				<h2>Open an existing Map</h2>
				<p>Choose a map file on your device and hit «&nbsp;Open&nbsp;».</p>
				<v-form ref="openMapForm">
					<v-layout column>
						<!-- MAX_FILE_SIZE must precede the file input field -->
						<input type="hidden" name="MAX_FILE_SIZE" value="5000000" />
						<!-- Name of input element determines name in $_FILES array -->
						<zm-file-input
							v-model="filename"
							@change="zonemapInputChange($event)"
							accept=".json, application/json"
							label="Choose a Zonemap JSON file"
							required
						/>
					</v-layout>
					<v-btn :disabled="!zonemapFile" :loading="loadingDialog" @click="openMap()">Open</v-btn>
					<v-btn @click="openMapDialog = false">Cancel</v-btn>
				</v-form>
			</v-layout>
		</v-container>
	</v-dialog>

	<!-- LOADING DIALOG ================================================== -->
	<v-dialog v-model="loadingDialog" persistent dark>
		<v-container class="modal-content px-5">
			<v-layout column>
				<h2>Loading ...</h2>
				<p>Please wait while the application is processing <b>The Zone</b>.</p>
				<v-progress-linear indeterminate />
			</v-layout>
		</v-container>
	</v-dialog>

	<!-- FOOTER =========================================================== -->
	<zm-footer></zm-footer>
</div>
</template>

<script>
// @ is an alias to /src
import zmFooter from '@/components/Footer.vue';
import zmFileInput from '@/components/FileInput.vue';
import ZoneMap from '@/zonemap/ZoneMap';
import ZonemapStorage from '@/zonemap/ZonemapStorage';

export default {
	name: 'home',
	data: () => ({
		loadingDialog: false,

		// NEW-MAP DIALOG
		newMapDialog: false,
		isNewMapValid: false,
		title: '',
		titleRules: [
			v => !!v || 'Title is required',
			v => /[a-zA-Z]+/.test(v) || 'Title must contain at least 1 letter'
		],
		mapWidth: 30,
		mapHeight: 18,
		mapGame: ['Mutant Year Zero v4.0'],

		// OPEN-MAP DIALOG
		openMapDialog: false,
		// isOpenMapValid: false,
		filename: '',
		zonemapFile: null,

		// PREV-MAP BUTTON
		hasPreviousMap: false,
	}),
	beforeMount: function() {
		const zm = ZonemapStorage.get();
		if (zm) this.hasPreviousMap = true;
	},
	methods: {
		createMap() {
			this.newMapDialog = false;
			this.loadingDialog = true;
			const zm = new ZoneMap({
				title: this.title,
				width: this.mapWidth,
				height: this.mapHeight,
				game: this.mapGame
			});
			this.gotoZonescreen(zm);
		},
		async openMap() {
			this.openMapDialog = false;
			this.loadingDialog = true;

			if (!this.zonemapFile) return;

			const loaded = await ZonemapStorage.load(this.zonemapFile);

			if (!loaded) return;

			const zonemapJson = ZonemapStorage.get();
			const zm = ZoneMap.parse(zonemapJson);

			if (zm) this.gotoZonescreen(zm);
		},
		zonemapInputChange(e) {
			const files = e.target.files;
			if (files.length) {
				this.zonemapFile = files[0];
				// this.isOpenMapValid = true;
			}
			else {
				// this.isOpenMapValid = false;
				this.zonemapFile = null;
			}
		},
		previousMap() {
			this.loadingDialog = true;
			const zonemapJson = ZonemapStorage.get();
			const zm = ZoneMap.parse(zonemapJson);
			if (zm) this.gotoZonescreen(zm);
		},
		gotoZonescreen(zonemap) {
			// this.$root.zonemap = this.zonemap;
			this.$router.push({
				name: 'zonescreen',
				params: {
					passingZonemap: zonemap
				}
			});
		},
	},
	components: {
		zmFooter,
		zmFileInput
	}
};
</script>

<style>
#main {
	font-family: 'Futura Std Medium';
	font-size: 16px;
	min-height: 70vh;
	padding-top: 6rem;
	padding-bottom: 10rem;
}

#main h1 {
	font-family: 'Big Noodle Titling';
	font-size: calc(3.5em + 2vw);
	color: #fff;
}

/* @media (max-width: 576px) { #main h1 { font-size: 4rem; } } */

#main h2, #main h3, #main h4, #main h5 {
	font-family: 'Futura Std Heavy';
	color: #fff;
	text-transform: uppercase;
	margin: 1rem 0;
}

#main p {
	font-family: 'Futura Std Medium';
	font-size: 1em;
	color: #fff;
}

#main b {
	font-family: 'Futura Std Heavy';
}

#main .map-buttons {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 2rem 0;
}

@media (min-width: 1200px) { #main .map-buttons { flex-direction: row; } }

#main .map-buttons a {
	font-family: 'Big Noodle Titling';
	font-size: 1.5em;
	text-align: left;
	width: 320px;
	max-width: 320px;
	margin: 0 1rem 1rem 1rem;
	background-color: #19181f;
	cursor: pointer;
}

#main .map-buttons a:hover {
	background-color: #fff;
}

#main .map-buttons a span {
	min-width: 32px;
	margin: 0 12px;
}

img#myz-logo {
	width: 80%;
	max-width: 600px;
	/* margin: 24px 6em 6px 6em; */
}

/* BACKGROUND ============================================================== */
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

/* DIALOGS ================================================================= */
.modal-content {
	background-color: #fff;
}
</style>
