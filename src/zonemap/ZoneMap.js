const ZoneSector = require('./ZoneSector');
const Collection = require('../util/Collection');
const Util = require('../util/Util');

const COORD_REGEX = /([A-Z])(\d{2})/;

/**
 * ZONE MAP CLASS
 * @extends {Collection}
 * @see {Map}
 */
class ZoneMap extends Collection {
	/**
	 * Generates a new map of the Zone.
	 * @param {Object} data ZoneMap's raw data
	 */
	constructor(data) {
		if (!data) data = {};
		super(data.sectors);

		/**
		 * Zonemap title.
		 * @type {string}
		 */
		this.title = data.title || 'Untitled Map';

		/**
		 * File version.
		 * @type {string} "X.X" format
		 */
		this.version = '2.0';

		/**
		 * File language.
		 * @type {string}
		 */
		this.lang = data.lang || 'en';

		/**
		 * File's creator.
		 * @type {string}
		 */
		this.author = data.author || '';

		/**
		 * Game version for this Zonemap.
		 * @type {string}
		 */
		this.game = 'Mutant Year Zero';

		/**
		 * Zonemap width.
		 * @type {number}
		 */
		this.width = data.width || 30;

		/**
		 * Zonemap height.
		 * @type {number} Between 1 and 26
		 */
		this.height = Util.clamp(data.height, 1, 26) || 18;

		/**
		 * Zonemap background.
		 * @type {Object}
		 * @property {number} left Position from the left (in pixel)
		 * @property {number} top Position from the top (in pixel)
		 * @property {number} width Width resizing (in pixel)
		 * @property {number} height Height resizing (in pixel)
		 * @example
		 * {"x":-7,"y":-9,"w":1944,"h":1167}
		 */
		this.background = data.background || {};
		if (!this.background.hasOwnProperty('x')) this.background.x = -7;
		if (!this.background.hasOwnProperty('y')) this.background.y = -9;
		if (!this.background.hasOwnProperty('w')) this.background.w = 64 * this.width + 24;
		if (!this.background.hasOwnProperty('h')) this.background.h = 64 * this.height + 15;
	}

	/**
	 * Creates a new Sector with random data at the specified coordinates.
	 * @param {string} coord A coordinates string (e.g. G14 or A02)
	 * @returns {ZoneSector} Or *null* if couldn't create the ZoneSector object
	 */
	setNewSector(coord) {
		if (!this.isValidPosition(coord)) return null;
		const sector = new ZoneSector(null, this.lang);
		if (!sector) return null;
		this.set(coord, sector);
		return sector;
	}

	/**
	 * Checks the validity of a coordinate for the Zonemap:
	 * * It must follow the regex pattern `/([A-Z])(\d{2})/`.
	 * * Y axis can't be greater than the map's maximum height.
	 * * X axis can't be greater than the map's maximum width.
	 * @param {string} coord Coordinates, e.g. "A06"
	 * @returns {boolean}
	 */
	isValidPosition(coord) {
		// Extracts the coordinates from the string.
		const [, y, x] = coord.match(COORD_REGEX);

		// Converts the Y axis letter (must be uppercase)
		// into its relative number (position in the alphabet).
		const yPos = parseInt(y.charCodeAt(0) - 64);

		// Parses the X axis value.
		const xPos = parseInt(x);

		// Performs checks.
		if (
			typeof yPos === 'number' &&
			typeof xPos === 'number' &&
			yPos <= this.height &&
			xPos <= this.width
		)
			return true;

		return false;
	}

	/**
	 * Clones the ZoneMap (deep copy).
	 * @returns {ZoneMap}
	 */
	clone() {
		return ZoneMap.parse(ZoneMap.stringify(this));
	}

	/**
	 * Converts a ZoneMap JavaScript Object Notation (JSON) string into a ZoneMap object.
	 * If a member contains nested objects, the nested objects are transformed before the parent object is.
	 * @method JSON.parse()
	 * @param {string} text A valid ZoneMap JSON string
	 * @returns {ZoneMap}
	 * @static
	 */
	static parse(text) {
		const data = JSON.parse(text);

		// Parses all sectors for API 1.0.
		if (data.map_version === '1.0.0') {
			const sectors = [];

			for (const sector of data.sectors) {
				// Formats the coordinates.
				const y = sector.coordinates.coords.slice(0, 1);
				const x = sector.coordinates.coords.slice(1);
				const coord = y + Util.zeroise(x, 2);
				delete sector.coordinates;

				// Formats the rot level key.
				if (sector.hasOwnProperty('rot_lvl')) {
					sector.rotLvl = sector.rot_lvl;
					delete sector.rot_lvl;
				}

				// Formats the threat level key.
				if (sector.hasOwnProperty('threat_lvl')) {
					sector.threatLvl = sector.threat_lvl;
					delete sector.threat_lvl;
				}

				// Creates a double array.
				sectors.push([coord, sector]);
			}
			// Revamps correctly the `data.sectors`.
			data.sectors = sectors;

			// Last thing, deletes old 'background' data for v1.0 only.
			delete data.background;
		}

		// Converts each sector into a ZoneSector object.
		// index [1]: coordinates,
		// index [2]: sector
		data.sectors = data.sectors.map(arr => {
			arr[1] = new ZoneSector(arr[1]);
			return arr;
		});

		// Returns a new ZoneMap object (Collection>Map)
		return new ZoneMap({
			// With support for API 1.0.
			title: data.map_title || data.title,
			author: data.map_creator || data.author,
			width: data.map_width || data.width,
			height: data.map_height || data.height,
			lang: data.lang,
			background: data.background,
			sectors: data.sectors
		});
	}

	/**
	 * Converts a ZoneMap object to a JavaScript Object Notation (JSON) string.
	 * @method JSON.stringify()
	 * @param {ZoneMap} zoneMap A ZoneMap object to be converted
	 * @param {number} [space=0] Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read
	 * @returns {string}
	 * @static
	 */
	static stringify(zoneMap, space = 0) {
		// Creates a new blank object like ZoneMap.
		const zm = {};

		// Adds all ZoneMap's keys (not entries).
		for (const key in zoneMap) zm[key] = zoneMap[key];

		// Converts all ZoneMap's entries into [ [key], [val] ].
		zm.sectors = [...zoneMap];

		// Does not stringify private keys.
		function replacer(key, val) {
			if (key.startsWith('_')) return undefined;
			return val;
		}

		return JSON.stringify(zm, replacer, space);
	}
}

module.exports = ZoneMap;
