<template>
<div class="sector-tooltip">
	<!-- TITLE -->
	<h3>
		<v-icon small>{{ typeIcons[sector.type] }}</v-icon>&nbsp;{{ sector.name }} ({{ id }})
	</h3>

	<!-- TYPE & ENV -->
	<p>{{ sector.environment }}
		<span v-if="sector.ruins">with <b>{{ sector.ruins }}</b></span>
	</p>

	<!-- THREATS -->
	<div v-if="sector.hasThreat">
		<v-divider/>
		<v-layout row>
			<v-icon small>mdi-space-invaders</v-icon>&nbsp;
			<v-layout column>
				<span v-for="threat in sector.threats" :key="threat"><b>{{ threat }}</b></span>
			</v-layout>
		</v-layout>
	</div>

	<!-- FINDS -->
	<v-divider v-if="!sector.isEmpty" />
	<v-layout row class="sector-tooltip-finds" v-if="!sector.isEmpty">
		<div
			v-for="find in activeFinds"
			:key="find[0]"
		>{{ find[1] }}
			<v-icon small>{{ findIcons[find[0]] }}</v-icon>
		</div>
	</v-layout>
</div>
</template>

<script>
export default {
	props: {
		id: {
			type: String,
			default: ''
		},
		sector: {
			type: Object,
			default: null
		}
	},
	data: () => ({
		typeIcons: {
			zone: 'mdi-image-filter-hdr',
			ark: 'mdi-home',
			special: 'mdi-alert-decagram'
		},
		findIcons: {
			bullets: 'mdi-ammunition',
			grub: 'mdi-pizza',
			water: 'mdi-water',
			artifacts: 'mdi-star'
		}
	}),
	computed: {
		activeFinds: function() {
			return Object.entries(this.sector.finds).filter(arr => arr[1] > 0);
		}
	}
}
</script>

<style>
.sector-tooltip {
	font-family: 'ArcherPro Book';
	font-size: 1rem;
	background-color: #fff;
}

.sector-tooltip > * {
	margin: 0;
	padding: 0;
}

.sector-tooltip b {
	font-family: 'ArcherPro Bold';
}

.sector-tooltip-finds {
	font-family: 'Futura Std Medium';
	font-size: .7rem;
}

.sector-tooltip-finds div:not(:last-child) {
	margin-right: .3rem;
}
</style>
