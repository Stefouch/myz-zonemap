<template>
<v-container class="icon-picker-content" fluid>
	<h2>Icon Picker
	</h2>
	<v-text-field
		v-model="selected"
		label="Material Design Icon"
		clearable
		box
	>
		<template v-slot:append-outer>
			<v-btn icon large v-if="selected" @click="selectIcon(selected)" >
				<v-icon x-large>{{ `mdi-${selected}` }}</v-icon>
			</v-btn>
			<v-btn icon large v-else @click="clearIcon()">
				<v-icon x-large color="#9B2423">mdi-close</v-icon>
			</v-btn>
		</template>
	</v-text-field>
	<v-divider></v-divider>
	<v-text-field
		v-model="searchInput"
		label="Search for an icon"
		prepend-inner-icon="mdi-magnify"
		clearable
		box
	/>
	<v-layout row wrap class="icons-list">
		<v-icon x-large
			v-for="icon in _icons"
			:key="icon"
			v-text="`mdi-${icon}`"
			@click="selected = icon"
		/>
	</v-layout>
</v-container>
</template>

<script>
// import IconsStorage from '@/util/IconsStorage';

export default {
	name: 'iconpicker',
	props: {
		icon: {
			type: String,
			default: null
		}
	},
	data: () => ({
		// icons: null,
		// iconsStorage: new IconsStorage(),
		icons: ['alert', 'alert-circle', 'close', 'delete', 'compass', 'flag', 'flag-variant', 'radioactive', 'space-invaders', 'paw', 'weather-sunny', 'weather-night', 'tag', 'home', 'home-variant', 'terrain', 'alert-decagram', 'flower-tulip', 'city', 'notebook', 'ammunition', 'pizza', 'water', 'water-pump', 'star', 'car', 'bank', 'timer-sand', 'chess-rook', 'skull', 'skull-crossbones', 'pine-tree', 'hospital-building', 'bug', 'flower', 'mushroom', 'tree', 'cactus', 'airplane', 'ferry', 'map-marker', 'airport', 'airplane-takeoff', 'beach', 'bridge', 'castle', 'church', 'domain', 'factory', 'gas-station', 'office-building', 'parking', 'pier', 'pool', 'stadium', 'store', 'theater', 'settings', 'hexagram', 'shape', 'soccer-field', 'subway', 'flash'].sort(),
		_icons: null,
		selected: null,
		searchInput: ''
	}),
	created: function() {
		this._icons = this.icons;
	},
	/* mounted: function() {
		if (this.iconsStorage.icons) {
			this.icons = this.iconsStorage.icons;
		}
		else {
			const iconsPromise = this.iconsStorage.getIcons();
			iconsPromise.then(icons => this.icons = icons);
		}
	}, */
	watch: {
		icon: function() {
			if (this.icon) this.selected = this.icon.slice(4);
			else this.selected = null;
		},
		searchInput: function() {
			if (this.searchInput) {
				this._icons = this.icons.filter(item => {
					const searches = item.split('-').map(namePiece => {
						return namePiece.search(this.searchInput.toLowerCase());
					});
					return searches.indexOf(true) > -1;
				});
			}
			else {
				this._icons = this.icons;
			}
		}
	},
	methods: {
		selectIcon(icon) {
			this.$emit('icon', `mdi-${icon}`);
		},
		clearIcon() {
			this.$emit('icon', null);
		}
	}
}
</script>

<style scoped>
.icon-picker-content {
	background-color: #fff;
	padding-top: 0;
}

.icon-picker-content .icons-list {
	width: 250px;
	height: 250px;
	overflow-y: scroll;
	overflow-x: hidden;
}

.icon-picker-content .icons-list .v-icon {
	margin: 1px;
	padding: 1px;
}

.icon-picker-content .icons-list .v-icon:hover {
	outline: 1px solid green;
	background-color: #C8C8C8;
}
</style>
