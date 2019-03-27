<template>
<v-container class="icon-picker-content" fluid>
	<h2>Icon Picker</h2>
	<v-text-field
		v-model="searchIcon"
		label="Search for an icon"
		prepend-inner-icon="mdi-magnify"
		clearable
	/>
	<v-layout row wrap class="icons-list">
		<v-icon x-large
			v-for="icon in _icons"
			:key="icon"
			v-text="`mdi-${icon}`"
			@click="selectIcon(icon)"
		/>
	</v-layout>
</v-container>
</template>

<script>
// import IconsStorage from '@/util/IconsStorage';

export default {
	name: 'iconpicker',
	data: () => ({
		// icons: null,
		// iconsStorage: new IconsStorage(),
		icons: ['alert', 'alert-circle', 'close', 'delete', 'compass', 'flag', 'flag-variant', 'radioactive', 'space-invaders', 'paw', 'weather-sunny', 'weather-night', 'tag', 'home', 'home-variant', 'terrain', 'alert-decagram', 'flower-tulip', 'city', 'notebook', 'ammunition', 'pizza', 'water', 'water-pump', 'star', 'car', 'bank', 'timer-sand', 'chess-rook', 'skull', 'skull-crossbones', 'pine-tree', 'hospital-building', 'bug', 'flower', 'mushroom', 'tree', 'cactus', 'airplane', 'ferry', 'map-marker', 'airport', 'airplane-takeoff', 'beach', 'bridge', 'castle', 'church', 'domain', 'factory', 'gas-station', 'office-building', 'parking', 'pier', 'pool', 'stadium', 'store', 'theater', 'settings', 'hexagram', 'shape', 'soccer-field', 'subway', 'flash'].reverse(),
		_icons: null,
		selected: null,
		searchIcon: ''
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
		searchIcon: function() {
			if (this.searchIcon) {
				this._icons = this.icons.filter(item => {
					const searches = item.split('-').map(namePiece => {
						return namePiece.search(this.searchIcon.toLowerCase());
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
			this.selected = icon;
			this.$emit('icon', `mdi-${icon}`);
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

.icon-picker-content .v-icon {
	margin: 2px;
	padding: 2px;
}

.icon-picker-content .v-icon:hover {
	background-color: #C8C8C8;
	padding: 0;
	border-radius: 4px;
	border: 1px solid red;
}
</style>
