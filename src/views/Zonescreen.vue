<template>
<div>
	<v-toolbar id="navbar-myz" dense dark>
		<v-toolbar-side-icon></v-toolbar-side-icon>
		<v-toolbar-title class="mr-5">{{ interfaceTitle }}</v-toolbar-title>
		<v-btn icon
			@click="saveZonemap()"
			title="Save modifications"
			:disabled="!zonemapChangeCount"
		>
			<v-icon>mdi-content-save</v-icon>
		</v-btn>
		<v-btn icon
			@click="downloadZonemap()"
			title="Download the zonemap JSON file"
		>
			<v-icon>mdi-download</v-icon>
		</v-btn>
		<v-btn icon
			@click="gmeye = !gmeye"
			title="Toggle GM view"
		>
			<v-icon>{{ gmeye ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
		</v-btn>
		<v-spacer></v-spacer>
		<v-btn icon
			@click="openHelp()"
			title="Help &amp; Readme"
		>
			<v-icon>mdi-help-circle-outline</v-icon>
		</v-btn>
		<v-btn icon
			@click="optionsDialog = true"
			title="Options"
		>
			<v-icon>mdi-settings</v-icon>
		</v-btn>
		<v-btn icon
			@click="closeZonescreen()"
			title="Close"
		>
			<v-icon>mdi-close</v-icon>
		</v-btn>
	</v-toolbar>

	<!-- ZONESCREEN & SECTORS ============================================= -->
	<v-layout column id="zonescreen" v-if="zonemap" class="dragscroll">
		<v-layout row class="zonerow" v-for="y in zonemap.height" :key="y">
			<zm-sector
				v-for="x in zonemap.width"
				:key="coord(x, y)"
				:id="coord(x, y)"
				:ref="coord(x, y)"
				:gmeye="gmeye"
				:sector="zonemap.get(coord(x, y))"
				@open="edition($event)"
			/>
		</v-layout>
	</v-layout>

	<!-- EDIT-SECTOR DIALOG =============================================== -->
	<v-dialog
		v-model="editDialog"
		fullscreen
		hide-overlay
		transition="dialog-bottom-transition"
	>
		<zm-edit-sector
			:coordinates="selectedCoord"
			:editedSector="selectedSector"
			:lang="zonemap.lang"
			@close="editDialog = false"
			@change="changeSector($event)"
		></zm-edit-sector>
	</v-dialog>

	<!-- OPTIONS DIALOG =================================================== -->
	<v-navigation-drawer
		v-model="optionsDialog"
		fixed
		right
		temporary
	>
		<v-layout column px-3>
			<h2>Options</h2>
			<v-tabs grow>
				<v-tab>
					File
				</v-tab>
				<v-tab-item lazy>
					<h4>Infos</h4>
					<v-text-field
						v-model="zonemap.title"
						@input="zonemapChangeCount++"
						label="Map title"
					/>
					<v-text-field
						v-model="zonemap.author"
						@input="zonemapChangeCount++"
						label="Author"
					/>
					<v-divider></v-divider>
					<h4>Locale</h4>
					<v-select
						v-model="zonemap.lang"
						@change="zonemapChangeCount++"
						:items="$root.mapLangs"
						label="Sector language"
						prepend-icon="mdi-web"
					/>
					<p class="text-info">This option only changes the language used for the items generated in a sector.</p>
					<v-divider></v-divider>
					<h4>Saving</h4>
					<v-switch
						v-model="minified"
						:label="minified ? 'Minify' : 'Do not minify'"
					/>
					<p class="text-info">By default, the Zonemap JSON file is minified and compressed. By disabling this option, your file will be significantly larger, but readable for a human eye.</p>
				</v-tab-item>
				<v-tab>
					Background
				</v-tab>
				<v-tab-item lazy>
					<h4>Image File</h4>
					<div v-if="!zoneBg">
						<zm-file-input
							v-model="zoneBgFilename"
							@change="onZoneBgChange($event)"
							accept="image/*"
							label="Choose an image file of your zonemap"
						/>
						<!-- <v-btn small
							:disabled="!zoneBgFilename"
							@click="setZoneBg()"
						>
							Load
						</v-btn> -->
					</div>
					<div v-else>
						<v-img
							v-if="zoneBg"
							:src="zoneBgDataURI"
							max-width="200px"
							max-height="200px"
						/>
						<template v-slot:placeholder>
							<v-layout
								fill-height
								align-center
								justify-center
								ma-0
							>
								<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
							</v-layout>
						</template>
						<v-btn small @click="clearZoneBg()">Remove</v-btn>
					</div>
				</v-tab-item>
			</v-tabs>
		</v-layout>
		
	</v-navigation-drawer>

</div>
</template>

<script>
import zmSector from '@/components/Sector.vue';
import zmEditSector from '@/components/EditSector.vue';
import zmFileInput from '@/components/FileInput.vue';
import dragscroll from 'dragscroll';
import ZoneMap from '@/zonemap/ZoneMap';
import Util from '@/util/Util';

export default {
	name: 'zonescreen',
	props: {
		passingZonemap: {
			type: ZoneMap,
			default: null
		}
	},
	data: function() {
		return {
			zonemap: this.passingZonemap,
			minified: true,
			zoneBgFilename: '',
			// zoneBgFile: null,
			zoneBgDataURI: null,
			zoneBg: false,
			gmeye: true,
			selectedCoord: null,
			editDialog: false,
			optionsDialog: false,
			zonemapChangeCount: 0
		};
	},
	created: function() {
		if (!this.zonemap) this.$router.push({ name: 'home' });
		console.log(this.zonemap);
	},
	mounted: function() {
		// Needed here to allow the class:dragscroll to work.
		dragscroll.reset();
	},
	computed: {
		interfaceTitle: function() {
			if (this.zonemap) return `${this.$root.name}: ${this.zonemap.title.slice(0, 20)}`;
			else return this.$root.name;
		},
		selectedSector: function() {
			return this.zonemap.get(this.selectedCoord);
		}/* ,
		zoneBg: function() {
			return !!this.zoneBgDataURI;
		} */
	},
	methods: {
		coord(x, y) {
			const alphabet = [
				'0', 'A', 'B', 'C', 'D', 'E', 'F',
				'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
				'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
			];
			return alphabet[y] + Util.zeroise(x, 2);
		},
		openHelp() {
			window.open('./#/Help', '_blank');
		},
		closeZonescreen() {
			this.$router.push({ name: 'home' });
		},
		edition(data) {
			this.selectedCoord = data[0];
			this.editDialog = true;
		},
		changeSector(sector) {
			this.zonemapChangeCount++;
			if (sector) this.zonemap.set(this.selectedCoord, sector);
			else this.zonemap.delete(this.selectedCoord);
		},
		saveZonemap() {
			localStorage.zonemap = ZoneMap.stringify(this.zonemap);
			this.zonemapChangeCount = 0;
		},
		downloadZonemap() {
			const content = ZoneMap.stringify(this.zonemap, this.minified ? 0 : 2);
			const downloadLink = document.createElement('a');
			const blob = new Blob([content], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			downloadLink.href = url;
			downloadLink.download = `${this.zonemap.title}.zonemap.json`;

			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
		},
		onZoneBgChange(e) {
			const files = e.target.files || e.dataTransfer.files;
			if (!files.length) return;
			this.createZoneBg(files[0]);
		},
		createZoneBg(file) {
			if (!file) {
				alert('No valid background file selected!');
				return;
			}
			const reader = new FileReader();
			const vm = this;
			reader.onload = (e) => vm.zoneBgDataURI = e.target.result;
			reader.onerror = () => console.log('[ERROR] - [Zonemap BG] - Unable to read the file!');
			reader.readAsDataURL(file);
			this.zoneBg = true;
		},
		clearZoneBg() {
			this.zoneBgFilename = null;
			this.zoneBgDataURI = '';
			this.zoneBg = false;
		}
	},
	components: {
		zmSector,
		zmEditSector,
		zmFileInput
	}
};
</script>

<style>
html {
	overflow-y: auto!important;
}

#navbar-myz {
	font-family: 'Big Noodle Titling';
	background-image: url('../assets/darkback.jpg');
	background-position: left;
	background-repeat: repeat-x;
}

#zonescreen {
	width: 100%;
	height: calc(100vh - 48px);
	/* border: 2px solid red; */
	/* border: 10px solid; */
	/* border-image: url('../assets/book-warning.png') 10 round; */
	/* overflow: scroll; */
	overflow: hidden;
	user-select: none;
}

/* #zonescreen::-webkit-scrollbar {
	display: none;
} */

.zonerow {
	min-height: 64px;
	max-height: 64px;
}
</style>
