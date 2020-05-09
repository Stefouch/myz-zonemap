<template>
<v-app :dark="nightMode">
	<v-toolbar class="help-dialog-toolbar" fixed dense dark>
		<v-btn icon dark @click="drawer = !drawer">
			<v-icon>mdi-menu</v-icon>
		</v-btn>
		<v-toolbar-title>HELP: <b>{{ $root.name.toUpperCase() }}</b> v{{ $root.version }}</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-toolbar-items>
			<v-btn icon dark @click="nightMode = !nightMode" title="Toggle night mode">
				<v-icon>{{ nightMode ? 'mdi-lightbulb-outline' : 'mdi-lightbulb' }}</v-icon>
			</v-btn>
			<v-btn icon dark @click="closeHelp()" title="Close this tab">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar-items>
	</v-toolbar>

	<!-- NAVIGATION DRAWER ============================================ -->
	<v-navigation-drawer
		v-model="drawer"
		fixed
		temporary
	>
		<v-list>
			<v-list-tile
				v-for="(entry, i) in drawerEntries"
				:key="i"
			>
				<v-list-tile-content>
					<v-list-tile-title class="navigation-menu-entry">
						<a @click="goto(entry)">{{ formatTitle(entry) }}</a>
					</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</v-list>
	</v-navigation-drawer>

	<v-container py-5 style="max-width: 800px; margin: 0 auto;">

		<!-- HELP TEXT ==================================================== -->
		<v-layout id="helptext" ref="helptext" column>
			<h1>Mutant Year&nbsp;Zero:<br />{{ $root.name }}</h1>
			<div>
				<h2 id="About" ref="About">About</h2>
				<p><b>{{ $root.name }}</b> is a web application for managing the Map of the Zone in the <b>Mutant: Year Zero</b> tabletop roleplaying game. It's a useful companion for generating random Zone sectors on the fly, rolling threats, keeping notes, tracking the resources to find, and many more.</p>
				<p>It's mainly designed for Game Master's Eyes, although the application provides a special mode to showcase explored-only sectors to the Player Characters, hiding from them the location of EDEN.</p>

				<div class="alert alert-success">
					<h4><i class="mdi mdi-book-open-page-variant"></i> ReadMe!</h4>
					<p class="text-info">This document contains many useful information about <b>{{ $root.name }}</b> and how to pilot the web app.
					<br/>It worth the read!</p>
				</div>

				<h3>Saving Your Work</h3>
				<p>The <b>Zonemap</b> can be saved in JSON format, and loaded again for later uses. Because it's JSON, it's easy to edit with a text editor. <small><i>(But beware of what you do here, as this could lead to file corruption.)</i></small></p>
				<div class="alert alert-warning">
					<h4><i class="mdi mdi-content-save"></i> Back-It Up!</h4>
					<p class="text-info">Don't hesitate to back up your zonemap JSON file. Don't always overwrite it when saving.</p>
				</div>
			</div>

			<v-divider></v-divider>
			<h2 id="First_Steps" ref="First_Steps">First Steps</h2>
			<div>
				<p><b>{{ $root.name }}</b> is compatible with modern web browsers, although it doesn't work with Internet Explorer, and never will.</p>
				<p>The development is still in progress and fonctionalities are subject to evolve. Unfortunately, bugs are not impossible. If you encounter some of them, please read <a @click="goto('Troubleshooting')">Troubleshooting</a> below.</p>
				<p>When starting the app, you have three available choices:</p>

				<h3>Create a New Map</h3>
				<p>Choose this option if you want to create a new map from scratch. You have to define a name and its dimensions. Common map of the Zone are 30 sectors wide and 18 sectors high. You may also choose a language among available translations, although this option only change the language used for the infos generated for a sector. It doens't change the user interface's language.</p>

				<h3>Open an Existing Map</h3>
				<p>Choose this option to load a zonemap JSON file hosted on your computer/device.</p>

				<h3>Load Last Map</h3>
				<p>Choose this option to quickly load the last saved map.</p>
			</div>

			<v-divider></v-divider>
			<h2 id="The_Sectors_Grid" ref="The_Sectors_Grid">The Sectors Grid</h2>
			<div>
				<p>The map of the Zone is a grid divided in several squares. Each square is a <b>sector</b>, {{ $root.sectorDim }} pixels tall. The map can't be wider than 30 sectors and higher than 26 sectors.</p>
				<p>The map is "draggable" like any other Google Map. No zoom function yet.</p>

				<h3>Toolbar</h3>
				<p>At the top, a toolbar offers many functions:</p>
				<ul class="text-info" style="list-style-type: none;">
					<li><i class="mdi mdi-content-save"></i> &mdash; Saves all the changes of the current zonemap to the web browser memory (local storage). Data is saved as long as the browser stays open.</li>
					<li><i class="mdi mdi-download"></i> &mdash; Downloads the zonemap JSON file, including the unsaved changes.</li>
					<li><i class="mdi mdi-settings"></i> &mdash; Opens the options menu.</li>
					<li><i class="mdi mdi-eye"></i> &mdash; Toggles the GM view. Usefull if you want to show the map to the PCs. When toggled off, only explored sectors and basic information are displayed.</li>
					<li><i class="mdi mdi-help-circle-outline"></i> &mdash; Shows this help.</li>
					<li><i class="mdi mdi-bug-outline"></i> &mdash; Reports an issue.</li>
					<li><i class="mdi mdi-close"></i> &mdash; Closes the current map of the Zone and returns back to home.</li>
				</ul>

				<h3>Sector</h3>
				<p>Each <b>sector</b> displays several information: a set of icons, a name, and a marker. Each sector can also have different background &amp; border colors, according to the sector's type, rot level, and exploration status.</p>
				<p>To edit a sector, <code>double-click</code> or <code>right-click</code> the desired square on the grid.</p>

				<v-container fluid grid-list-xl py-0>
					<v-layout row wrap>
						<v-flex xs12 sm6>
							<h4>Icons</h4>
							<ul class="text-info" style="list-style-type: none;">
								<li><i class="mdi mdi-skull"></i> &mdash; Indicates the presence of a <b>threat</b> in the sector.</li>
								<li><i class="mdi mdi-star"></i> &mdash; Indicates the presence of an <b>artifact</b> in the sector.</li>
								<li><i class="mdi mdi-radioactive"></i> &mdash; Indicates a <b>Rot level</b> equal to 2 or higher.</li>
								<li><i class="mdi mdi-notebook"></i> &mdash; Indicates some <b>extra notes</b> added by the GM for the sector.</li>
							</ul>
						</v-flex>
						<v-flex xs12 sm6>
							<h4>Colors</h4>
							<ul class="text-info" style="list-style-type: none;">
								<li><b>Gray:</b> unexplored</li>
								<li><b>Blue:</b> special Zone sector</li>
								<li><b>Yellow:</b> Ark sector</li>
								<li><b>Green border:</b> Rot Oasis sector (Rot level 0)</li>
								<li><b>Orange/red border:</b> Rot level 2+</li>
							</ul>
						</v-flex>
					</v-layout>
				</v-container>
				<p>Changes you make to your sector in the editing dialog aren't saved until you hit the <i class="mdi mdi-content-save"></i> (Save) button.</p>
			</div>

			<v-divider></v-divider>
			<h2 id="Custom_Map_Background" ref="Custom_Map_Background">Custom Map Background</h2>
			<div>
				<p>Find My Path allows its user to set a custom image for the background behind the grid of sectors.</p>
				<p>Click the <i class="mdi mdi-settings"></i> icon to display the options menu and then head to the <code>Background</code> tab.</p>
				<p>Select your image using the file input and wait until it's loaded. Hit the <i class="mdi mdi-content-paste"></i> (Use) button to apply the image to the background. Hit the <i class="mdi mdi-trash-can-outline"></i> (Remove) button to reset the background.</p>

				<h3>Placement</h3>
				<p>You may then adjust correctly the placement of the background image behing the sectors grid.</p>
				<ul>
					<li>Use the <i class="mdi mdi-format-horizontal-align-left"></i> &amp; <i class="mdi mdi-format-vertical-align-top"></i> fields to respectively move the image left/right (X axis) and up/down (Y axis). Use negative values to offset the image.</li>
					<li>Use the <i class="mdi mdi-border-horizontal"></i> &amp; <i class="mdi mdi-border-vertical"></i> fields to respectively adjust the width and the height of the background image. <i>(A sector is {{ $root.sectorDim }} pixels tall.)</i></li>
				</ul>
				<div class="alert alert-info">
					<h4><i class="mdi mdi-image-size-select-actual"></i> Default Placement</h4>
					<p class="text-info">Zonemap background images made with the <a href="https://www.youtube.com/watch?v=Re1O43K1K0c" target="_blank">Shane McLean tutorial</a> should fit with values <code>Left: -7, Top: -9, Width: 1944, Height: 1167</code> (not verified).</p>
				</div>
				<div class="alert alert-info">
					<h4><i class="mdi mdi-information-outline"></i> Background Saving</h4>
					<p class="text-info">The background image is not saved in the zonemap JSON file and will then reset each time you close the internet browser. This is a development choice made to reduce the size of the zonemap file. However, all placement data (top, left, width &amp; height values) are saved, which means you only need to reload the image when you re-open your zonemap.</p>
				</div>
			</div>

			<v-divider></v-divider>
			<h2 id="Sector_Data" ref="Sector_Data">Sector's Data</h2>
			<div>
				<p>This section describes all customizable data for a sector.</p>

				<h3><i class="mdi mdi-flag"></i> Sector's name</h3>
				<p>Custom name of the sector. By default, it's the sector's coordinates in the zonemap.</p>
				<v-container fluid py-0>
					<h4>Custom Icon / Map Marker</h4>
					<p class="text-info">An icon can also be added to the sector. Click to circle on the left to display the icon picker, then choose an icon from the list or directly input an icon name (see Material Design Icons website for a complete list of available icons). Click the icon again to confirm your choice.</p>
				</v-container>

				<h3><i class="mdi mdi-compass"></i> Exploration status</h3>
				<p>A sector can be explored, discovered or unexplored. Changing this value will remove and/or change the opacity of the gray background from the map's square.</p>

				<h3><i class="mdi mdi-radioactive"></i> Rot level</h3>
				<ol start="0">
					<li><b>Rot oasis:</b> Rot-free area. <small><i>(No radiation icon &amp; green border on the square.)</i></small></li>
					<li><b>Weak rot area:</b> In these sectors PCs get one Rot point every day. <small><i>(No radiation icon.)</i></small></li>
					<li><b>Strong rot area:</b> In such a sector PCs suffer one Rot Point every hour. <small><i>(Radiation icon &amp; orange border.)</i></small></li>
					<li><b>Rot hotspot:</b> Here, you will die quickly. You get one Rot Point every minute. <small><i>(Radiation icon &amp; red border.)</i></small></li>
				</ol>

				<h3><i class="mdi mdi-space-invaders"></i> Threat level &amp; Threats list</h3>
				<p>A high Threat Level means a more dangerous sector, but with greater chance of finding untouched artifacts (see page 158).</p>
				<p>At generation, a Threat roll is processed. For each <b>six</b>, the artifact count is increased by one if there are some ruins in that sector. If at least a <b>one</b> is rolled, an Zone threat is added to the Threat list.</p>
				<p>The <i class="mdi mdi-dice-6"></i> button performs a new Threat Roll.</p>

				<h3><i class="mdi mdi-terrain"></i> Type</h3>
				<p>A sector can have a type. Setting the type will just have a cosmetic effect by changing the color of that sector on the Zone map.</p>
				<!-- <p>The different types are:</p>
				<ul class="text-info" style="list-style-type: none;">
					<li v-for="(icon, key) in $root.typeIcons" :key="key">
						<v-icon small>{{ icon }}</v-icon> {{ key }}
					</li>
				</ul> -->

				<h3><i class="mdi mdi-image"></i> Environment</h3>
				<p>Determines the general terrain of the sector.</p>

				<h3><i class="mdi mdi-map-marker"></i> Ruins</h3>
				<p>Decides the dominant ruin in the sector.</p>

				<h3><i class="mdi mdi-file-document"></i> Description</h3>
				<p>Text describing the sector and its dominant ruin. You may also use this field to add your own notes.</p>
				<p>The <i class="mdi mdi-download"></i> button appears if a dominant ruin has been selected and if the textfield is empty. Clicking it will generate a description for the chosen ruin.</p>

				<h3><i class="mdi mdi-alert-circle"></i> Mood</h3>
				<p>Some sectors in the Zone contain neither threats nor artifacts. Some sectors are just empty wasteland, and can be passed quickly by the PCs. To give even sectors like these some life and character, you can choose a mood element, something that catches the PCs’ attention, but is not an immediate threat.</p>
				<p>Mood types are: People, Nature, Weather, Remains, Events, and Terrain.</p>

				<h3><i class="mdi mdi-notebook"></i> Notes</h3>
				<p>Use this field to add extra notes for the sector.</p>

				<h3><i class="mdi mdi-package-variant-closed"></i> Finds</h3>
				<p>Inventories the resources left to discover:</p>
				<ul class="text-info" style="list-style-type: none;">
					<li v-for="(icon, key) in $root.findIcons" :key="key">
						<v-icon small>{{ icon }}</v-icon> {{ key }}
					</li>
				</ul>
				<p>The <i class="mdi mdi-cart-arrow-down"></i> button sets the item's quantity to 0.</p>
				<p>The <i class="mdi mdi-dice-6"></i> button rolls a new random quantity for the item.</p>
			</div>

			<v-divider></v-divider>
			<h2 id="Contributing" ref="Contributing">Contributing</h2>
			<div>
				<p>You may help the development of Find the Path.</p>
				<p>For example, translations could easily be added with your languages skills or if you've access to the corebook in another language.</p>
			</div>

			<v-divider></v-divider>
			<h2 id="Troubleshooting" ref="Troubleshooting">Troubleshooting</h2>
			<div>
				<div class="alert alert-info">
					<h4><i class="mdi mdi-bug"></i> Bug Report</h4>
					<p class="text-info">If you encounter any bug or weird behavior, please report it there: <a :href="`${$root.github}/issues`" target="_blank">report an issue</a>.</p>
				</div>
				<ul>
					<li>While opening an existing zonemap JSON file, if you're experiencing an endless loading dialog, it could mean that your file is corrupted. Don't worry, it should be fixable. Contacts the app manager for help.</li>
					<li>If the application becomes very slow and laggy after having set a custom background image, the image file is probably too heavy. Try first to compress the image in JPEG format.</li>
				</ul>
			</div>
		</v-layout>

	</v-container>

