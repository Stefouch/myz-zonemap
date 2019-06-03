<template>
<v-card class="edit-dialog-bg">
	<v-toolbar class="edit-dialog-toolbar" fixed dark dense :color="sectorColor">
		<v-btn icon dark @click="close()">
			<v-icon>mdi-close</v-icon>
		</v-btn>
		<v-toolbar-title>{{ coordinates }} – <b>{{ sector.name }}</b></v-toolbar-title>
		<v-spacer></v-spacer>
		<v-toolbar-items>
			<v-btn dark flat @click="saveSector(sector)">
				<v-icon>mdi-content-save</v-icon>&nbsp;Save
			</v-btn>
			<v-btn dark flat @click="resetSector()">
				<v-icon>mdi-dice-6</v-icon>&nbsp;Roll
			</v-btn>
			<v-btn dark flat @click="deleteDialog = true" :disabled="!editedSector">
				<v-icon>mdi-delete</v-icon>&nbsp;Delete
			</v-btn>
		</v-toolbar-items>
	</v-toolbar>

	<v-container grid-list-xl scrollable py-5>
		<v-layout row wrap>
			<v-flex sm12 md6 lg4>

				<!-- SECTOR =============================================================== -->
				
				<h2>Sector</h2>
				<v-layout row>
					<v-btn icon large outline @click="iconPickerDialog = true">
						<v-icon x-large>{{ sector.icon }}</v-icon>
					</v-btn>
					<v-text-field
						v-model="sector.name"
						label="Sector's Name"
						box
					/>
				</v-layout>
				<v-switch
					v-model="sector.explored"
					prepend-icon="mdi-compass"
					:label="sector.explored ? 'Explored' : 'Not explored'"
				/>
				<v-slider
					v-model="sector.rotLvl"
					prepend-icon="mdi-radioactive"
					label="Rot Level"
					:color="rotLvlColor"
					:thumb-color="rotLvlColor"
					thumb-label="always"
					ticks="always"
					tick-size="2"
					:tick-labels="rotLvlLabels"
					min="0"
					max="3"
					always-dirty
				/>

				<!-- THREAT LEVEL ========================================================= -->
				<h2>Threat Level</h2>
					<v-layout row>
						<v-flex>
							<v-text-field
								v-model.number="sector.threatLvl"
								type="number"
								label="Threat Level"
								:rules="threatLvlRules"
								:prepend-icon="threatLvlIcon"
								min="0"
								max="13"
								box
							>
								<template v-slot:append>
									<v-btn icon @click="night = !night" :title="night ? 'Night: +3' : 'Day: +0'">
										<v-icon>{{ night ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
									</v-btn>
								</template>
							</v-text-field>
						</v-flex>
						<v-flex align-self-center>
							<v-btn @click="rollThreatLvl()">
								<v-icon>mdi-dice-6</v-icon> Roll
							</v-btn>
						</v-flex>
					</v-layout>
					<v-combobox
						v-model="sector.threats"
						:items="sectorThreats"
						label="Threats"
						placeholder="There are no threat"
						multiple
						chips
						box
					>
						<template v-slot:selection="data">
							<v-chip
								:key="JSON.stringify(data.item)"
								:selected="data.selected"
								:disabled="data.disabled"
								class="v-chip--select-multi threat-chip"
								@input="data.parent.selectItem(data.item)"
								close
								dark
							>
								<v-avatar color="#888888">
									<v-icon>{{ data.item.search(/(ph|f)(e|é)nom(e|è)n/i) > -1 ? 'mdi-alert-octagram-outline' : 'mdi-space-invaders' }}</v-icon>
								</v-avatar>
								{{ data.item }}
							</v-chip>
						</template>
					</v-combobox>

			</v-flex>
			<v-flex sm12 md6 lg4>

				<!-- DESCRIPTION ========================================================== -->
				<h2>Description</h2>
				<v-select
					v-model="sector.type"
					:items="sectorTypes"
					label="Type"
					:prepend-icon="$root.typeIcons[sector.type] || 'mdi-tag'"
					box
				/>
				<v-combobox
					v-model="sector.environment"
					:items="sectorEnvironments"
					label="Environment"
					prepend-icon="mdi-image"
					clearable
					box
				/>
				<v-combobox
					v-model="sector.ruins"
					:items="sectorRuins"
					label="Ruins"
					prepend-icon="mdi-map-marker"
					clearable
					box
				/>
				<v-textarea
					v-model="sector.description"
					label="Ruins Description"
					prepend-icon="mdi-file-document"
					auto-grow
					rows="1"
					box
				>
					<template v-slot:append>
						<v-btn icon
							v-if="!sector.description && sector.ruins"
							@click="defaultDescription()">
							<v-icon>mdi-download</v-icon>
						</v-btn>
					</template>
				</v-textarea>
				<v-combobox
					v-model="sector.mood"
					:items="sectorMoods"
					label="Mood"
					prepend-icon="mdi-alert-circle"
					hint="Mood types are: People, Nature, Weather, Remains, Events, Terrain."
					persistent-hint
					clearable
					box
				/>

			</v-flex>
			<v-flex xs12 lg4>

				<!-- NOTES ================================================================ -->
				<h2>Notes</h2>
				<v-textarea
					v-model="sector.notes"
					label="Extra Notes"
					prepend-icon="mdi-notebook"
					auto-grow
					rows="1"
					box
				/>

				<!-- FINDS ================================================================ -->
				<h2>Finds</h2>
				<v-layout row wrap>
					<v-flex v-for="(n, find) in sector.finds" :key="find" grow sm6 md4 lg12>
						<v-text-field
							v-model.number="sector.finds[find]"
							type="number"
							:label="capitalize(find)"
							:rules="[v => v >= 0 || 'Cannot be lower than 0']"
							:prepend-icon="$root.findIcons[find]"
							min="0"
							hide-details
							box
						>
							<template v-slot:append>
								<v-btn icon
									@click="sector.finds[find] = 0"
									:disabled="sector.finds[find] <= 0">
									<v-icon>mdi-cart-arrow-down</v-icon>
								</v-btn>
								<v-btn icon
									@click="sector.finds[find] = rand(1, 6)">
									<v-icon>mdi-dice-6</v-icon>
								</v-btn>
							</template>
						</v-text-field>
					</v-flex>
				</v-layout>

			</v-flex>

		</v-layout>
	</v-container>

	<!-- ICON-PICKER ========================================================================== -->
	<v-dialog
		v-model="iconPickerDialog"
		width="300px"
		lazy
	>
		<zm-icon-picker
			:icon="sector.icon"
			@icon="pickIcon($event)"
		/>
	</v-dialog>

	<!-- DELETE DIALOG ======================================================================== -->
	<v-dialog
		v-model="deleteDialog"
		width="600px"
	>
		<v-container class="modal-content px-5">
			<v-layout column>
				<h2>Delete Sector</h2>
				<p>You are going to wipe all the values for this sector.</p>
				<v-layout row justify-space-around>
					<v-btn style="width: 100px;" @click="deleteSector()">
						<v-icon>mdi-delete</v-icon> Delete
					</v-btn>
					<v-btn style="width: 100px;" @click="deleteDialog = false">
						<v-icon>mdi-cancel</v-icon> Cancel
					</v-btn>
				</v-layout>
			</v-layout>
		</v-container>
	</v-dialog>

	<!-- SNACKBAR ============================================================================= -->
	<v-snackbar
		v-model="snackbar"
		bottom
	>
		{{ snackbarText }}
		<v-btn icon @click="snackbar = false">
			<v-icon>mdi-close</v-icon>
		</v-btn>
	</v-snackbar>

</v-card>
</template>

<script>
import zmIconPicker from '@/components/IconPicker.vue';
import ZoneSector from '@/zonemap/ZoneSector';
import SectorTypes from '@/zonemap/ZoneSectorTypes';
import SectorTables from '@/zonemap/ZoneSectorTables';
import Util from '@/util/Util';

export default {
	props: {
		editedSector: {
			type: ZoneSector,
			// default: null
			default: () => new ZoneSector()
		},
		coordinates: {
			type: String,
			default: '#YX'
		},
		lang: {
			type: String,
			default: 'en'
		}
	},
	data: function() {
		return { 
			sector: this.editedSector.clone(),
			night: false,
			iconPickerDialog: false,
			deleteDialog: false,
			snackbarText: '',
			snackbar: false,
			rotLvlLabels: [
				'Oasis',
				'Weak',
				'Strong',
				'Hotspot'
			],
			threatLvlRules: [
				v => v >= 0 || 'Must be greater than 0',
				v => typeof v === 'number' || 'Cannot be empty'
			]
		}
	},
	watch: {
		// The function ensures the entries are refreshed each time the dialog is activated.
		coordinates: function() {
			this.sector = this.editedSector.clone();
			if (!this.sector.name) this.sector.name = this.coordinates;
		}
	},
	computed: {
		sectorColor: function() {
			if (this.sector.type === SectorTypes.ark) return '#DB9F00';
			if (this.sector.type === SectorTypes.special) return '#0076BE';
			return '#2A2A2A';
		},
		rotLvlColor: function() {
			if (this.sector.rotLvl === 0) return '#A0DB8E';
			if (this.sector.rotLvl === 1) return 'orange';
			if (this.sector.rotLvl === 2) return '#E55600';
			if (this.sector.rotLvl >= 3) return '#9B2423';
			return 'red';
		},
		threatLvlIcon: function() {
			// Safe Zone Sector
			if (this.sector.threatLvl <= 0) return 'mdi-marker-check';
			// Fringe Zone Sector
			if (this.sector.threatLvl <= 4) return 'mdi-alert-box';
			// Central Zone Sector
			if (this.sector.threatLvl <= 8) return 'mdi-alert';
			// Unusually Dangerous Area
			return 'mdi-alert-octagram';
		},
		sectorTypes: function() {
			return Object.keys(SectorTypes);
		},
		sectorEnvironments: function() {
			return Object.values(SectorTables[this.lang].environments.data).sort();
		},
		sectorRuins: function() {
			const table1 = Object.values(SectorTables[this.lang].normalRuins.data);
			const table2 = Object.values(SectorTables[this.lang].industrialRuins.data);
			const items = [];
			for (const data of table1) items.push(data[0]);
			for (const data of table2) items.push(data[0]);
			return items.sort();
		},
		sectorMoods: function() {
			return Object.values(SectorTables[this.lang].moods.data);
		},
		sectorThreats: function() {
			const humanoids = Object.values(SectorTables[this.lang].threats.data['1'].data);
			const monsters = Object.values(SectorTables[this.lang].threats.data['3'].data);
			const phenomenons = Object.values(SectorTables[this.lang].threats.data['6'].data);
			return humanoids.concat(monsters.concat(phenomenons)).sort();
		}
	},
	methods: {
		rand(min, max) {
			return Util.rand(min, max);
		},
		capitalize(text) {
			return Util.capitalize(text);
		},
		pickIcon(icon) {
			this.iconPickerDialog = false;
			this.sector.icon = icon;
		},
		rollThreatLvl() {
			this.sector.threats = [];
			this.sector.rollThreatLvl(this.night ? 3 : 0);
			// Shows the snackbar.
			const t = this.sector.threats.length;
			const a = this.sector.finds.artifacts;
			this.showSnackbar(`Rolled: ${a} artifact${a > 1 ? 's' : ''}${t ? ' and 1 threat' : ''}`);
		},
		defaultDescription() {
			this.sector.description = ZoneSector.getRuinDescription(this.sector.ruins, this.lang);
		},
		resetSector() {
			this.sector = new ZoneSector({
				name: this.sector.name,
				explored: this.sector.explored,
				// type: this.sector.type,
				icon: this.sector.icon,
				notes: this.sector.notes
			}, this.lang);
			this.showSnackbar('Sector reset!');
		},
		deleteSector() {
			this.$emit('change', null);
			this.close();
		},
		saveSector(sectorToReturn) {
			this.$emit('change', sectorToReturn);
			this.showSnackbar('Sector saved!');
		},
		showSnackbar(text) {
			this.snackbarText = text;
			this.snackbar = true;
		},
		close() {
			this.deleteDialog = false;
			this.iconPickerDialog = false;
			this.snackbar = false;
			this.$emit('close');
		}
	},
	components: {
		zmIconPicker
	}
};
</script>

<style>
.v-label, .threat-chip {
	font-family: 'Futura Std Medium';
}

.edit-dialog-bg {
	/* background-image: url('../assets/background.jpg'); */
	background-repeat: no-repeat;
	background-position: center center;
	background-attachment: fixed;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
}

.edit-dialog-toolbar {
	font-family: 'Futura Std Medium';
}
</style>
