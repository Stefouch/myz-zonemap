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
			<v-spacer></v-spacer>
			<v-btn icon @click="closeZonescreen()">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<v-layout column id="zonescreen">
			<v-layout row class="zonerow" v-for="y in zonemap.height" :key="y">
				<zm-sector
					v-for="x in zonemap.width"
					:key="coord(x, y)"
					:id="coord(x, y)"
					:gmeye="gmeye"
					:sector="zonemap.get(coord(x, y))"
				/>
			</v-layout>
		</v-layout>
	</div>
</template>

<script>
import zmSector from '@/components/Sector.vue';
import ZoneMap from '@/zonemap/ZoneMap';
import Util from '@/util/Util';

export default {
	name: 'zonescreen',
	props: ['zonemap'],
	data: () => ({
		alphabet: ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
		gmeye: true
	}),
	computed: {
		mapTitle: function() {
			return ': ' + this.zonemap.title.slice(0, 20);
		},
		sectors: function() {
			return this.zonemap.array();
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
		zmSector
	}
}
</script>

<style scoped>
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
</style>
