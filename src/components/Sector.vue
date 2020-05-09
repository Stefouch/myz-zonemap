<template>
<div
	class="sector"
	:class="{ 'sector-plain-fog': hasPlainFog, 'sector-light-fog': hasLightFog, 'sector-selected': selected }"
	:id="id"
	:gmeye="gmeye"
	:sector="sector"
	:lang="lang"
	@click.ctrl="toggleExploreOrCreate(id, sector)"
	@click.alt="$emit('change', [id, null])"
	@contextmenu.prevent="$emit('open', [id, sector])"
>
	<span class="sector-coord" :class="{ hide: !hasPlainFog && !hasLightFog }">{{ id }}</span>
	<v-tooltip
		v-if="sector"
		content-class="sector-tooltip-content"
		open-delay="500"
		right
		lazy
	>
		<v-flex
			class="sector-inner"
			:class="sectorThemeClasses"
			slot="activator"
		>
			<div class="sector-marker">
				<v-icon size="56">{{ sectorIcon }}</v-icon>
			</div>
			<div class="sector-icons" :class="{ hide: !gmeye }">
				<v-icon size="14" v-if="sector.hasThreat" class="sector-icon-threat">mdi-skull</v-icon>
				<v-icon size="14" v-if="sector.hasArtifact" class="sector-icon-arto">mdi-star</v-icon>
				<v-icon size="14" v-if="sector.rotLvl >= 2" class="sector-icon-rad">mdi-radioactive</v-icon>
				<v-icon size="14" v-if="sector.notes" class="sector-icon-note">mdi-notebook</v-icon>
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
import FogTypes from '@/zonemap/FogTypes'

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
			// default: () => new ZoneSector()
		},
		lang: {
			type: String,
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
		hasLightFog: function() {
			if (!this.sector) return false;
			return this.sector.status === FogTypes.DISCOVERED;
		},
		hasPlainFog: function() {
			if (!this.sector) return true;
			return this.sector.status === FogTypes.UNEXPLORED;
		},
		sectorThemeClasses: function() {
			return {
				// 'sector-selected': this.selected,
				'sector-rotoasis': this.sector.rotLvl <= 0,
				'sector-rotstrong': this.sector.rotLvl === 2,
				'sector-rothotspot': this.sector.rotLvl >= 3,
				'sector-special': this.sector.type === SectorTypes.special,
				'sector-ark': this.sector.type === SectorTypes.ark,
				'hide': !this.gmeye && this.sector.status != FogTypes.EXPLORED
			}
		},
		processedName: function() {
			let name = this.sector.name;
			if (name.length > 18) name = `${name.slice(0, 16)}…`;
			return name;
		},
		sectorIcon: function() {
			if (this.sector) return this.sector.icon;
			else return '';
		}
	},
	methods: {
		toggleExploreOrCreate(id, sector){
			if (sector) {
				console.log("hi");
				if (sector.status === FogTypes.EXPLORED) {
					sector.status = FogTypes.UNEXPLORED;
				} else if (sector.status === FogTypes.DISCOVERED) {
					sector.status = FogTypes.EXPLORED;
				} else {
					sector.status = FogTypes.DISCOVERED;
				}
				console.log(sector);
				console.log(sector.clone());
				console.log(new ZoneSector());
				console.log(() => new ZoneSector());
				this.$emit('change', [id, sector])
			} else {
				console.log("hello");
				let newSector = new ZoneSector({status : FogTypes.DISCOVERED}, this.lang);
				console.log(newSector);
				console.log(newSector.clone());
				console.log(new ZoneSector());
				console.log(() => new ZoneSector());
				this.$emit('change', [id, newSector])
			}
		}
	},
	components: {
		zmSectorTooltip
	}
};
</script>

<style>
.sector {
	position: relative;
	z-index: 1;
	min-width: 64px !important;
	max-width: 64px !important;
	min-height: 64px !important;
	max-height: 64px !important;
	margin: 0 !important;
	padding: 1px !important;
	border: 1px solid #D3D3D3;
	font-family: 'Futura Std Medium';
	font-size: .8rem;
}

.sector:hover {
	padding: 0 !important;
	border: 2px solid #0076BE;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
	/* background-color: rgba(0, 118, 190, .25); */
}

.sector-inner {
	width: 100%;
	height: 100%;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
	display: flex;
	/* justify-content: center; */
	/* align-items: center; */
	padding: 2px;
}

.sector-selected {
	padding: 0!important;
	border: 2px solid #00A800 !important;
	background-color: rgba(0, 168, 0, .10);
}

.sector-rotoasis {
	border: 1px dashed #A0DB8E;
}

.sector-plain-fog .sector-rotoasis:not(.sector-ark):not(.sector-special) {
	background-color: rgba(160, 219, 142, .10);
}

.sector-rotstrong {
	border: 1px dashed #E55600;
}

.sector-plain-fog .sector-rotstrong {
	background-color: rgba(229, 87, 0, .10);
}

.sector-rothotspot {
	border: 1px dashed #9B2423;
}

.sector-plain-fog .sector-rothotspot {
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

.sector-plain-fog {
	background-color: rgba(133, 133, 111, .75);
}

.sector-plain-fog:not([gmeye]) {
	background-color: rgb(133, 133, 133);
}

.sector-light-fog {
	background-color: rgba(111, 111, 111, .50);
}

.sector-icons {
	position: absolute;
	height: 14px;
	width: 56px;
	padding: 0;
	margin: 0;
	text-align: right;
	line-height: 1;
}

.sector-icons > .sector-icon-threat {
	color: #9B2423;
}

.sector-icons > .sector-icon-arto {
	color: #DB9F00;
}

.sector-icons > .sector-icon-rad {
	border-radius: 500px;
	background-color: #ffff66;
}

.sector-icons > .sector-icon-safe {
	color: #237F52;
}

.sector-icons > .sector-icon-note {
	color: #005991;
}

.sector-name {
	align-self: flex-end;
	vertical-align: middle;
	text-align: center;
	width: 100%;
	bottom: 0;
	line-height: 1.10;
	text-shadow: -1px 1px 0 #fff,
				1px 1px 0 #fff,
				1px -1px 0 #fff,
				-1px -1px 0 #fff;
}

.sector-name-empty {
	color: #C8C8C8;
	/* text-shadow: none; */
}

.sector-marker {
	position: absolute;
	z-index: -999;
	width: 56px;
	height: 56px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.sector-marker > .v-icon {
	color: #535353;
}

.sector-coord {
	position : absolute;
	font-size: .65rem;
	color: #C8C8C8;
	margin: 2px;
}

.sector:hover .sector-null {
	color: #0076BE;
}

.v-tooltip__content,
.sector-tooltip-content {
	max-width: 250px;
	color: #000 !important;
	background-color: #fff !important;
}

.hide {
	display: none;
}
</style>
