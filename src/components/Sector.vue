<template>
<div
	class="sector"
	:class="{ 'sector-fog': hasFog }"
	:id="id"
	:gmeye="gmeye"
	:sector="sector"
	@click="selected = !selected"
	@dblclick="$emit('open', [id, sector])"
>
	<v-tooltip
		v-if="sector"
		content-class="sector-tooltip-content"
		right
		lazy
	>
		<v-flex
			v-if="sector"
			class="sector-inner"
			:class="sectorThemeClasses"
			slot="activator"
		>
			<div class="sector-marker">
				<v-icon large>{{ sectorMarker }}</v-icon>
			</div>
			<div class="sector-icons">
				<v-icon small v-if="sector.hasThreat" class="sector-icon-threat">mdi-skull</v-icon>
				<v-icon small v-if="sector.hasArtifact" class="sector-icon-arto">mdi-star</v-icon>
			</div>
			<div class="sector-name" :class="{ 'sector-name-empty': sector.isEmpty }">{{ processedName }}</div>
		</v-flex>
		<zm-sector-tooltip
			:id="id"
			:sector="sector"
		/>
	</v-tooltip>
	<span v-else class="sector-null">{{ id }}</span>
</div>
</template>

<script>
import zmSectorTooltip from '@/components/SectorTooltip.vue'
import ZoneSector from '@/zonemap/ZoneSector'
import SectorTypes from '@/zonemap/ZoneSectorTypes'

export default {
	name: 'sector',
	props: {
		id: {
			type: String,
			default: '#YX'
		},
		sector: {
			type: ZoneSector,
			default: null
		},
		gmeye: {
			type: Boolean,
			default: true
		}
	},
	data: () => ({
		selected: false
	}),
	computed: {
		hasFog: function() {
			if (!this.sector) return true;
			return !this.sector.explored;
		},
		sectorThemeClasses: function() {
			return {
				'sector-selected': this.selected,
				'sector-rotoasis': this.sector.rotLvl <= 0,
				'sector-rotstrong': this.sector.rotLvl === 2,
				'sector-rothotspot': this.sector.rotLvl >= 3,
				'sector-special': this.sector.type === SectorTypes.special,
				'sector-ark': this.sector.type === SectorTypes.ark
			}
		},
		processedName: function() {
			let name = this.sector.name;
			if (name.length > 20) name = `${name.slice(0, 18)}...`;
			return name;
		},
		sectorMarker: function() {
			if (this.sector.icon) return this.sector.icon;
			if (this.sector.type === SectorTypes.ark) return 'mdi-home';
			if (this.sector.type === SectorTypes.special) return 'mdi-alert-decagram';
			return '';
		}
	},
	components: {
		zmSectorTooltip
	}
}
</script>

<style>
.sector {
	position: relative;
	z-index: 1;
	min-width: 64px!important;
	max-width: 64px!important;
	min-height: 64px!important;
	max-height: 64px!important;
	margin: 0!important;
	padding: 1px!important;
	border: 1px solid #D3D3D3;
	font-family: 'Futura Std Medium';
	font-size: .8rem;
}

.sector:hover {
	padding: 0!important;
	border: 2px solid #0076BE;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
	background-color: rgba(0, 118, 190, .25);
}

.sector-inner {
	width: 100%;
	height: 100%;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
}

.sector-selected {
	padding: 0!important;
	border: 2px solid #00A800 !important;
	background-color: rgba(0, 168, 0, .10);
}

.sector-rotoasis {
	border: 1px dashed #A0DB8E;
	background-color: rgba(160, 219, 142, .10);
}

.sector-rotstrong {
	border: 1px dashed #E55600;
	background-color: rgba(229, 87, 0, .10);
}

.sector-rothotspot {
	border: 1px dashed #9B2423;
	background-color: rgba(155, 36, 35, .10);
}

.sector-ark {
	border: 1px solid #DB9F00;
	background-color: rgba(219, 159, 0, .25);
}

.sector-special {
	border: 1px solid #0076BE;
	background-color: rgba(0, 118, 190, .25);
}

.sector-fog {
	background-color: rgba(211, 211, 211, .50);
}

.sector-icons {
	height: 16px;
}

.sector-icons > .sector-icon-threat {
	color: #D3282C;
}

.sector-icons > .sector-icon-arto {
	color: #DB9F00;
}

.sector-name {
	text-align: center;
	margin-top: 4px;
	margin-left: 2px;
	margin-right: 2px;
	/* font-family: 'Futura Std Heavy'; */
	line-height: 1.10;
}

.sector-name-empty {
	color: #7F7F7F;
}

.sector-marker {
	position: absolute;
	z-index: -999;
	width: 60px;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: flex-end;
}

.sector-marker > .v-icon {
	margin-bottom: 4px;
	color: #D3D3D3;
}

.sector-null {
	font-size: .65rem;
	color: #C8C8C8;
	margin: 2px;
}

.sector-tooltip-content {
	max-width: 300px;
	color: #000;
	background-color: #fff;
}
</style>
