<template>
<div
	class="sector"
	:class="{ 'sector-fog': sectorFog }"
	:id="id"
	:gmeye="gmeye"
	:sector="sector"
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
				<v-icon x-large>{{ sectorMarker }}</v-icon>
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
		gmeye: {
			type: Boolean,
			default: true
		},
		sector: {
			type: Object,
			default: null
			// default: () => new ZoneSector()
		}
	},
	computed: {
		sectorFog: function() {
			if (!this.sector) return true;
			return !this.sector.explored;
		},
		sectorThemeClasses: function() {
			return {
				'sector-rotoasis': this.sector.rotLvl === 0,
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
			if (this.sector.type === SectorTypes.zone) return 'mdi-image-filter-hdr';
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
	background-color: rgba(0,118,190,.25);
}

.sector-inner {
	width: 100%;
	height: 100%;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
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
	margin-left: 1px;
	margin-right: 1px;
	font-family: 'Futura Std Heavy';
}

.sector-name-empty {
	color: #7F7F7F;
}

.sector-marker {
	position: absolute;
	z-index: -999;
	width: auto;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid red;
}

.sector-marker > .v-icon {
	color: #C8C8C8;
}

.sector-tooltip-content {
	max-width: 300px;
	color: #000;
	background-color: #fff;
}
</style>