</v-app>
</template>

<script>
export default {
	name: 'help',
	data: () => ({
		drawer: false,
		drawerEntries: [],
		nightMode: false
	}),
	mounted: function() {
		const childs = this.$refs.helptext.childNodes;
		for (const child of childs) {
			if (child.id) this.drawerEntries.push(child.id);
		}
	},
	methods: {
		formatTitle(title) {
			return title.replace(/_/g, ' ');
		},
		closeHelp() {
			window.close();
		},
		goto(ref) {
			this.drawer = false;
			const elem = this.$refs[ref];
			const top = elem.offsetTop - 50;
			window.scrollTo(0, top);
		}
	}
};
</script>

<style scoped>
p b,
li b {
	font-family: 'ArcherPro Bold';
}

.navigation-menu-entry {
	font-family: 'Big Noodle Titling';
	font-size: 1.5rem;
}

#helptext > div > *:last-child {
	margin-bottom: 5em;
}

li {
	margin-bottom: .5em;
}

li:last-child {
	margin-bottom: 1em;
}

.bg-help-dialog {
	background-image: url('../assets/background.jpg');
	background-repeat: no-repeat;
	background-position: center center;
	background-attachment: fixed;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
}

.help-dialog-toolbar {
	font-family: 'Futura Std Medium' !important;
}
</style>
