<template>
<div class="sector" :id="id" :sector="sector">
	<v-tooltip
		v-if="sector"
		content-class="sector-tooltip-content"
		right
		lazy
	>
		<div v-if="sector" slot="activator" style="background-color: red">{{ sector.name }}</div>
		<zm-sector-tooltip
			:id="id"
			:sector="sector"
		/>
	</v-tooltip>
</div>
</template>

<script>
import zmSectorTooltip from '@/components/SectorTooltip.vue'
import ZoneSector from '@/zonemap/ZoneSector'

export default {
	name: 'sector',
	props: {
		id: {
			type: String,
			default: ''
		},
		sector: {
			type: Object,
			default: null
			// default: () => new ZoneSector()
		}
	},
	components: {
		zmSectorTooltip
	}
}
</script>

<style>
.sector {
	z-index: 1;
	min-width: 56px!important;
	max-width: 56px!important;
	min-height: 56px!important;
	max-height: 56px!important;
	margin: 0!important;
	padding: 0!important;
	border: 1px solid #D3D3D3;
}

.sector-tooltip-content {
	max-width: 300px;
	color: #000;
	background-color: #fff;
}
</style>
