<template>
<v-container>
	<h2>Sector</h2>
	<v-text-field
		v-model="sector.name"
		prepend-icon="mdi-flag-variant"
		label="Sector's Name"
	/>
	<v-switch
		v-model="sector.explored"
		prepend-icon="mdi-compass"
		:label="sector.explored ? 'Explored' : 'Not explored'"
	/>
	<v-slider
		prepend-icon="mdi-radioactive"
		v-model="sector.rotLvl"
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
	<h2>Finds</h2>
	<v-container grid-list-md text-xs-center>
		<v-layout row wrap>
			<v-flex xs6 v-for="(n, find) in sector.finds" :key="find">
				<span
					class="mdi"
					:class="$root.findIcons[find]">
				</span> {{ find }}
				<v-text-field
					v-model="sector.finds[find]"
					type="number"
					min="0"
					hide-details
				/>
				<v-btn icon>
					<v-icon>mdi-dice-6</v-icon>
				</v-btn>
				<v-btn icon @click="sector.finds[find] = 0">
					<v-icon>mdi-cart-arrow-down</v-icon>
				</v-btn>
			</v-flex>
		</v-layout>
	</v-container>
</v-container>
</template>

<script>
import ZoneSector from '@/zonemap/ZoneSector';
import Util from '@/util/Util';

export default {
	props: {
		sector: {
			type: ZoneSector,
			default: null
		}
	},
	data: () => ({
		rotLvlLabels: [
			'Oasis',
			'Weak',
			'Strong',
			'Hotspot'
		]
	}),
	computed: {
		rotLvlColor: function() {
			if (this.sector.rotLvl === 0) return '#A0DB8E';
			if (this.sector.rotLvl === 1) return 'orange';
			if (this.sector.rotLvl === 2) return '#E55600';
			if (this.sector.rotLvl >= 3) return '#9B2423';
			return 'red';
		}
	}
}
</script>

