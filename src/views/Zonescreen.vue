<template>
<div v-if="zonemap">
	<v-toolbar id="navbar-myz" dense dark>
		<v-toolbar-side-icon></v-toolbar-side-icon>
		<v-toolbar-title class="mr-5">Find My Path{{ mapTitle }}</v-toolbar-title>
		<v-btn icon>
			<v-icon>mdi-content-save</v-icon>
		</v-btn>
		<v-btn icon @click="$router.push('help')">
			<v-icon>mdi-help-circle-outline</v-icon>
		</v-btn>
		<v-btn icon @click="editDialog = true">
			<v-icon>mdi-square-edit-outline</v-icon>
		</v-btn>
		<v-spacer></v-spacer>
		<v-btn icon @click="closeZonescreen()">
			<v-icon>mdi-close</v-icon>
		</v-btn>
	</v-toolbar>

	<!-- ZONESCREEN ======================================================= -->
	<v-layout column id="zonescreen">
		<v-layout row class="zonerow" v-for="y in zonemap.height" :key="y">
			<zm-sector
				v-for="x in zonemap.width"
				:key="coord(x, y)"
				:id="coord(x, y)"
				:gmeye="gmeye"
				:sector="zonemap.get(coord(x, y))"
				:selected="coord(x, y) === selectedCoord"
				@click="selectedCoord = id"
			/>
		</v-layout>
	</v-layout>

	<!-- EDIT-SECTOR DIALOG =============================================== -->
	<v-dialog
		v-model="editDialog"
		v-if="selectedSector"
		fullscreen
		hide-overlay
		transition="dialog-bottom-transition"
	>
		<v-card class="bg-edit-dialog">
			<v-toolbar class="edit-dialog-toolbar" dark dense>
				<v-btn icon dark @click="editDialog = false">
					<v-icon>mdi-close</v-icon>
				</v-btn>
				<v-toolbar-title>Sector: <b>{{ selectedSector.name }}</b></v-toolbar-title>
				<v-spacer></v-spacer>
				<v-toolbar-items>
					<v-btn dark flat>
						<v-icon>mdi-content-save</v-icon>&nbsp;Save
					</v-btn>
					<v-btn dark flat>
						<v-icon>mdi-dice-6</v-icon>&nbsp;Roll
					</v-btn>
					<v-btn dark flat>
						<v-icon>mdi-delete</v-icon>&nbsp;Delete
					</v-btn>
				</v-toolbar-items>
			</v-toolbar>
			<zm-edit-sector :editedSector="selectedSector"></zm-edit-sector>
		</v-card>
	</v-dialog>
</div>
</template>

<script>
import zmSector from '@/components/Sector.vue';
import zmEditSector from '@/components/EditSector.vue';
import ZoneMap from '@/zonemap/ZoneMap';
import Util from '@/util/Util';

export default {
	name: 'zonescreen',
	props: {
		zonemap: {
			type: ZoneMap,
			default: null
		}
	},
	data: () => ({
		alphabet: ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
		gmeye: true,
		selectedCoord: 'B12',
		editDialog: true
	}),
	computed: {
		mapTitle: function() {
			return ': ' + this.zonemap.title.slice(0, 20);
		},
		sectors: function() {
			return this.zonemap.array();
		},
		selectedSector: function() {
			return this.zonemap.get(this.selectedCoord);
		}
	},
	created: function() {
		if (!this.zonemap) this.$router.push({ name: 'home' });
		console.log(this.zonemap);
	},
	methods: {
		coord(x, y) {
			return this.alphabet[y] + Util.zeroise(x, 2);
		},
		closeZonescreen() {
			this.$router.push({ name: 'home' });
		}
	},
	components: {
		zmSector,
		zmEditSector
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

.bg-edit-dialog {
	background-image: url('../assets/background.jpg');
	background-repeat: no-repeat;
	background-position: center center;
	/* background-attachment: fixed; */
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
}

.edit-dialog-toolbar {
	font-family: 'Futura Std Medium';
}
</style>
