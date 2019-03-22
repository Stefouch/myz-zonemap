<template>
<v-container style="max-width: 800px;">
	<v-layout ref="helptext" column>
		<h1>Mutant Year&nbsp;Zero: Find&nbsp;My&nbsp;Path</h1>
		<div>
			<h2>Welcome to The Zone!</h2>
			<p>This is a web application for managing the Map of the Zone in the Mutant: Year Zero tabletop roleplaying game.</p>
			<p>This application is mainly designed for Game Master's (GM) eyes, not Player Characters (PCs).</p>
			<h3>How it works</h3>
			<p>Each sector is randomly generated. You can of course add your own modifications, or roll new values for that sector. Each sector can show up to six tiny icons, notifying the GM what left to discover in that sector.</p>
			<p>The Map can be saved in JSON format, and loaded again for later uses. Because it's JSON, it's easy to edit with a text editor. But beware of what you do here, as this could lead to file corruption.</p>
		</div>
		<h2 id="The_Zone_Screen">The Zone Screen</h2>
		<div>
			<p>A Map of the Zone can't be wider than 30 squares and heighter than 26 squares.</p>
			<p>The map is draggable, like a Google map (but no zoom function yet). The rulers are also draggable.</p>
			<p>Click <i class="far fa-eye-slash"></i> to hide/show unexplored sectors.</p>
			<p>Single click to select a zone sector (a map's square), or double-click to edit it.</p>
			<p>Each square displays a custom name and up to six icons:</p>
			<ul style="list-style-type: none;">
				<li><abbr class="zone-symbol zone-symbol-bullets" title="Bullets available">d6</abbr> &mdash; Some bullets are present in this sector.</li>
				<li><abbr class="zone-symbol zone-symbol-grub" title="Grub available">d6</abbr> &mdash; Some grub is there to find.</li>
				<li><abbr class="zone-symbol zone-symbol-water" title="Water available">d6</abbr> &mdash; Some rot-free water rations are lying around.</li>
				<li><abbr class="zone-symbol zone-symbol-danger" title="Threat not terminated">T_T</abbr> &mdash; One or more threats are lurking in this sector.</li>
				<li><abbr class="zone-symbol zone-symbol-artifact" title="Artifact(s) available">A</abbr> &mdash; One or more artifacts are hidden in this sector.</li>
				<li><abbr class="zone-symbol zone-symbol-nuke" title="Rot level > 0">ROT</abbr> &mdash; The Rot level of this sector.</li>
			</ul>
			<p>Each square can also have different background &amp; border colors, according to the sector's type, rot level, and exploration status.</p>
		</div>
		<h2 id="Map_Background">Map Background</h2>
		<div>
			<p>Click <i class="fas fa-cog"></i> to setup a custom background.</p>
			<h3><i class="fas fa-map"></i> Zone Map background file</h3>
				<p>You may select a background image here. The image is not uploaded, but its location is memorized, meaning you will have to select the image every time you restart your web browser.</p>
				<p>If the background appears too dark or too light, you can edit your picture in a dedicated software.</p>
			<h3><i class="fas fa-arrows-alt"></i> Zone Map background position (in pixels)</h3>
				<p>Adjust the position of the background image here. These values are saved in the Zonemap JSON file.</p>
				<p>Use X and Y to set the left and top position of the background image. Use negative values to offset the image.</p>
				<p>Use H and W to set the height and the width of the background image. <i>(NB: Each sector's square is 56px.)</i></p>
				<div class="alert alert-info">Map images made with the <a href="https://www.youtube.com/watch?v=Re1O43K1K0c" target="_blank">Shane McLean tutorial</a> should have values X = -7, Y = -8, W = 1703, H = 1020 (not verified).</div>
		</div>
		<h2 id="Editing_a_Sector">Editing a Sector</h2>
		<div>
			<p>Double click on a Zone sector (a square) to edit it.</p>
			<div class="alert alert-warning">For any text input, special characters ($%), html tags (&lt;/&gt;) and apostrophes ("/') are not supported and are therefore removed by the server.</div>
			<p>Buttons:</p>
			<ul>
				<li><b>Roll:</b> generates new data for this sector (if not yet saved, otherwise you'll need first to delete it).</li>
				<li><b>Save:</b> saves all data for this sector.</li>
				<li><b>Close:</b> closes the Edit dialog.</li>
				<li><b>Delete:</b> resets this sector (no turning back).</li>
			</ul>
			<div class="alert alert-info">All random data for a sector are generated according to the tables found in the MYZ core book.</div>
		</div>
		<h2 id="Sector_Data">Sector's Data</h2>
		<div>
			<h3><i class="fas fa-flag"></i> Sector's name</h3>
				<p>Custom name of the sector. By default, it's the sector's coordinates in the Zone map.</p>
			<h3><i class="fas fa-map-marker-alt"></i> Exploration status</h3>
				<p>Either if this sector is explored or not. It's possible PCs can still enter this sector and NOT explore it, e.g. by rushing it or turning back before the end of the exploration (The GM could allow this if the PCs discover a strong rot level).</p>
				<p>Checking this checkbox will remove the gray background from the map's square.</p>
			<h3><i class="fas fa-radiation"></i> Rot level</h3>
				<ol start="0">
					<li><b>Rot oasis:</b> Rot-free area. <i>(No radiation icon on the square.)</i></li>
					<li><abbr class="zone-symbol zone-symbol-nuke" title="Rot level 1">{ROT}</abbr>&nbsp;<b>Weak rot area:</b> In these sectors PCs get one Rot point every day. <i>(Radiation icon on the square.)</i></li>
					<li><abbr class="zone-symbol zone-symbol-nuke bg-warning" title="Rot level 2">{ROT}</abbr>&nbsp;<b>Strong rot area:</b> In such a sector PCs suffer one Rot Point every hour. <i>(Yellow radiation icon on the square.)</i></li>
					<li><abbr class="zone-symbol zone-symbol-nuke bg-danger" title="Rot level 3">{ROT}</abbr>&nbsp;<b>Rot hotspot:</b> Here, you will die quickly. You get one Rot Point every minute. <i>(Red radiation icon on the square.)</i></li>
				</ol>
			<h3><i class="fas fa-exclamation-triangle"></i> Threat level & Threats list</h3>
				<p>A high Threat Level means a more dangerous sector, but with greater chance of finding untouched artifacts (see page 158).</p>
				<p>At generation, a Threat roll is processed. For each six, the artifact count is increased by one if there are some ruins in that sector. For each one, an extra Zone threat is added to the Threat list. Choose one threat from that list, or more than one, and empower it, or not (at GM's discretion).</p>
				<p>The dice button rolls a new value between 1 and 13 for this level, but doesn't change the threat list (no Threat roll is made).</p>
			<h3><i class="fas fa-cube"></i> Finds</h3>
				<p>Indicates how many resources left to discover:</p>
				<ul style="list-style-type: none;">
					<li><i class="far fa-dot-circle"></i> Bullets</li>
					<li><i class="fas fa-apple-alt"></i> Grub</li>
					<li><i class="fas fa-tint"></i> Water</li>
					<li><i class="fas fa-paperclip"></i> Artifacts</li>
				</ul>
				<p>Any value above 0 will show the dedicated icon in the sector of the Zone map. The "shopping cart" buttons set the values for these items to 0.</p>
			<h3><i class="fas fa-tag"></i> Type</h3>
			<p>A sector can have a type. Setting the type will just have a cosmetic effect by changing the color of that sector on the Zone map.</p>
			<p>The different types are:</p>
			<ul>
				<li>zone</li>
				<li>ark</li>
				<li>special</li>
			</ul>
			<h3><i class="fas fa-compass"></i> Environment</h3>
				<p>Determines the general terrain of that sector. An autocomplete list is available.</p>
			<h3><i class="fas fa-thumbtack"></i> Ruins</h3>
				<p>Decides the dominant ruin in that sector. An autocomplete list is available. If the "Description" textarea is empty, selecting a ruin from the autocomplete list will also add its description.</p>
			<h3><i class="fas fa-edit"></i> Description</h3>
				<p>Text describing the sector and its dominant ruin. You may also use this field to add your own notes.</p>
			<h3><i class="fas fa-exclamation-circle"></i> Mood</h3>
				<p>Some sectors in the Zone contain neither threats nor artifacts. Some sectors are just empty wasteland, and can be passed quickly by the PCs. To give even sectors like these some life and character, you can choose a mood element, something that catches the PCs’ attention, but is not an immediate threat.</p>
				<p>This field has an autocomplete function. Use Mood types to help find something that fits you. Mood types are: People, Nature, Weather, Remains, Events, and Terrain.</p>
		</div>
		<h2 id="Saving_your_Zone_Map">Saving your Zone Map</h2>
		<div>
			<p>To save your Zone map, click the button "Save" in the upper navbar. A dialog appear and ask you a title for your creation and its creator's name. Click "Save" again to prompt the file download. You can then use it for later uses.</p>
			<p>The map is also saved in the server's memory. As long as you don't close your web browser, you should be able to retrieve your last saved map through the welcome screen.</p>
		</div>
		<h2>Future Improvements</h2>
		<div>
			<p>The Development of this web application is unfinished. I plan to add more fonctionalities. Of course, I'm open to suggestions. Don't hesitate to send me your ideas.</p>
			<p>Planned upgrades:</p>
			<ul>
				<li>UI improvements.</li>
				<li>Fixing the download HTTPS bug.</li>
				<li>Sector's mouse-over popup showing more details.</li>
				<li><strike>Keyboard shortcuts.</strike>&nbsp;<span class="badge badge-secondary">Done</span></li>
				<li><strike>Custom map background.</strike>&nbsp;<span class="badge badge-secondary">Done</span></li>
				<li>Use of MYZ fonts: ArcherPro Book and BigNoodleTitling.</li>
				<li>Support for Internet Explorer.</li>
				<li>Map zoom.</li>
			</ul>
		</div>
		<h2>Troubleshooting</h2>
		<div>
			<ul>
				<li>No file is prompted for download? You probably need to authorize popup windows for this website.</li>
				<li>If the zonemap stays with a loading screen after a few seconds, either the server is very slow today; or (most probably) your map file is corrupted.</li>
				<li>The web browser Internet Explorer is not supported yet.</li>
			</ul>
		</div>
	</v-layout>

	<!-- NAVIGATION DRAWER ================================================ -->
	<v-navigation-drawer
		v-model="drawer"
		fixed
		temporary
	>
		<v-list dense class="pt-0">
			<v-list-tile
				v-for="(entry, i) in drawerEntries"
				:key="i"
			>
				<v-list-tile-content>
					<v-list-tile-title class="navigation-menu-entry">
						{{ formatTitle(entry) }}
					</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</v-list>
	</v-navigation-drawer>

	<v-btn
		v-show="!drawer"
		id="drawer-toggle"
		dark
		fixed
		top
		left
		fab
		@click="drawer = !drawer"
	>
		<v-icon>menu</v-icon>
	</v-btn>
</v-container>
</template>

<script>
export default {
	name: 'help',
	data: () => ({
		drawer: true,
		drawerEntries: []
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
		}
	}
}
</script>

<style scoped>
#drawer-toggle {
	background-color: rgb(42, 42, 42);
}

.navigation-menu-entry {
	font-family: 'Big Noodle Titling';
	font-size: 1.5rem;
}

li:last-child {
	margin-bottom: 1rem;
}
</style>
