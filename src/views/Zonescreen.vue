<template>
<div>
	<v-toolbar id="navbar-myz" dense dark>
		<v-toolbar-side-icon></v-toolbar-side-icon>
		<v-toolbar-title class="mr-5">{{ mapTitle }}</v-toolbar-title>
		<v-btn icon :disabled="!editedZonemap" @click="saveZonemap()">
			<v-icon>mdi-content-save</v-icon>
		</v-btn>
		<v-btn icon @click="editDialog = true">
			<v-icon>mdi-square-edit-outline</v-icon> {{ selectedCoord }}
		</v-btn>
		<v-spacer></v-spacer>
		<v-btn icon @click="helpDialog = true">
			<v-icon>mdi-help-circle-outline</v-icon>
		</v-btn>
		<v-btn icon @click="closeZonescreen()">
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

	<!-- EDIT-SECTOR DIALOG v-if="selectedCoord"=============================================== -->
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

	<!-- HELP-SECTOR DIALOG =============================================== -->
	<v-dialog
		v-model="helpDialog"
		fullscreen
		hide-overlay
		transition="dialog-bottom-transition"
	>
		<zm-help
			@close="helpDialog = false"
		></zm-help>
	</v-dialog>
</div>
</template>

<script>
import zmSector from '@/components/Sector.vue';
import zmEditSector from '@/components/EditSector.vue';
import zmHelp from '@/components/Help.vue';
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
			gmeye: true,
			selectedCoord: null,
			// selectedSector: null,
			editDialog: false,
			helpDialog: false,
			editedZonemap: false
		}
	},
	computed: {
		mapTitle: function() {
			if (this.zonemap) return `Find My Path: ${this.zonemap.title.slice(0, 20)}`;
			else return 'Find My Path';
		},
		selectedSector: function() {
			return this.zonemap.get(this.selectedCoord);
		}
	},
	created: function() {
		if (!this.zonemap) this.$router.push({ name: 'home' });
		console.log(this.zonemap);
	},
	mounted: function() {
		dragscroll.reset();
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
		closeZonescreen() {
			this.$router.push({ name: 'home' });
		},
		edition(data) {
			this.selectedCoord = data[0];
			this.editDialog = true;
		},
		changeSector(sector) {
			this.editedZonemap = true;
			if (!sector) this.zonemap.delete(this.selectedCoord);
			else this.zonemap.set(this.selectedCoord, sector);
		},
		saveZonemap() {
			//
		}
	},
	components: {
		zmSector,
		zmEditSector,
		zmHelp
	}
}
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
	border: 2px solid red;
	overflow: scroll;
	user-select: none;
}

.zonerow {
	min-height: 64px;
	max-height: 64px;
}
</style>
