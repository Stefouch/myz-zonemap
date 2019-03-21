<template>
	<div>
		<v-toolbar id="navbar-myz" dense dark>
			<v-toolbar-side-icon></v-toolbar-side-icon>
			<v-toolbar-title class="mr-4">Find My Path: {{ zonemap.title }}</v-toolbar-title>
			<v-btn icon>
				<v-icon>save</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>help_outline</v-icon>
			</v-btn>
			<v-spacer></v-spacer>
			<v-btn icon @click="closeZonescreen()">
				<v-icon>close</v-icon>
			</v-btn>
		</v-toolbar>
		<div id="zonescreen">

		</div>
	</div>
</template>

<script>
import ZoneMap from '@/zonemap/ZoneMap';

export default {
	name: 'zonescreen',
	props: ['zonemap'],
	computed: {
		sectors: function() {
			return this.zonemap.array();
		}
	},
	created: function() {
		if (!this.zonemap) this.$router.push({ name: 'home' });
		console.log(this.zonemap);
	},
	methods: {
		closeZonescreen() {
			this.$router.push({ name: 'home' });
		}
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

.sector {
	z-index: 1;
	min-width: 64px;
	width: 64px;
	height: 64px;
	margin: 0;
	padding: 1px;
	border: 1px solid #D3D3D3;
}
</style>
