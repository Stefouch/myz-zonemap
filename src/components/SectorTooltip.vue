<template>
<div class="sector-tooltip">
	<!-- TITLE -->
	<h3>
		<v-icon small>{{ sector.icon || $root.typeIcons[sector.type] }}</v-icon>&nbsp;{{ sector.name }} ({{ id }})
	</h3>

	<!-- TYPE & ENV -->
	<p>{{ sector.environment }}
		<span v-if="sector.ruins">+&nbsp;<b>{{ sector.ruins }}</b></span>
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

	<!-- MOOD -->
	<div v-if="sector.mood" class="text-info">
		<v-divider/>
		<span><b>Mood:</b> {{ sector.mood }}</span>
	</div>

	<!-- NOTES -->
	<div v-if="sector.notes" class="text-info">
		<v-divider/>
		<span><b>Notes:</b> {{ sector.notes }}</span>
	</div>

	<!-- FINDS -->
	<div v-if="!sector.isEmpty">
		<v-divider />
		<v-layout row class="sector-tooltip-finds">
			<div
				v-for="find in activeFinds"
				:key="find[0]"
			>{{ find[1] }}
				<v-icon small>{{ $root.findIcons[find[0]] }}</v-icon>
			</div>
		</v-layout>
	</div>
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
	computed: {
		activeFinds: function() {
			return Object.entries(this.sector.finds).filter(arr => arr[1] > 0);
		}
	}
};
</script>

<style>
.sector-tooltip {
	font-family: 'ArcherPro Book';
	font-size: 1rem;
	line-height: 1.10;
	background-color: #fff;
}

.sector-tooltip > * {
	margin: 0;
	padding: 0;
}

.sector-tooltip b {
	font-family: 'ArcherPro Bold';
}

.sector-tooltip .v-divider {
	margin: 4px 0;
}

.sector-tooltip-mood b,
.sector-tooltip-notes b {
	font-family: 'Futura Std Heavy';
}

.sector-tooltip-finds {
	font-family: 'Futura Std Medium';
	font-size: .7rem;
}

.sector-tooltip-finds div:not(:last-child) {
	margin-right: .3rem;
}
</style>
