<template>
<v-container>
	<h2>Sector</h2>
	<v-text-field
		v-model="sector.name"
		prepend-icon="mdi-flag-variant"
		label="Sector's Name"
		box
	/>
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

	<!-- INFOS ============================================================ -->
	<h2>Infos</h2>
	<v-layout column>
		<v-combobox
			v-model="sector.type"
			:items="sectorTypes"
			label="Type"
			:rules="typeRules"
			:prepend-icon="$root.typeIcons[sector.type] || 'mdi-tag'"
			box
		/>
		<v-combobox
			v-model="sector.environment"
			:items="sectorEnvironments"
			label="Environment"
			prepend-icon="mdi-flower-tulip"
			clearable
			box
		/>
		<v-combobox
			v-model="sector.ruins"
			:items="sectorRuins"
			label="Ruins"
			prepend-icon="mdi-city"
			clearable
			box
		/>
		<v-textarea
			v-model="sector.description"
			label="Description"
			prepend-icon="mdi-file-document"
			auto-grow
			rows="1"
			box
		/>
		<v-autocomplete
			v-model="sector.mood"
			:items="sectorMoods"
			label="Mood"
			prepend-icon="mdi-alert-circle"
			hint="Mood types are: People, Nature, Weather, Remains, Events, Terrain."
			persistent-hint
			clearable
			box
		/>
		<v-textarea
			v-model="sector.notes"
			label="Extra Notes"
			prepend-icon="mdi-notebook"
			auto-grow
			rows="1"
			box
		/>
	</v-layout>

	<!-- THREAT LEVEL ===================================================== -->
	<h2>Threat Level</h2>
	<v-layout column>
		<v-text-field
			v-model="sector.threatLvl"
			type="number"
			label="Threat Level"
			:rules="[v => v >= 0 || 'Cannot be lower than 0']"
			prepend-icon="mdi-alert"
			min="0"
			max="13"
			hide-details
			box
			style="width: 200px;"
		/>
		<v-btn icon>
			<v-icon>mdi-dice-6</v-icon>
		</v-btn>
		<v-combobox
			v-model="sector.threats"
			:items="sectorThreats"
			label="Threats"
			prepend-icon="mdi-space-invaders"
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
						<v-icon>mdi-space-invaders</v-icon>
					</v-avatar>
					{{ data.item }}
				</v-chip>
			</template>
		</v-combobox>
	</v-layout>

	<!-- FINDS ============================================================ -->
	<h2>Finds</h2>
	<v-container grid-list-md text-xs-center>
		<v-layout row wrap>
			<v-flex v-for="(n, find) in sector.finds" :key="find" xs6>
				<v-text-field
					v-model="sector.finds[find]"
					type="number"
					:label="capitalize(find)"
					:rules="[v => v >= 0 || 'Cannot be lower than 0']"
					:prepend-icon="$root.findIcons[find]"
					min="0"
					hide-details
					box
					style="width: 100px;"
				/>
				<v-btn icon
					@click="sector.finds[find] = rand(1, 6)">
					<v-icon>mdi-dice-6</v-icon>
				</v-btn>
				<v-btn icon
					@click="sector.finds[find] = 0"
					:disabled="sector.finds[find] <= 0">
					<v-icon>mdi-cart-arrow-down</v-icon>
				</v-btn>
			</v-flex>
		</v-layout>
	</v-container>
</v-container>
</template>

<script>
import ZoneSector from '@/zonemap/ZoneSector';
import SectorTypes from '@/zonemap/ZoneSectorTypes';
import SectorTables from '@/zonemap/ZoneSectorTables';
import Util from '@/util/Util';

export default {
	props: {
		editedSector: {
			type: ZoneSector,
			default: null
			// default: () => new ZoneSector()
		}
	},
	data: function() {
		return { 
			sector: this.editedSector,
			lang: 'en',
			rotLvlLabels: [
				'Oasis',
				'Weak',
				'Strong',
				'Hotspot'
			],
			typeRules: [
				v => !!v || 'Type is required',
				v => Object.keys(this.$root.typeIcons).indexOf(v) !== -1 || 'This is not a valid sector type'
			]
		}
	},
	computed: {
		rotLvlColor: function() {
			if (this.sector.rotLvl === 0) return '#A0DB8E';
			if (this.sector.rotLvl === 1) return 'orange';
			if (this.sector.rotLvl === 2) return '#E55600';
			if (this.sector.rotLvl >= 3) return '#9B2423';
			return 'red';
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
		}
	}
}
</script>

<style>
.threat-chip {
	font-family: 'Futura Std Medium';
}
</style>
