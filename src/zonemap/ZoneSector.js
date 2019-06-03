const { rollData } = require('../util/YZGenerator');
const { RollParser, Roll } = require('../util/RollParser');
const { clamp, rand } = require('../util/Util');
const Types = require('./ZoneSectorTypes');
const RandomTables = require('./ZoneSectorTables');

/**
 * Identifier for the language used in the source.
 * @type {string} Default is 'en' (for english)
 */
let LANG = 'en';

/**
 * ZONE SECTOR CLASS
 */
class ZoneSector {
	/**
	 * Generates a new Zone Sector.
	 * @param {Object} data Sector's raw data
	 * @param {?string} [lang='en'] Identifier for the language used in the source
	 */
	constructor(data, lang = null) {
		if (!data) data = {};
		if (RandomTables.hasOwnProperty(lang)) LANG = lang.toLowerCase();

		// Determines if the sector is brand new.
		const isNew = !data.type;

		/**
		 * Sector's name.
		 * @type {string}
		 */
		this.name = data.name || '';

		/**
		 * Number of times the sector was explored.
		 * @type {number}
		 */
		this.explored = data.explored || 0;

		/**
		 * Sector's icon.
		 * @type {string}
		 */
		this.icon = data.icon || null;

		// ROT ================================================================
		/**
		 * Rot Level of the sector.
		 * @type {number} Between 0 and 3
		 * * 0 = Rot Oasis
		 * * 1 = Weak Rot
		 * * 2 = Strong Rot
		 * * 3 = Rot Hotspot
		 */
		this.rotLvl = clamp(data.rotLvl, 0, 3);
		if (typeof this.rotLvl === 'undefined' || isNaN(this.rotLvl)) this.rollRotLvl();

		// THREAT ROLL ========================================================
		/**
		 * Threat Level of the sector.
		 * @type {number} Between 0 and 13
		 */
		this.threatLvl = clamp(data.threatLvl, 0, 13);

		/**
		 * Array of threats in the sector.
		 * @type {string[]}
		 */
		this.threats = data.threats;

		// FINDS ==============================================================
		/**
		 * List of finds in the sector.
		 * @type {Object}
		 * @property {number} bullets
		 * @property {number} grub
		 * @property {number} water
		 * @property {number} artifacts
		 */
		this.finds = data.finds || {};
		if (!this.finds.hasOwnProperty('bullets')) this.finds.bullets = rand(1, 6);
		if (!this.finds.hasOwnProperty('grub')) this.finds.grub = rand(1, 6);
		if (!this.finds.hasOwnProperty('water')) this.finds.water = rand(1, 6);
		if (!this.finds.hasOwnProperty('artifacts')) this.finds.artifacts = 0;

		// SECTOR TYPE ========================================================
		/**
		 * Sector's type.
		 * * zone
		 * * ark
		 * * special
		 * @type {string}
		 * @see {Types}
		 */
		this.type = data.type || Types.zone;

		// ENVIRONMENT ========================================================
		/**
		 * Environment of the sector.
		 * @type {string}
		 */
		this.environment = data.environment;
		if (typeof this.environment === 'undefined' && isNew) this.rollEnvironment();

		// RUINS ==============================================================
		/**
		 * Ruins present in the sector.
		 * @type {string}
		 */
		this.ruins = data.ruins;
		if (typeof this.ruins === 'undefined' && isNew) this.rollRuins();

		/**
		 * Description of the ruins.
		 * @type {string}
		 */
		this.description = data.description;
		if (typeof this.description === 'undefined' && isNew) {
			if (this.hasRuin) this.description = ZoneSector.getRuinDescription(this.ruins);
			else this.description = null;
		}

		// MOOD ===============================================================
		/**
		 * Mood element of the sector.
		 * @type {string}
		 */
		this.mood = data.mood;
		if (typeof this.mood === 'undefined' && isNew) this.rollMood();

		// NOTES ==============================================================
		/**
		 * Extra notes.
		 * @type {string}
		 */
		this.notes = data.notes || null;

		// ROLL→THREATLVL→THREATS→ARTOS =======================================
		if (
			typeof this.threatLvl === 'undefined' ||
			isNaN(this.threatLvl) ||
			typeof this.threats === 'undefined'
		) {
			this.threatLvl = rand(1, 13);
			this.threats = [];
			this.rollThreatLvl();
		}
	}

	// BOOLEANS ===============================================================
	/**
	 * Tells if the sector has a Threat alive.
	 * @type {boolean}
	 * @readonly
	 */
	get hasThreat() {
		if (this.threats.length > 0) {
			if (this.threats[0].length > 0) return true;
		}
		return false;
	}

