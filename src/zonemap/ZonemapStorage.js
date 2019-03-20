/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * ============================================================================
 * ZONEMAP FILE READER
 * ============================================================================
 * @author       Stefouch <stefouch@gmail.com>
 * @copyright    Copyright (c) 2019, Stefouch
 * @license      MIT
 * @description  A collection of shortcut functions that stores and loads
 *                a Zonemap JSON file into/from "localStorage".
 */
const ZonemapStorage = {
	filter: /application\/json/,
	load(fileInput) {
		// Exits early if no file.
		if (!fileInput.files.length) return;

		// There is only '1' file since they are not multiple type.
		const file = fileInput.files[0];

		// Exits early and warns the user if not a valid file type.
		if (!ZonemapStorage.filter.test(file.type)) {
			alert('You must select a valid Zonemap JSON file!');
			return;
		}

		// Warns if the file size > 5MB (could be too heavy for localStorage).
		if (file.size > 5000000) {
			alert('Warning: your Zonemap file is heavy!');
		}

		const reader = new FileReader();
		reader.onload = function(e) {
			ZonemapStorage.set(e.target.result);
		};

		// Attempts to read the file in question.
		reader.readAsText(file);

		return true;
	},
	set(zonemapJson) {
		localStorage.setItem('zonemap', zonemapJson);
	},
	get() {
		return localStorage.getItem('zonemap');
	},
	sweep() {
		localStorage.removeItem('zonemap');
	}
};

export default ZonemapStorage;