	/**
	 * Tells if there is an artifact to find in the sector.
	 * @type {boolean}
	 * @readonly
	 */
	get hasArtifact() {
		return this.finds.artifacts > 0;
	}

	/**
	 * Tells if the sector hides some normal ruins.
	 * @type {boolean}
	 * @readonly
	 */
	get hasNormalRuin() {
		return /ruine?r?s?/i.test(this.environment);
	}

	/**
	 * Tells if the sector hides some industrial ruins.
	 * @type {boolean}
	 * @readonly
	 */
	get hasIndustrialRuin() {
		return /(industry|industries|usine|industrilandskap)/i.test(this.environment);
	}

	/**
	 * Tells if the sector holds some ruins.
	 * @type {boolean}
	 * @readonly
	 */
	get hasRuin() {
		return this.hasNormalRuin || this.hasIndustrialRuin;
	}

	/**
	 * Tells if the sector has nothing more to scramble.
	 * @type {boolean}
	 * @readonly
	 */
	get isEmpty() {
		if (this.hasThreat) return false;
		for (const item in this.finds) if (this.finds[item] > 0) return false;
		return true;
	}

	// SECTOR ROLLERS =========================================================
	/**
	 * Randomizes the Rot level.
	 */
	rollRotLvl() {
		this.rotLvl = ZoneSector.rollProperty('rotLvl');
	}

	/**
	 * Randomizes the Environment.
	 */
	rollEnvironment() {
		this.environment = ZoneSector.rollProperty('environments');
	}

	/**
	 * Randomizes the Mood.
	 */
	rollMood() {
		this.mood = ZoneSector.rollProperty('moods');
	}

	/**
	 * Randomizes the Ruins.
	 */
	rollRuins() {
		if (this.hasNormalRuin) this.ruins = ZoneSector.rollProperty('normalRuins')[0];
		else if (this.hasIndustrialRuin) this.ruins = ZoneSector.rollProperty('industrialRuins')[0];
		else this.ruins = null;
	}

	/**
	 * Rolls the Threat Level, and randomizes according its result
	 * the Threats and the Artifact findings.
	 * @param {number} bonus Additional dice to roll, e.g. +3 at night
	 */
	rollThreatLvl(bonus = 0) {
		const threatRoll = new Roll(this.threatLvl + bonus, 6);
		threatRoll.roll();
		const threatQty = threatRoll.countValues(1);
		const artoQty = threatRoll.countValues(6);

		// THREATS
		if (threatQty > 0) {
			const table = ZoneSector.rollProperty('threats');
			const roll = RollParser.parseAndRoll(table.roll);
			const data = table.data;
			this.threats.push(rollData(roll, data));
		}
		// ARTOS
		this.finds.artifacts = this.ruins ? artoQty : 0;
	}

	/**
	 * Clones the sector. Returns a copy.
	 * @returns {ZoneSector}
	 */
	clone() {
		return new ZoneSector(JSON.parse(JSON.stringify(this)));
	}

	// STATIC METHODS =========================================================
	/**
	 * Gets the corresponding description of an existing ruin.
	 * @param {string} ruinName The ruin's name
	 * @param {?string} [lang='en'] Identifier for the language used in the source
	 * @returns {string} Returns *null* if found nothing.
	 * @static
	 */
	static getRuinDescription(ruinName, lang = LANG) {
		// Looking in "normalRuins".
		let table = RandomTables[lang].normalRuins.data;
		for (const seed in table) {
			if (ruinName === table[seed][0]) return table[seed][1];
		}
		// Looking in "industrialRuins".
		table = RandomTables[lang].industrialRuins.data;
		for (const seed in table) {
			if (ruinName === table[seed][0]) return table[seed][1];
		}
		// Fail.
		return null;
	}

	/**
	 * Gets a random property from the generation tables.
	 * @param {string} property The property to roll in the `sector-generator-{locale}.json` file
	 * @param {?string} [lang='en'] Identifier for the language used in the source
	 * @returns {string}
	 * @static
	 */
	static rollProperty(property, lang = LANG) {
		if (!RandomTables[lang].hasOwnProperty(property))
			throw new TypeError(`"${property}" property not found!`);

		const table = RandomTables[lang][property];
		const roll = RollParser.parseAndRoll(table.roll);
		const data = table.data;

		return rollData(roll, data);
	}
}

module.exports = ZoneSector;
